# Isabel Pérez — portafolio

Sitio estático: HTML, CSS y JavaScript sin librerías ni dependencias. No necesita instalación ni compilación.

## Estructura

```
index.html              Página (contenido, metadatos SEO, datos estructurados)
assets/css/main.css     Estilos
assets/js/main.js       Interacción: entrada, lluvia, revelado de fotos, idiomas ES/EN, índice, visor
assets/img/             Cada foto en 3 tamaños: -480, -960 y -1600 (.jpg)
assets/video/           lluvia.mp4 y su fotograma de espera (lluvia-poster.jpg)
favicon-32.png, favicon-192.png, apple-touch-icon.png   Icono de pestaña: monograma IP en Syne
robots.txt, sitemap.xml
```

## Cómo cambiar cosas

- **Fotos de un proyecto:** en `assets/js/main.js`, la lista `PH` (proyecto, nombre de archivo, ancho, alto, texto alternativo…). Cada foto nueva necesita sus tres tamaños en `assets/img/` con el sufijo `-480`, `-960` y `-1600`.
- **Frase de cada foto:** lista `CAPS` (español) y claves `cap-N` del diccionario `EN` (inglés), en el mismo orden que `PH`.
- **Textos en inglés:** diccionario `EN` en `assets/js/main.js`. El español está en `index.html` (y en `main.js` para lo que se crea con JavaScript).
- **Volumen de la lluvia:** constante `RAIN` en `assets/js/main.js` (0 a 1).

## Antes de publicar

1. Dominio: `https://isabelperez.net` (en `index.html`, `robots.txt` y `sitemap.xml`). Correo: `projects@isabelperez.net`.
2. Cuando tengas Instagram o LinkedIn, cambia «pendiente» por el enlace en el panel de contacto de `index.html`.
3. Sube la carpeta completa a cualquier hosting estático (por ejemplo Netlify, Vercel o GitHub Pages).

## Accesibilidad y rendimiento

- Respeta la preferencia del sistema «reducir movimiento»: sin animaciones, sin inercia, sin gotas.
- Las fotos se cargan solo cuando están por aparecer, y en el tamaño que necesita cada pantalla.
- Navegable con teclado (flechas para pasar de escena, Escape para cerrar) y con enlace para saltar a las fotografías.
