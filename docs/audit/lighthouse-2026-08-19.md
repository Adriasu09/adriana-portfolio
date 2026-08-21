# Línea de base de Lighthouse — 19 agosto 2026

Medición del estado de partida (tarjeta 0.1 de la Fase 0). **Este documento no
propone soluciones**: mide y describe lo que produce hoy el sitio en producción.

- URL medida: `https://adriana-portfolio-blue.vercel.app`
- Fecha de ejecución: **2026-08-19**, móvil a las 19:52 UTC, escritorio a las 20:08 UTC
- Rama: `docs/lighthouse-baseline`
- Complementa: [`no-js-2026-08-18.md`](no-js-2026-08-18.md) · [`baseline-2026-08-11.md`](baseline-2026-08-11.md)

## Herramientas y versiones

| Herramienta | Versión |
|---|---|
| Lighthouse | 13.4.1 (vía `npx`, sin añadirla a `package.json`) |
| Google Chrome | 151.0.7922.138, en modo headless |
| Node | 24.15.0 |

## Método

- **3 ejecuciones por dispositivo**, 6 en total. Los valores publicados son la
  **mediana**, no la mejor ni la primera.
- Móvil es el modo por defecto de Lighthouse; escritorio con `--preset=desktop`.
- `--chrome-flags="--headless=new"`: Chrome sin ventana y sin extensiones.
- Sobre **producción**, no sobre `npm run dev`: el servidor de desarrollo sirve
  código sin minimizar, sin CDN y con recarga en caliente, o sea una web que no
  existe para ningún visitante.

### ⚠️ Esto es una medición de laboratorio

Lighthouse ejecuta **una carga controlada en una máquina concreta con condiciones
simuladas**. Es reproducible, pero artificial. No son datos de campo.

Los datos de **campo** (CrUX, Vercel Analytics) proceden de usuarios reales y son
los que determinan oficialmente si se aprueban los Core Web Vitals. Requieren
tráfico y tiempo, y hoy no existen para este sitio.

**Ninguna cifra de este documento debe presentarse como dato de campo ni como
conformidad con Core Web Vitals.**

### `benchmarkIndex` — por qué se registra

Lighthouse mide la velocidad de la máquina anfitriona en cada ejecución. Sin ese
dato, dos mediciones hechas en ordenadores distintos no son comparables.

| Dispositivo | Rango observado | Mediana |
|---|---|---:|
| Móvil | 2 197 – 2 503 | 2 445 |
| Escritorio | 1 997 – 2 385 | 2 300 |

Es una máquina rápida. **Las notas de este informe son, por tanto, optimistas**
respecto a lo que obtendría un dispositivo de gama media real.

---

## 1. Resultados — mediana de 3 ejecuciones

### Categorías

| Categoría | Móvil | Escritorio |
|---|---:|---:|
| Performance | **85** | **100** |
| Accessibility | 96 | 96 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| Agentic Browsing | 100 | 100 |

> **Nota:** Lighthouse 13 tiene **5 categorías**, no 4. «Agentic Browsing» es
> nueva y agrupa auditorías de WebMCP y `llms.txt`.

### Métricas

| Métrica | Móvil | Escritorio | Umbral «bueno» de Google |
|---|---:|---:|---|
| FCP — First Contentful Paint | 1,03 s | 0,27 s | ≤ 1,8 s |
| Speed Index | 2,40 s | 0,47 s | — |
| **LCP — Largest Contentful Paint** | **3,03 s** | 0,69 s | ≤ 2,5 s |
| **TBT — Total Blocking Time** | **345 ms** | 11 ms | — |
| CLS — Cumulative Layout Shift | 0 | 0 | ≤ 0,1 |
| TTI — Time to Interactive | 3,26 s | 0,73 s | — |

### Los 15 puntos de diferencia entre móvil y escritorio no son un defecto

Lighthouse **simula deliberadamente** un móvil de gama media: CPU 4 veces más
lenta y red 4G con latencia. El escritorio corre sin apenas frenos. Son dos
escenarios distintos a propósito, y el de móvil es el que se parece al visitante
real. **Móvil se compara con móvil.**

---

## 2. Las 6 ejecuciones completas

Se publican todas para que la mediana sea verificable y no haya que fiarse.

### Móvil

| # | Perf | A11y | BP | SEO | Agent | FCP | SI | LCP | TBT | CLS | TTI | bench |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 85 | 96 | 100 | 100 | 100 | 1,03 s | 2,40 s | 3,21 s | 345 ms | 0 | 3,42 s | 2 503 |
| 2 | 84 | 96 | 100 | 100 | 100 | 1,88 s | 4,29 s | 3,03 s | 301 ms | 0 | 3,17 s | 2 445 |
| 3 | 85 | 96 | 100 | 100 | 100 | 0,93 s | 1,37 s | 2,92 s | 398 ms | 0 | 3,26 s | 2 197 |
| **Mediana** | **85** | **96** | **100** | **100** | **100** | **1,03 s** | **2,40 s** | **3,03 s** | **345 ms** | **0** | **3,26 s** | **2 445** |

### Escritorio

