# Casino USM - Plataforma Web Oficial (React)

Producto funcional desarrollado en React para la plataforma logística de reserva de colaciones institucionales y consulta de minutas de la **Universidad Técnica Federico Santa María (USM)**.

Desarrollado bajo principios de **Lean UX**, las directrices de Jakob Nielsen y el sistema de diseño especificado en [`DESIGN.md`](./DESIGN.md).

---

## 👥 Integrantes del Grupo

* **Kran Olivares Rojas** - 202373542-6
* **Alejandro Ortiz Tapia** - 202373572-8
* **Sergio Cárcamo Naranjo** - 202273512-0

---

## 🎯 Metas de los Usuarios Implementadas

Basadas en el arquetipo de persona **Juan Carmona (Docente USM)** y las hipótesis Lean UX del proyecto:

| Meta / Hipótesis | Funcionalidad Implementada | Vista en la App |
| :--- | :--- | :--- |
| **Meta 1 (H1: Retención e Información):** Encontrar el menú dietario de cualquier semana sin salir de la plataforma | **Visor Integrado de Minuta:** Reemplaza la redirección hacia SharePoint por una vista reactiva con navegación semanal (Semanas 1 a 4), selector de regímenes alimenticios (Tradicional, Vegetariano, Hipocalórico), buscador de ingredientes y desglose claro de alérgenos y calorías. | `/` (*Visor de Minuta*) |
| **Meta 2 (H2: Eficiencia en Agendamiento):** Reservar colaciones para múltiples días no consecutivos en una sola transacción | **Selector de Calendario Multidía:** Matriz mensual donde el docente hace clic sobre días sueltos o consecutivos, asigna el tipo de menú por jornada y confirma toda su planificación con retroalimentación inmediata y descuento de su saldo. | `/reservar` (*Reserva de Menú*) |
| **Meta 3 (H3: Retención):** |Al reservar un menú podremos ver los detalles de la comida del dia sin tener que acceder necesariamente a la minuta del dia.| `/reservar` (*Reserva de Menú*) |
| **Meta 4 (H4: Mejora de Planificación):** Cambiar el tipo de plato o indicaciones de salud sin anulación destructiva | **Gestor de Mis Reservas con Modal de Edición:** Permite a los usuarios conmutar régimen (ej. tradicional a hipocalórico/vegetariano) e ingresar notas de alergias en sus reservas vigentes sin cancelar la orden ni arriesgar el cupo de comida. | `/mis-reservas` (*Mis Reservas*) |

Adicionalmente, se incluye la vista **Mis Consumos** (`/mis-consumos`) para auditoría de tickets validados y estadísticas de balance de colaciones institucionales.

---

## 🎨 Sistema de Diseño y Lineamientos (DESIGN.md)

* **Paleta Institucional USM:**
  * Azul Primario USM: `#005e90`
  * Azul Secundario: `#0c5788`
  * Acento Amarillo USM: `#fab000`
  * Regímenes alimenticios codificados: Tradicional (`#005e90`), Vegetariano (`#2e7d32`), Hipocalórico (`#e65100`).
* **Tipografía:** Open Sans institucional.
* **Componentes Clickables:** 100% interactivos con affordances visuales, retroalimentación toast inmediata y validaciones según el límite normativo de corte (16:00 hrs del día hábil anterior).

---

## 🚀 Instalación y Ejecución Local

### Requisitos
- Node.js >= 16.x
- npm >= 8.x

### Pasos

1. Clonar el repositorio:
```bash
git clone https://github.com/SmokePythonCL/CasinoUSM.git
cd CasinoUSM
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador:
```
http://localhost:5050
```

5. Para compilar la versión de producción optimizada:
```bash
npm run prod
```
