---
layout: inner
title: ‘Sustituye este texto por el título del post’
date: 2015-08-31 13:26:34
categories: blog development
tags: cats dogs code
featured_image: 'http://placekitten.com/1500/1000'
lead_text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita maiores quisquam id sunt, a architecto molestias velit, distinctio quidem non, nostrum provident quibusdam enim. Neque ipsam temporibus commodi facere minima.'
---

Este es el texto que aparece como resúmen en la página principal del blog. Termina justo cuando empiezas un nuevo párrafo, por lo tanto aquí debe ir un super texto que llame la atención del lector y le invite a abrir el post. Este es el fin.

Aquí comienza el contenido del post, este solo aparecerá una vez que entremos a ver el post desde la página principal.
Este docuento se usará para generar automáticamente un nuevo post, se debe guardar con el siguiente formato: yyyy-mm-dd-titulo-igual-que-title.md (Ejemplo: 2015-09-28-diferentes-tipos-de-nubes.md)
El título del archivo debe ser igual al título que se usa en la configuración del post; solo que todo en minúsculas, espacios sustituidos por guiones y sin acentos.

Esta plantilla se usa para todos los demás posts que no se centran en un video, debe llevar una imágen.

En la parte superior de este documento tenemos la configuración del post:
1 - Siempre debe estar encerrada entre esos tres guiones (- - -)
2 - layout: inner //Este nunca debe cambiarse
3 - title: ’título’ //Escribe entre las comillas el título del post
4 - date: yyyy-mm-dd hh-mm-ss //Fecha de creación del post, siempre con el mismo formato
5 - categories: cat1 cat2 //Categorías en las que se clasifica el post, mínimo una, máximo dos.
6 - tags: tag1 tag2 //Tags para identificar y agrupar palabras clave de posts similares, mínimo una, máximo cinco.
7 - featured_image: ‘url_imagen’ //Aquí pondrás la URL absoluta de la imágen que aparecerá en el encabezado del post y como miniatura cuando se comparte en redes sociales. En caso de que la imágen no esté en internet y haya que subirla al servidor, se utilizará el formato: ‘http://cloudankloud.com/blog/img/nombre_de_tu_imagen.jpg'
8 - lead_text: ‘texto’ //Escribe entre las comillas una pequeña descripción o introducción al post, este texto aparece en la parte superior del post (Antes del resúmen de la página principal), y aparece en la descripción cuando se comparte en redes sociales.

Este documento se debe formatear con markdown y guardarse con extensión .md

Más sobre markdown: http://www.web-crunch.com/resources/lowdown-markdown/