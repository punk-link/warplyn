---
description: "Verifica afirmaciones factuales, consulta las fuentes y los veredictos, y decide cómo gestionar las observaciones de la verificación de datos."
---

# Verificación de datos

Usa **Verificar datos** para investigar afirmaciones comprobables de un *artículo*, como detalles históricos o declaraciones sobre un lugar. El asistente devuelve *observaciones* orientativas con explicaciones, fuentes e incertidumbre. La comprobación no modifica tu texto.

La verificación de datos requiere una [conexión de IA y un modelo](providers.md) que admitan comprobaciones basadas en fuentes. El proveedor podría cobrarte por su uso.

## Iniciar una comprobación

1. Abre el *artículo*. Selecciona un pasaje si quieres limitar la comprobación.
2. Abre **Acciones rápidas** y elige **Verificar datos**. También puedes pedir al asistente que compruebe afirmaciones del texto.
3. Revisa las afirmaciones que seleccione el asistente y quita la selección de las que no quieras comprobar.
4. Selecciona **Enviar solicitud editorial**.
5. Abre **Verificación de datos** para inspeccionar los resultados correspondientes a la *versión guardada* que se está comprobando.

::: tip Ejemplo
En «El río al anochecer», Ana dice que la luna llena hará subir el agua lo suficiente como para cubrir el camino. Comprueba esa afirmación con fuentes pertinentes al río y al entorno de la historia. Antes de cambiar la escena, verifica si las fuentes hablan de ese río en concreto.
:::

Puedes seguir escribiendo o ir a otra parte mientras se ejecuta la comprobación. Si queda incompleta, solo estarán disponibles las *observaciones* terminadas. Solicita otra comprobación para las afirmaciones pendientes.

## Leer el veredicto y las fuentes

Selecciona una afirmación en **Verificación de datos** para leer su explicación, las fuentes, la fecha de comprobación y la incertidumbre.

| Veredicto | Significado |
| --- | --- |
| **Respaldada** | Las pruebas encontradas respaldan la afirmación. Aun así, comprueba que las fuentes sean pertinentes para tu contexto. |
| **En disputa** | Las pruebas encontradas cuestionan la afirmación. Lee la explicación y las fuentes antes de decidir qué cambiar. |
| **No verificable** | No se pudo establecer la afirmación con las pruebas disponibles. Esto no significa por sí solo que sea falsa. |

Abre los enlaces a las fuentes y comprueba su pertinencia, fechas y redacción. Una *observación* es una recomendación, no una prueba. La fecha de comprobación indica cuándo se revisó la afirmación; no significa que todas las fuentes se publicaran ese día.

## Decidir qué hacer con una observación

Para una *observación* sin resolver en la comprobación más reciente de la *versión guardada* actual, elige la acción que corresponda a tu decisión.

| Acción | Resultado |
| --- | --- |
| **Aceptar tal como está** | Registra que tienes la intención de conservar la afirmación tal como está redactada. La *observación* muestra **Aceptada tal como está**. |
| **Aceptar las pruebas** | Registra que revisaste y aceptaste las pruebas. La *observación* muestra **Pruebas aceptadas**. |
| **Proponer una corrección** | Para una afirmación **En disputa** o **No verificable**, pide al asistente que prepare una *propuesta* de corrección. Revísala antes de aplicar los cambios. |

Ambas acciones de aceptación resuelven la *observación*, quitan los botones de decisión y evitan que solicite atención en la Biblioteca de artículos. Ninguna modifica el *artículo* ni el veredicto. Registran motivos distintos para tu decisión, pero tienen el mismo efecto en el flujo de revisión.

Por ejemplo, **En disputa · Pruebas aceptadas** significa que la comprobación cuestionó la afirmación y que aceptaste las pruebas presentadas. **No** significa que la afirmación se haya corregido o que ahora esté respaldada. Si hace falta cambiar el texto, edita el *artículo* o solicita una corrección antes de resolver la *observación*.

Para solicitar varias correcciones a la vez, selecciona afirmaciones **En disputa** o **No verificables** que no estén resueltas y elige **Proponer correcciones**. En la [Revisión de propuestas](reviewing-articles.md#review-a-proposal), inspecciona la redacción sugerida y aplica los cambios que aceptes. El texto aceptado crea una nueva *versión guardada*.

## Volver a comprobar después de los cambios

Las *observaciones* corresponden a la *versión guardada* que se comprobó. Cuando otra *versión guardada* pasa a ser la actual, las anteriores siguen disponibles para consulta, pero quedan obsoletas. Elige **Volver a ejecutar la verificación de datos** antes de actuar según ellas.

Usa el **Historial de la verificación de datos** para consultar ejecuciones anteriores. Son de solo lectura; solo puedes actuar sobre la ejecución más reciente de la *versión guardada* actual.

Una comprobación posterior puede reutilizar pruebas y decisiones de aceptación si reconoce un dato que no cambió, aunque la afirmación se haya reformulado. Los resultados reutilizados muestran **Pruebas reutilizadas de la versión** y conservan la fecha de comprobación anterior. Si cambia el sentido factual, puede ser necesario investigar de nuevo.

Volver a ejecutar una comprobación no garantiza que se investigue de nuevo cada afirmación sin cambios. Si se trata de datos que pueden cambiar con el tiempo, consulta la fuente y las fechas de comprobación y pide expresamente al asistente que verifique la afirmación con fuentes actuales.
