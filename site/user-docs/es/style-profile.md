---
description: "Crea un perfil de estilo local a partir de tus textos y gestiona reglas sobre voz y tipografía."
---

# Perfil de estilo

Usa el **Perfil de estilo** para proporcionar al asistente ejemplos de tus textos e indicaciones reutilizables. Las muestras permanecen en este dispositivo. No pasan a formar parte de ningún *artículo* ni *versión guardada*.

Abre el **Perfil de estilo** desde el **área de utilidades de la Biblioteca de artículos**. Usa el menú lateral o, en una ventana estrecha, el selector de sección para elegir **Muestras de escritura**, **Reglas manuales** o **Reglas tipográficas**. El botón **Volver** te devuelve al *artículo* y a la vista que tenías abierta.

::: tip Elige por dónde empezar
Añade muestras de escritura si quieres que se detecten características de voz, o añade **Reglas manuales** si ya sabes qué indicaciones dar. Puedes usar cualquiera de las dos opciones por separado.
:::

## Añadir muestras de escritura

Abre **Muestras de escritura** para que el asistente aprenda de textos que ya escribiste. Elige **Añadir muestra de escritura** para pegar texto o subir un archivo `.txt` o `.md`. También puedes elegir **Añadir versión guardada** para usar como muestra una versión guardada del *artículo*. Ponle un nombre que te ayude a reconocerla más adelante.

Usa la casilla de la muestra para incluirla o excluirla del perfil. Si la excluyes, permanece en la lista. Elimina una muestra cuando ya no la necesites. Se pide confirmación porque la muestra se borra del Perfil de estilo.

## Añadir indicaciones y regenerar el perfil

Usa **Reglas manuales** para describir preferencias que deba seguir el asistente. Por ejemplo, puedes pedirle que mantenga la narración en primera persona o que explique una abreviatura la primera vez que aparece. Puedes añadir indicaciones sin incluir muestras.

Después de cambiar muestras o indicaciones, elige **Regenerar perfil** para actualizar las características detectadas. El perfil muestra qué muestras usó y cuándo se regeneró. Hasta entonces, las características detectadas pueden corresponder al conjunto anterior de muestras. Las *observaciones* de la revisión de estilo son orientativas y permanecen separadas del texto del *artículo*.

[![Pantalla de reglas manuales del Perfil de estilo con una regla global sobre el punto de vista de Ana y el control para regenerar el perfil.](/images/style-profile-rules.png)](/images/style-profile-rules.png)

*Ejemplo de regla manual en el Perfil de estilo.*

::: details Ejemplo de regla manual
Añade escenas que muestren el punto de vista cercano de Ana y una imaginería tranquila; excluye lo que no quieras usar y luego regenera el perfil. Añade una regla como «Mantén la narración cerca del punto de vista de Ana» si esa preferencia debe aplicarse aunque las muestras no la reflejen con claridad.
:::

## Reglas tipográficas

Abre **Reglas tipográficas** y selecciona **Idioma tipográfico**. Las convenciones se guardan por separado para cada idioma de escritura, independientemente del idioma de la interfaz. **Aplicar reglas a** permite elegir entre **Todos los artículos en este idioma** y **Solo este artículo**. Una *traducción* utiliza su propio idioma y sus propias preferencias.

El menú **Idioma de origen** de la barra de estado incluye idiomas regionales del catálogo de ajustes preestablecidos. Para otro idioma, elige **Otro idioma…** e introduce su código, por ejemplo `ja` para japonés. Luego podrás guardar reglas tipográficas personalizadas para ese idioma aunque no haya un ajuste preestablecido integrado.

Usa **Añadir regla** para configurar comillas, guiones de prosa, puntos suspensivos, espaciado de signos de puntuación, espacios repetidos o pares de tokens inseparables como `10 kg`. **Par personalizado** permite definir comillas de apertura y cierre y el espaciado interior. **Sustitución literal de puntuación** aplica una convención exacta de puntuación o espaciado. Usa **Instrucción tipográfica contextual** cuando la regla requiera criterio.

::: info Idioma y alcance
Elige el idioma de escritura e indica si las reglas se aplican a todos los *artículos* en ese idioma o solo al *artículo* actual. Una *traducción* tiene su propio idioma y preferencias tipográficas.
:::

**Ajuste preestablecido de convenciones** muestra vistas previas de las convenciones regionales. Las vistas marcadas como **pendientes de revisión por una persona nativa del idioma** todavía no se pueden aplicar; puedes configurar tus propias reglas. Las convenciones regionales no se aplican automáticamente a otras regiones. Si tus reglas anteriores eran globales, **Copiar reglas anteriores a este idioma** asigna una copia sin borrar los originales.

Las reglas de un *artículo* heredan las convenciones guardadas para el idioma. Al editar una regla heredada, la sustituyes; al quitarla, la desactivas para ese ámbito. **Restaurar reglas heredadas** elimina esas sustituciones. Si cambias de idioma, las ediciones de reglas sin guardar se conservan mientras el Perfil de estilo siga abierto.

Las reglas aparecen como resúmenes breves marcados **Guardada** o **Sin guardar**. Elige **Editar** para abrir una regla; solo se puede editar una a la vez. **Guardar** guarda el ámbito seleccionado. Guardar las preferencias de idioma también regenera localmente el *Perfil de estilo* a partir de las muestras incluidas y las indicaciones guardadas, incluidos los cambios en la inclusión de muestras. Las sustituciones específicas de un *artículo* se guardan para ese *artículo*. El texto sin guardar de otros formularios permanece sin guardar. Puedes usar reglas tipográficas explícitas sin muestras de escritura; las muestras son necesarias para deducir características de voz.

Guarda el *borrador* actual y selecciona **Comprobar tipografía** para revisar el *artículo* seleccionado sin conexión de IA. La comprobación usa la *versión guardada* y el idioma que muestra la barra de estado. Al comprobarlo, elige ese mismo idioma en **Idioma tipográfico**. El código, las URL, los identificadores técnicos y los casos ambiguos de comillas permanecen sin cambios. Las reglas contextuales requieren una **Revisión del estilo de escritura** completa mediante el asistente. Si un idioma no tiene reglas mecánicas aplicables, no hay cobertura tipográfica local; añade y guarda tus propias reglas antes de comprobarlo.

Abre **Revisar propuesta** para inspeccionar las correcciones y las reglas que las respaldan. Marca como aceptadas las correcciones que quieras y elige **Aplicar**. Las correcciones aceptadas crean una *versión guardada*; si las rechazas todas, el *artículo* queda sin cambios. Guardar reglas o ejecutar una comprobación no aplica correcciones. La revisión conserva el idioma y las definiciones de reglas que utilizó; si cambias el idioma o las preferencias aplicables, se ofrecerá volver a ejecutarla. La tipografía no detecta los límites entre idiomas en pasajes que mezclan varios. Los casos ambiguos permanecen sin cambios.