| # | Perf | A11y | BP | SEO | Agent | FCP | SI | LCP | TBT | CLS | TTI | bench |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 100 | 96 | 100 | 100 | 100 | 0,27 s | 0,47 s | 0,63 s | 11 ms | 0 | 0,67 s | 2 300 |
| 2 | 100 | 96 | 100 | 100 | 100 | 0,27 s | 0,48 s | 0,69 s | 21 ms | 0 | 0,73 s | 1 997 |
| 3 | 100 | 96 | 100 | 100 | 100 | 0,27 s | 0,46 s | 0,69 s | 11 ms | 0 | 0,73 s | 2 385 |
| **Mediana** | **100** | **96** | **100** | **100** | **100** | **0,27 s** | **0,47 s** | **0,69 s** | **11 ms** | **0** | **0,73 s** | **2 300** |

### Fiabilidad de la medición

| Comprobación | Resultado |
|---|---|
| Dispersión de Performance, móvil | **1 punto** (84–85) |
| Dispersión de Performance, escritorio | **0 puntos** (100–100–100) |
| Criterio de aceptación | dispersión < 5 puntos |
| Veredicto | ✅ **medición fiable, no se repite** |

Las métricas sueltas sí bailan: el Speed Index en móvil va de 1,37 s a 4,29 s y
el FCP de 0,93 s a 1,88 s. La nota final apenas se mueve. **Es exactamente el
motivo por el que se toman tres ejecuciones y se publica la mediana**: una
métrica aislada tiene mucho más ruido que el agregado.

Informes completos archivados (la ejecución mediana de Performance fue la #1 en
ambos dispositivos):

- [`assets/lighthouse-mobile-2026-08-19.html`](assets/lighthouse-mobile-2026-08-19.html)
- [`assets/lighthouse-desktop-2026-08-19.html`](assets/lighthouse-desktop-2026-08-19.html)

---

## 3. SEO 100 sobre una página sin contenido

Éste es el hallazgo que más importa de todo el informe.

El [informe sin JavaScript del 18-08](no-js-2026-08-18.md) midió **0 caracteres
de texto visible** en el `<body>` servido. Un día después, Lighthouse puntúa el
SEO de esa misma URL con un **100 sobre 100**, en los dos dispositivos y en las
seis ejecuciones.

No es un error de ninguna de las dos mediciones. **Miden cosas distintas:**

| Lighthouse SEO comprueba… | Estado |
|---|---|
| ¿Existe un `<title>`? | ✅ |
| ¿Existe una meta description? | ✅ |
| ¿Tiene `<html lang>` con valor válido? | ✅ |
| ¿Devuelve un código HTTP correcto? | ✅ |
| ¿Los enlaces son rastreables y descriptivos? | ✅ |
| ¿Está bloqueada la indexación? | ✅ no lo está |
| **¿Hay algún contenido en el documento?** | **nunca se pregunta** |

La categoría verifica que **existan las etiquetas**, no que exista algo que
indexar. Y como Lighthouse audita el DOM **después** de ejecutar JavaScript, ve
una página completa donde un crawler sin JS no ve nada.

> **Una nota de 100 no es una conclusión: es un dato que hay que interpretar.**
> Este sitio obtiene la máxima puntuación de SEO y, al mismo tiempo, entrega a un
> cliente sin JavaScript un documento sin una sola palabra de contenido. Las dos
> afirmaciones son ciertas.

Consecuencia práctica para el rendimiento: el `<body>` vacío **no es
principalmente un problema de velocidad**. Entre el CDN de Vercel, la compresión
y una máquina anfitriona rápida, los píxeles acaban apareciendo a tiempo. El
coste real está en quién puede leer la página sin ejecutar JavaScript — y eso no
lo mide ninguna categoría de Lighthouse.

---

## 4. Accesibilidad: 96, con 2 auditorías fallidas

Idénticas en móvil y escritorio:

| Auditoría | Descripción | ¿Estaba en la auditoría del 11-08? |
|---|---|---|
| `color-contrast` | Texto y fondo sin ratio de contraste suficiente | ❌ **Hallazgo nuevo** |
| `label-content-name-mismatch` | Elementos con texto visible cuyo nombre accesible no coincide | ❌ **Hallazgo nuevo** |

**Lo que NO falló, y es más interesante que lo que falló.** La auditoría del
11-08 (§8) documentó que el formulario de contacto no tiene ni un `<label>`, ni
`htmlFor`, ni `id` en ningún input. La auditoría `label` de Lighthouse **pasa**.

Hipótesis a verificar en la tarjeta 0.2 con axe completo: los `placeholder` de
los inputs les proporcionan un nombre accesible suficiente para la comprobación
automática — aunque un placeholder desaparece al escribir y no es una etiqueta.

> **Un 96 en Accessibility no permite escribir «WCAG 2.1 AA» en ningún sitio.**
> Ni un 100 lo permitiría. La categoría de Lighthouse es un subconjunto pequeño
> de axe, y lo automático cubre en torno a un tercio de los criterios WCAG. La
> tarjeta 0.2 mide el resto.

---

## 5. Corrección a la auditoría del 2026-08-11

