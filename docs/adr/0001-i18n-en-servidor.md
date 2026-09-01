# ADR 0001 — Internacionalización en servidor con diccionarios propios

- **Estado:** Aceptada
- **Fecha:** 2026-09-01
- **Contexto de trabajo:** Fase 2 de la refactorización ([`docs/plans/Plan-F2-ClaudeCode-Portfolio.md`](../plans/Plan-F2-ClaudeCode-Portfolio.md))
- **Decide sobre:** cómo se cargan las traducciones y cómo se estructuran las URLs por idioma

---

## 1. Contexto

### 1.1 El problema que fuerza la decisión

El portfolio sirve un HTML sin contenido. Medido sobre producción el 2026-08-18
([`no-js-2026-08-18.md`](../audit/no-js-2026-08-18.md) §2):

```html
<body class="..."><div hidden=""><!--$--><!--/$--></div><script ...>
```

| Medición | Valor |
|---|---:|
| Caracteres de texto visible en el `<body>` | **0** |
| Elementos del `<body>` que no son `<script>` | 1 (`<div hidden="">`) |
| Apariciones de «Adriana Suárez» en HTML indexable | 1, en el `<title>` |

La causa son tres líneas. `I18nProvider.tsx:25-27` devuelve `null` mientras
i18next no se ha inicializado, y solo se inicializa dentro de un `useEffect`,
que en el servidor no se ejecuta nunca:

```tsx
if (!isInitialized) {
  return null;
}
```

Como `layout.tsx:38` coloca ese provider por encima de todo el árbol, **el
render de servidor de la aplicación entera devuelve `null`**. El prerenderizado
de Next funciona correctamente: prerenderiza un documento vacío.

De ahí cuelgan el `lang="en"` fijo (`layout.tsx:33`), los 14 de 23 componentes
que son de cliente, y la imposibilidad de tener SEO indexable.

### 1.2 Cómo se usa i18n hoy, medido

Antes de elegir la sustitución hay que saber qué se está usando de verdad.
Verificado sobre el árbol el 2026-09-01:

| Hecho | Valor | Cómo se comprobó |
|---|---|---|
| Claves de traducción | **101**, en paridad perfecta entre `es` y `en` | recuento de hojas de ambos JSON, 0 huérfanas en cualquier dirección |
| Tipo de los valores | **todos `string`** | ninguna estructura de plural ni de contexto |
| Llamadas a `useTranslation()` | **14**, todas **sin namespace** | `grep` sobre `src/` |
| Plurales (`_one` / `_other`) | **0** | no existe la convención en ningún locale |
| Interpolación | **1 uso, y está roto** | ver §1.3 |
| Formateo de fechas o números por locale | **0** | el único `new Date()` es el año del copyright del footer |
| Carga diferida de traducciones | **no se usa** | ambos locales se importan estáticamente en `i18n/config.ts:5-6` |

De todo lo que ofrece i18next, este proyecto usa **una sola cosa: buscar una
clave con puntos dentro de un objeto anidado**.

### 1.3 La interpolación está rota, y lleva meses así

`Terminal.tsx` llama al traductor pasándole un valor:

```tsx
// Terminal.tsx:105 y :173
{t("terminal.commands.notFound", { command: input })}
```

Pero el texto correspondiente no tiene hueco donde colocarlo. **Los dos ficheros
de locales contienen 0 ocurrencias de `{{`**:

```json
"notFound": "Comando no encontrado. Escribe 'help' para ver comandos disponibles."
"notFound": "Command not found. Type 'help' for available commands."
```

El argumento se pasa, i18next lo ignora en silencio, y el mensaje nunca dice qué
comando falló. Nadie lo había notado.

Este dato es el que cambia la naturaleza de la decisión: no se trata de preferir
escribir código propio, sino de que **la única funcionalidad de la librería que
va más allá de buscar una clave no llegó nunca a funcionar**.

### 1.4 El coste medido de las tres dependencias

De [`bundle-2026-08-20.md`](../audit/bundle-2026-08-20.md) §2, sobre un bundle de
cliente de **1 063,1 KB sin comprimir**:

| Paquete | KB sin comprimir | % del bundle |
|---|---:|---:|
| `i18next` | 41,5 | 3,9 % |
| `react-i18next` | 7,5 | 0,7 % |
| `i18next-browser-languagedetector` | 6,6 | 0,6 % |
| **Total** | **55,6** | **5,2 %** |

