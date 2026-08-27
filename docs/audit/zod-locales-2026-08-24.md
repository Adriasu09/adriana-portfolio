# Por qué los locales de `zod` no se pueden sacar del bundle — 24 agosto 2026

Investigación de la tarjeta 1.13 (Fase 1). El informe
[`bundle-2026-08-20.md`](bundle-2026-08-20.md) midió que **139,42 KB del bundle
de cliente —el 13,1 % del total y el 53,5 % de `zod`— son mensajes de error en
unos 40 idiomas**, de los que el sitio usa dos. Esta tarjeta buscaba una forma
limpia de eliminarlos.

**Resultado: no existe hoy. La tarjeta se cierra sin cambios en el código.**

- Rama: `perf/zod-locales`
- `zod` instalada: **4.3.6** · última publicada comprobada: **4.4.3**
- Next.js 16.2.9 (Turbopack) · Node 24.15.0 · pnpm 10.33.2

---

## 1. Método: contar locales sin source maps

El informe del 20-08 necesitó `source-map-explorer` y un cambio temporal en
`next.config.ts` para atribuir KB por paquete. Aquí no hace falta llegar a tanto:
no se busca *cuánto* pesan, sino *si siguen estando*.

La técnica es más barata y más directa. Cada fichero de locale contiene cadenas
literales en su idioma. Si esas cadenas aparecen en los chunks del build, el
locale está dentro:

1. De cada `node_modules/zod/v4/locales/<idioma>.js` se extraen los literales de
   entre 8 y 40 caracteres que contengan algún carácter **no ASCII** — es decir,
   texto propio de ese idioma y no compartido con el resto.
2. Se busca cada sonda en la concatenación de `.next/static/chunks/*.js`.
3. Si alguna aparece, el locale viaja en el bundle.

**Limitación conocida, y por eso el número es un suelo y no un total:**

| Categoría | Nº | Por qué |
|---|---:|---|
| Confirmados en el bundle | **34** | al menos una sonda encontrada |
| No detectados | 6 | `eo fa ja ko ps zh-TW` — el minificador puede escapar caracteres no ASCII como `\uXXXX`, con lo que la sonda deja de coincidir literalmente |
| Sin sonda posible | 9 | `en id is it kh ms nl ua zh-CN` — sus mensajes son ASCII y no se distinguen del resto del bundle |

Una comprobación manual previa con cadenas escritas a mano sí localizó japonés
(`無効な入力`) en el mismo chunk, lo que confirma que al menos parte de los «no
detectados» también está presente. **34 es el mínimo demostrable, no el
recuento.**

Script reproducible: extrae sondas, busca, e informa del chunk. No modifica nada
del repositorio y no necesita source maps.

---

## 2. La causa

Tres ficheros de `zod` contienen la misma línea:

```js
// zod/v4/classic/external.js:14
// zod/v4/core/index.js:9
// zod/v4/mini/external.js:7
export * as locales from "../locales/index.js";
```

`export * as locales` no exporta cuarenta módulos independientes: exporta **un
único objeto** que los contiene a todos. Para construir ese objeto, el
empaquetador necesita los cuarenta. Y no puede descartarlo, porque no puede
demostrar que nadie escriba `z.locales[variable]` en tiempo de ejecución — eso
solo se sabría ejecutando el programa. Ante la duda, incluye.

Es el contraste exacto con `lucide-react`, que el informe del 20-08 midió en
**4,3 KB pese a tener 176 módulos**: allí cada icono es un export nombrado
independiente y el análisis estático sí puede seguirle la pista.

`locales/` ocupa **243 KB en disco** repartidos en 50 ficheros `.js`.

---

## 3. Vías probadas

| Vía | Resultado |
|---|---|
| **`zod/mini`** | ❌ `mini/external.js:7` tiene la misma reexportación. No reduce los locales, y obligaría a reescribir todos los esquemas con otra API |
| **`zod/v4/core`** | ❌ `core/index.js:9`, idéntico. Además no expone la API de conveniencia que usa el proyecto |
| **Actualizar `zod`** | ❌ comprobado contra **4.4.3**, la última publicada: la estructura es la misma que en 4.3.6 |
| **`experimental.optimizePackageImports: ["zod"]`** | ❌ **medido**: 34 locales antes, 34 después; chunk de 375,3 KB antes y después. La opción reescribe *tus* importaciones para no pasar por el barril del paquete, pero el problema está en una reexportación interna a la que el código de la aplicación no llega. El cambio en `next.config.ts` se revirtió |
| **Alias del empaquetador a un módulo vacío** | ⚠️ descartada por criterio, no por imposibilidad. Apuntaría a rutas internas de `zod` (`zod/v4/locales/index.js`); el día que el paquete las reorganice, deja de aplicarse **sin error**, y nadie se entera hasta la siguiente auditoría de bundle |
| **Sacar `zod` del cliente** y validar el formulario a mano | ❌ eliminaría los 260,7 KB enteros, pero duplicaría las reglas de validación en cliente y servidor y rompe la convención del `CLAUDE.md`: *«every form and every API route input is validated with a Zod schema from `src/lib/validations/`»* |
| **Cambiar de librería de validación** | ❌ fuera de alcance por decisión explícita del plan de Fase 1 |

---

## 4. Detalle que agrava el hallazgo

El proyecto **no usa los mensajes de error de `zod` en ningún idioma**.
`getContactFormSchema(t)` pasa un mensaje traducido propio a cada validación
(`src/lib/validations/contact.ts:14-26`), y la ruta de API pasa
`const t = (key) => key`. La única validación sin mensaje propio es
`z.union([z.literal("es"), z.literal("en")])`, sobre un campo interno que el
visitante nunca ve.

Es decir: los 139,42 KB no son «idiomas que no se usan todavía». Son **texto que
este proyecto no mostraría en ninguna circunstancia**.

---

## 5. Conclusión

**Se cierra la tarjeta 1.13 sin cambios en el código.** Las opciones disponibles
hoy son o inefectivas (`mini`, `core`, actualizar, `optimizePackageImports`), o
frágiles (alias a rutas internas), o desproporcionadas (rehacer la validación).

Forzar un apaño para ganar 139 KB en un portfolio, a cambio de una configuración
que puede romperse en silencio con la siguiente versión del paquete, no es un
buen intercambio. Se documenta y se deja medido.

### Qué vigilar

- Si `zod` sustituye alguna vez el `export * as locales` por exports nombrados,
  el problema desaparece solo. Merece recomprobarse en la próxima auditoría de
  bundle con el método del apartado 1, que cuesta un minuto.
- Si en algún momento el peso de este chunk pasa a ser el cuello de botella real
  del LCP — hoy no lo es: el problema dominante es que el `<body>` se sirve vacío
  ([`no-js-2026-08-18.md`](no-js-2026-08-18.md)) — la opción del alias vuelve a
  la mesa, pero entonces con una prueba automática que falle si deja de aplicarse.

---

## 6. Lo que NO se ha verificado

1. **El peso exacto de los locales en este build.** El informe del 20-08 lo
   estableció en 139,42 KB con source maps. Aquí solo se ha comprobado
   *presencia*, no tamaño; no se ha vuelto a ejecutar `source-map-explorer`.
2. **El recuento total de locales presentes.** 34 es el mínimo demostrable; 15
   quedan sin determinar por las limitaciones del apartado 1.
3. **Si un alias del empaquetador funcionaría de hecho.** Se ha descartado por
   criterio de fragilidad, sin implementarlo ni medirlo.
4. **El comportamiento con webpack en lugar de Turbopack.** Todas las
   mediciones son con Turbopack, el empaquetador por defecto del proyecto.