La auditoría (§13) evaluó así la afirmación «Lighthouse Score: 95+ (Performance)»
del `README.md`:

> *«Sin respaldo. Ninguna medición en el repo. Con 302 KB de JS y el body vacío,
> es muy improbable»*

**La predicción era incorrecta.** Medido: **escritorio 100, móvil 85**. En
escritorio la cifra del README se cumple con holgura.

Lo que **sí** sigue en pie, y es un argumento más sólido que el original:

1. **Nada en el repositorio respaldaba la afirmación.** No existía ninguna
   medición hasta este documento. Eso era cierto y sigue siéndolo.
2. **La afirmación no indica dispositivo.** Sin esa precisión, «95+» describe un
   100 o un 85 según convenga. Un número sin dispositivo, sin fecha y sin método
   no es verificable, y por tanto no vale como afirmación.

La tarjeta 0.7 no se debilita con este hallazgo: se afina. La línea se retira
porque es **inverificable**, no porque fuera pesimista.

### Sobre «Core Web Vitals: All passing» (README)

- **LCP móvil 3,03 s** queda por encima del umbral «bueno» de Google (≤ 2,5 s),
  en la franja de «necesita mejorar» (2,5–4,0 s).
- **CLS 0** en las seis ejecuciones, muy por debajo del límite de 0,1.

Pero los Core Web Vitals se juzgan oficialmente con **datos de campo**, en el
percentil 75 de usuarios reales. Esta medición es de laboratorio. **No se puede
afirmar ni desmentir «all passing» con estos datos** — sólo constatar que en
laboratorio y en móvil, el LCP no alcanza el umbral de «bueno».

---

## 6. Predicciones registradas antes de arreglar nada

Se anotan ahora, con la línea de base medida, para poder contrastarlas cuando se
corrija el renderizado en servidor (Fase 2). Una predicción sólo cuenta si se
escribe antes.

| Métrica | Hoy (móvil) | Predicción al arreglar el SSR | Motivo |
|---|---:|---|---|
| **LCP** | 3,03 s | **Baja mucho** | Hoy el texto no puede pintarse hasta que se descarga el JS, se ejecuta e i18next se inicializa. Con SSR el contenido viaja ya en el HTML. |
| **TBT** | 345 ms | **Baja poco, de momento** | El SSR no reduce el JavaScript enviado, sólo cambia *cuándo* aparece el contenido. El TBT bajará cuando dejen de mandarse al cliente componentes que no lo necesitan. |
| **CLS** | 0 | **Puede empeorar** | El 0 actual no es mérito: no hay saltos de maquetación porque no hay maquetación progresiva. La página está vacía y luego aparece entera de golpe. Al renderizar en servidor aparece la posibilidad real de desplazamientos. |
| **SEO** | 100 | **Sin cambio** | Ya está en el máximo. La mejora real —que un crawler sin JS lea el contenido— **no la mide esta categoría**. |

Esa última fila es la más importante del informe: **el arreglo más valioso de
toda la refactorización no va a mover ni un punto la nota que lo mediría.**

---

## 7. Lo que NO se ha verificado

1. **Datos de campo.** No hay CrUX ni analítica instalada. Todo lo anterior es
   laboratorio.
2. **Comportamiento en un dispositivo real de gama media.** Se ha medido con
   throttling simulado sobre una máquina rápida (`benchmarkIndex` ~2 300–2 500).
3. **Qué elementos concretos fallan el contraste**, y qué elementos tienen
   discordancia entre texto visible y nombre accesible. Lighthouse los señala;
   el detalle corresponde a la tarjeta 0.2 con axe.
4. **Estabilidad a lo largo del día.** Las 6 ejecuciones se concentran en ~20
   minutos. No se ha medido en franjas horarias distintas ni desde otra red.
5. **Contenido de la categoría «Agentic Browsing».** Puntúa 100, pero no se ha
   analizado si es por cumplimiento real o por auditorías no aplicables.

---

## 8. Conclusiones

1. **Performance: 85 en móvil, 100 en escritorio.** Mejor de lo que anticipaba la
   auditoría del 11-08, cuya predicción se corrige aquí.

2. **El coste medible del `<body>` vacío está en el LCP móvil (3,03 s) y en el
   TBT (345 ms).** No en el resto: FCP, Speed Index y CLS están bien.

3. **SEO 100 sobre una página sin contenido indexable.** La lección central de
   esta tarjeta: una herramienta automática puntúa lo que sabe comprobar, no lo
   que importa. Este informe y el del 18-08 se leen juntos o no se entienden.

4. **Accessibility 96, con dos hallazgos que la auditoría por lectura de código
   no detectó.** Y con la auditoría de etiquetas del formulario pasando pese a
   que el formulario no tiene etiquetas. La tarjeta 0.2 lo aclara.

5. **La medición es fiable** — 1 punto de dispersión en móvil, 0 en escritorio —
   **y es de laboratorio.** Ambas cosas hay que decirlas juntas.

**Alcance.** Este informe mide; no arregla. Ningún archivo de la aplicación se ha
modificado, y Lighthouse se ejecutó con `npx`, sin entrar en `package.json` ni en
el lockfile.