### 1.5 El idioma no vive en ningún sitio compartible

`i18n/config.ts:25-29` detecta el idioma en el orden
`localStorage → navigator → htmlTag`, y lo cachea en `localStorage`.

La consecuencia es que **el idioma es un estado privado del navegador de cada
visitante**. No está en la URL. Quien tenga la web en inglés y copie el enlace se
lo manda a alguien que lo verá en español. Y un buscador no puede indexar dos
versiones de idioma de una página que solo tiene una URL.

---

## 2. Decisión

Se toman dos decisiones acopladas: sin la segunda, la primera no tiene de dónde
sacar el idioma en el servidor.

### 2.1 Diccionarios propios, no una librería de i18n

Un módulo `src/i18n/dictionaries.ts` con dos piezas: una carga el JSON del idioma
pedido, y otra devuelve un traductor.

```ts
const dictionaries = {
  es: () => import("./locales/es.json").then((m) => m.default),
  en: () => import("./locales/en.json").then((m) => m.default),
};

export function createTranslator(dict) {
  return (key) => key.split(".").reduce((o, k) => o?.[k], dict) ?? key;
}
```

Es el patrón que documenta Next.js para i18n en el App Router. Dos apuntes de
diseño:

- **La firma es `(key: string) => string`**, deliberadamente idéntica a la del
  `t()` de i18next. Es lo que permite que `data/experience.ts`, `data/projects.ts`
  y `data/skills.ts` —que ya reciben el traductor como parámetro— **no se toquen
  en toda la migración**.
- **Cuando la clave no existe se devuelve la propia clave** (`?? key`). Un error
  tipográfico se ve en pantalla como `hero.titl` en vez de dejar un hueco en
  blanco. Falla de forma ruidosa, que es como debe fallar.

Los tres paquetes de i18next se desinstalan al final de la fase, cuando ya no
quede ningún consumidor.

### 2.2 URLs `/es` y `/en`, con `/` redirigiendo

Ambos idiomas con prefijo, mediante un segmento dinámico `app/[locale]/`. Ningún
idioma es «el de por defecto» a nivel de URL. La raíz `/` redirige según la
cabecera `Accept-Language` del navegador, desde un middleware.

Cada idioma pasa así a tener **su propia URL estática**, que es el requisito de
`hreflang` y `canonical` en la Fase 3, y lo que hace que compartir un enlace
conserve el idioma.

---

## 3. Alternativas consideradas

### 3.1 `next-intl`

La opción convencional: una librería pensada para el App Router, con soporte de
servidor, plurales, formateo por locale mediante `Intl` y tipado de las claves.

**Descartada** porque resuelve problemas que este proyecto no tiene. De su
catálogo, aquí solo se usaría la búsqueda de claves (§1.2). Y la regla dura del
`CLAUDE.md` obliga a justificar cada dependencia por su coste de bundle y por qué
el stack existente no cubre el caso: aquí el stack existente —un `import` de JSON
en un componente de servidor— lo cubre entero.

No se ha medido su peso, porque la decisión no depende de él: aunque fuera 0 KB,
seguiría siendo una dependencia y una API que aprender para sustituir quince
líneas.

Es, con diferencia, la alternativa más razonable de las tres, y la que habría que
reconsiderar primero si aparece cualquiera de las necesidades del §5.2.

### 3.2 Mantener `react-i18next`, inicializándolo también en servidor

Conservar la librería y hacer que se inicialice en el render de servidor, en vez
de solo dentro del `useEffect`.

**Descartada** porque arregla el síntoma y conserva la causa. El HTML llevaría
contenido, pero la librería seguiría en el árbol de cliente y los 55,6 KB
seguirían viajando al navegador. La Fase 2 existe precisamente para sacarlos, así
que esta opción se contradice con su propio objetivo.

### 3.3 No hacer nada

**Descartada.** Es el estado medido en §1.1: 0 caracteres de contenido servido,
el nombre una sola vez en HTML indexable, y el LCP esperando a que se descarguen
y ejecuten ~302 KB gzip de JavaScript. Es el hallazgo que define toda la
refactorización.

---

## 4. Consecuencias

### 4.1 Lo que se gana

