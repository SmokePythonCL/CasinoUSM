---
version: alpha
name: casino-usm
description: Sistema de diseño e interfaz de usuario para la plataforma de reserva de colaciones institucionales y consulta de minutas de la Universidad Técnica Federico Santa María (USM).
colors:
  brand-primary: "#005e90"
  brand-secondary: "#0c5788"
  brand-accent: "#fab000"
  surface-base: "#ffffff"
  surface-muted: "#f4f5f6"
  surface-card: "#ffffff"
  surface-border: "#d2d7db"
  text-primary: "#212529"
  text-secondary: "#535a61"
  text-muted: "#6c757d"
  info-bg: "#d1ecf1"
  info-text: "#1a5b66"
  info-border: "#bee5eb"
  diet-traditional: "#005e90"
  diet-vegetarian: "#2e7d32"
  diet-hypocaloric: "#e65100"
  status-success: "#28a745"
  status-warning: "#ffc107"
  status-danger: "#dc3545"
typography:
  sans:
    fontFamily: "Open Sans, sans-serif"
  display:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "28px"
    lineHeight: "36px"
    fontWeight: "700"
  heading:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "20px"
    lineHeight: "28px"
    fontWeight: "600"
  subheading:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "16px"
    lineHeight: "24px"
    fontWeight: "600"
  body:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "14px"
    lineHeight: "20px"
    fontWeight: "400"
  caption:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "12px"
    lineHeight: "16px"
    fontWeight: "400"
rounded:
  none: "0px"
  sm: "4px"
  base: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
---

## Overview

Casino USM es la plataforma de gestión logística para la reserva y consulta de colaciones institucionales dirigida a docentes y funcionarios de la Universidad Técnica Federico Santa María. El sistema rediseñado transforma un trámite burocrático rígido en un servicio digital ágil centrado en las personas, erradicando la necesidad de documentos estáticos externos en Microsoft SharePoint, habilitando la planificación mensual por bloques o días no consecutivos y permitiendo el ajuste de menús sin anulación destructiva.

## Colors

- El color institucional dominante `{colors.brand-primary}` (`#005e90`) define la barra de navegación superior, los encabezados de sección y las acciones principales.
- El color de acento `{colors.brand-accent}` (`#fab000`) se reserva para elementos activos, indicadores de foco y llamados de atención de alta visibilidad.
- Los paneles informativos y avisos de horarios de corte utilizan el esquema de alerta `{colors.info-bg}` con texto en `{colors.info-text}` y borde `{colors.info-border}` para ofrecer contraste legible sin saturar la pantalla.
- La distinción de regímenes alimenticios debe mantener consistencia semántica en todo el flujo:
  - **Tradicional:** `{colors.diet-traditional}`
  - **Vegetariano:** `{colors.diet-vegetarian}`
  - **Hipocalórico:** `{colors.diet-hypocaloric}`

## Typography

- La tipografía global de la interfaz es `Open Sans`, sans-serif.
- El rol `{typography.display}` se emplea exclusivamente en los títulos de vistas principales (p. ej., "Reserva de Menú Semanal").
- El rol `{typography.heading}` estructura tarjetas y cabeceras de tablas de menú.
- El rol `{typography.subheading}` identifica días de la semana y nombres de platos individuales.
- El rol `{typography.body}` se aplica a descripciones de menú, ingredientes y etiquetas de formulario.
- El rol `{typography.caption}` se reserva para metadatos secundarios, avisos de corte de horario (16:00 hrs) y etiquetas de alérgenos.

## Layout

- **Estructura General:** Disposición en contenedor fluido con ancho máximo de 1280px centrado. Encabezado institucional persistente que incluye la identificación institucional USM, el usuario en sesión y el selector de pestañas de navegación:
  1. *Visor de Minuta*
  2. *Reserva de Menú*
  3. *Mis Reservas*
  4. *Mis Consumos*
- **Visor de Minuta:** Rejilla flexible estructurada por columnas de lunes a viernes con navegación semanal (anterior / actual / siguiente) y filtros rápidos por tipo de dieta mediante chips.
- **Panel de Reserva:** Distribución en dos columnas sincronizadas:
  - *Columna izquierda (60%):* Calendario interactivo mensual que admite selección de días continuos o discontinuos con realce de días hábiles elegibles.
  - *Columna derecha (40%):* Panel resumen en tiempo real con selector de sede/campus, tipo de menú para cada día seleccionado y botón de confirmación consolidada.

## Components

### Visor de Minuta
- Contiene selectores de semanas y pestañas/chips para filtrar la dieta visible (Todos, Tradicional, Vegetariano, Hipocalórico).
- Cada tarjeta diaria desglosa: Sopa/Crema, Plato de Fondo, Ensalada, Postre e iconos accesibles de alérgenos (gluten, lactosa, mariscos, frutos secos, huevos).

### Selector de Calendario Multidía
- Permite seleccionar días mediante un único clic por fecha, admitiendo selecciones salteadas dentro del mes sin requerir rangos cerrados continuos.
- Deshabilita automáticamente fechas pasadas y días inhábiles.
- Despliega advertencia visible sobre el límite de corte diario (16:00 horas del día hábil anterior).

### Gestor de "Mis Reservas"
- Tabla interactiva que presenta: Código de reserva, Fecha de consumo, Tipo de menú, Campus/Sede y Estado.
- Cada elemento incluye la acción "Modificar", la cual abre un diálogo emergente (modal) para reasignar el menú o añadir requerimientos dietarios/alérgicos sin eliminar la reserva previa ni poner en riesgo el cupo del comensal.

### Badges de Alérgenos y Dietas
- Elementos compactos con radio de borde `{rounded.full}` y relleno semántico para rápida identificación visual sin sobrecargar el espacio textual.

## Do's and Don'ts

### Do's
- Mantener la minuta alimenticia siempre integrada dentro del sistema React, preservando el contexto y la navegación del usuario.
- Permitir la reserva de múltiples fechas (consecutivas o dispersas) en una única transacción de confirmación.
- Facilitar la modificación de tipo de menú o solicitud de exclusión de ingredientes directamente en línea antes del horario de corte.
- Indicar siempre el estado de la reserva y confirmar las modificaciones con mensajes de retroalimentación inmediata.

### Don'ts
- No redirigir al usuario hacia SharePoint, archivos PDF o repositorios externos para la lectura de la minuta diaria.
- No exigir la anulación de una reserva vigente como único mecanismo para cambiar de plato o actualizar la fecha.
- No usar combinaciones de colores que impidan diferenciar claramente las categorías de dieta (Tradicional vs. Vegetariano vs. Hipocalórico).
- No ocultar ni postergar la comunicación de la hora límite de reserva (16:00 hrs del día hábil previo).
