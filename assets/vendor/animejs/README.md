# Anime.js local

Versión exacta: **4.5.0**. Licencia: **MIT**, copyright © 2025 Julian Garnier, conservada íntegra en [4.5.0/LICENSE.md](4.5.0/LICENSE.md).

Se aloja la distribución oficial UMD minificada en [4.5.0/anime.umd.min.js](4.5.0/anime.umd.min.js), sin modificar ni recompilar (118.043 bytes). La página la carga con `defer` antes de `motion.js`. Funciona en GitHub Pages, bajo un subdirectorio y sin bundler, import map, instalación npm ni CDN en producción.

Procedencia consultada el 16 de octubre de 2026:

- Paquete oficial enlazado en la [documentación de instalación](https://animejs.com/documentation/getting-started/installation/): [`animejs@4.5.0`](https://www.npmjs.com/package/animejs/v/4.5.0).
- Archivo descargado: <https://registry.npmjs.org/animejs/-/animejs-4.5.0.tgz>.
- Rutas originales: `package/dist/bundles/anime.umd.min.js` y `package/LICENSE.md`.
- Repositorio del proyecto: <https://github.com/juliangarnier/anime>.

El archivo npm se obtuvo con `npm pack animejs@4.5.0 --ignore-scripts` fuera del repositorio. Se comprobó su integridad SHA-512 frente al metadato publicado antes de extraer ambos archivos. No se ejecutaron scripts del paquete.

```text
Tarball (integrity de npm):
sha512-NQimYX+lz8WaXonGS9zVVoviCIAjONeJayxacUditaivYLqyXgGjFKjuyl0aUUhFKm5MriX9ty1TGovNzoJQWA==

SHA-256 anime.umd.min.js:
8d5b3a58a1f64023a04a4cedeef135a2263b18da04b35177ac13438a0bad033b

SHA-256 LICENSE.md:
3f3e835a9952cfc2a6ca836fb95b3257c981f24fa3ef51249055acb09931897b
```

Referencias y ejemplos oficiales consultados para la integración:

- [Timelines y posiciones](https://animejs.com/documentation/timeline/).
- [Inicializar entradas coordinadas con init](https://animejs.com/documentation/timeline/timeline-methods/init/).
- [onScroll: animación, timer y timeline](https://animejs.com/documentation/events/onscroll/).
- [Sincronización de progreso con `sync: true`](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress/).
- [Umbrales de entrada y salida](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/).
- [Recalcular límites con refresh](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/refresh/).
- [Desmontar un ScrollObserver con revert](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/revert/).
- [Restaurar una timeline con revert](https://animejs.com/documentation/timeline/timeline-methods/revert/).
- [Trazado SVG con createDrawable](https://animejs.com/documentation/svg/createdrawable/).