- El HTML servido lleva el contenido real en el idioma correcto, sin ejecutar
  JavaScript.
- Salen del bundle de cliente 55,6 KB sin comprimir (5,2 %). *La bajada real en
  gzip se medirá, no se estimará: el gzip no es proporcional.*
- `<html lang>` pasa a ser correcto en cada idioma, en lugar del `"en"` fijo.
- Cada idioma tiene URL propia: compartible, indexable y con base para
  `hreflang` y `canonical`.
- La mayoría de los componentes pueden volver a ser de servidor, porque ya no
  necesitan un hook para leer un texto.
- Desaparecen `useExperience.ts`, `useProjects.ts` y `useSkills.ts`, que solo
  existían para inyectar `useTranslation`.

### 4.2 A qué se renuncia

Esta sección es la que importa dentro de seis meses. Al no usar una librería, el
proyecto deja de tener, hasta que alguien las escriba:

| Funcionalidad | Estado tras la decisión |
|---|---|
| Plurales (`1 proyecto` / `3 proyectos`) | No disponible. Hoy no se usa ninguno |
| Interpolación de variables | No disponible salvo que se implemente. Hoy el único uso está roto (§1.3) |
| Formateo de fechas y números por locale | No disponible. Se resolvería con `Intl`, que es nativo del navegador y no necesita dependencia |
| Detección automática de idioma en cliente | Sustituida por la redirección del middleware, que ocurre en el servidor |
| Carga diferida de traducciones | No disponible. Con 101 claves no compensa |
| Namespaces | No disponible. Nunca se usaron |

**Si aparece alguna de estas necesidades, la decisión se reevalúa con un ADR
nuevo.** Sustituir quince líneas por `next-intl` es una tarde de trabajo; el
coste de haber elegido mal aquí es bajo y reversible, y eso forma parte del
motivo para elegir así.

### 4.3 Lo que cambia para quien ya usa la web

- **Las URLs cambian.** `/` pasa a redirigir a `/es` o `/en`. El enlace del CV y
  el de LinkedIn siguen funcionando, pero con un salto de redirección.
  `src/data/projects.ts:29` enlaza a la raíz del propio portfolio y queda
  igualmente afectado.
- **La terminal se reinicia al cambiar de idioma.** Cambiar de idioma pasa a ser
  navegar, así que el componente se monta de nuevo y el historial de comandos
  arranca limpio. Se acepta a cambio de poder borrar el `useEffect` de
  regeneración, el ref `currentLanguage` y `regenerateCommandOutput`
  (`Terminal.tsx:183-198`).
- **El idioma deja de recordarse en `localStorage`** y pasa a estar en la URL.

### 4.4 Riesgos que la migración debe vigilar

- **Que las rutas dejen de ser estáticas.** Si `generateStaticParams` falta o
  queda mal, `/es` y `/en` pasan de `○` a `ƒ` en la salida del build y se pierde
  la caché del CDN: se habría arreglado el HTML vacío a cambio de perder el
  prerenderizado. Se comprueba en cada paso.
- **Desajustes de hidratación**, que no aparecen en la terminal sino en la
  consola del navegador.
- **El layout raíz.** El `<html>` vive en el layout raíz del App Router; al mover
  todo bajo `[locale]` hay que decidir dónde queda y qué ocurre con `not-found`,
  que se renderiza fuera del segmento.

---

## 5. Cómo se revierte

Cada paso de la Fase 2 va en su propia rama y su propio PR, así que la vuelta
atrás es un `git revert` del merge correspondiente. El punto de no retorno es la
retirada de `I18nProvider`: hasta ahí, la i18n de cliente sigue intacta y
conviviendo con la de servidor.

---

## 6. Referencias

- [`docs/audit/no-js-2026-08-18.md`](../audit/no-js-2026-08-18.md) — el `<body>` vacío, medido sobre producción
- [`docs/audit/bundle-2026-08-20.md`](../audit/bundle-2026-08-20.md) — el peso de los tres paquetes
- [`docs/audit/baseline-2026-08-11.md`](../audit/baseline-2026-08-11.md) — la auditoría que encontró el problema
- [`docs/plans/Plan-F2-ClaudeCode-Portfolio.md`](../plans/Plan-F2-ClaudeCode-Portfolio.md) — el plan que ejecuta esta decisión
