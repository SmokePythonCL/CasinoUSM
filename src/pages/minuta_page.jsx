import React, { useState } from 'react';
import { MENU_WEEKS, WEEKLY_MENUS, DIET_TYPES } from '../data/mockData';
import { Link } from 'react-router-dom';
import MaterialIcon from '../components/MaterialIcon';

const MinutaPage = () => {
  const [selectedWeek, setSelectedWeek] = useState('semana-3');
  const [activeDayIdx, setActiveDayIdx] = useState(3);
  const [selectedDiet, setSelectedDiet] = useState(DIET_TYPES.TODOS);
  const [viewMode, setViewMode] = useState('dia');
  const [searchQuery, setSearchQuery] = useState('');

  const currentWeekInfo = MENU_WEEKS[selectedWeek];
  const daysMenu = WEEKLY_MENUS[selectedWeek] || [];
  const currentDayItem = daysMenu[activeDayIdx] || daysMenu[0];

  const dietsToDisplay = selectedDiet === DIET_TYPES.TODOS 
    ? [DIET_TYPES.TRADICIONAL, DIET_TYPES.VEGETARIANO, DIET_TYPES.HIPOCALORICO]
    : [selectedDiet];

  const getDietLabel = (diet) => {
    switch(diet) {
      case 'vegetariano': return 'Vegetariano';
      case 'hipocalorico': return 'Hipocalórico';
      default: return 'Tradicional';
    }
  };

  const getDietIconName = (diet) => {
    switch(diet) {
      case 'vegetariano': return 'eco';
      case 'hipocalorico': return 'fitness_center';
      default: return 'restaurant';
    }
  };

  return (
    <div className="usm-page-container">
      {/* Encabezado limpio y moderno */}
      <div className="usm-page-header">
        <div>
          <h1 className="usm-title">Visor de Minuta Mensual</h1>
          <p className="usm-subtitle">
            Consulte la programación nutricional completa de la USM de forma clara, legible e integrada.
          </p>
        </div>
        <div className="usm-page-header__actions">
          <Link to="/reservar" className="usm-btn usm-btn--primary">
            <MaterialIcon name="event_available" />
            <span>Ir a Reservar Menú</span>
          </Link>
        </div>
      </div>

      {/* Barra de Controles: Selector de semanas, Filtros de Régimen y Modo de Vista */}
      <div className="minuta-controls-bar">
        {/* Selector de semanas */}
        <div className="week-selector-group">
          <label className="control-label" id="label-semana">Semana de Consulta:</label>
          <div className="week-buttons" role="group" aria-labelledby="label-semana">
            {Object.entries(MENU_WEEKS).map(([weekKey, weekData]) => (
              <button
                key={weekKey}
                type="button"
                className={`week-btn ${selectedWeek === weekKey ? 'week-btn--active' : ''}`}
                onClick={() => setSelectedWeek(weekKey)}
              >
                <MaterialIcon name="date_range" className="btn-icon" />
                <span>{weekData.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fila de filtros por régimen alimenticio y modo de vista */}
        <div className="minuta-filters-row">
          <div className="diet-filter-group">
            <label className="control-label" id="label-regimen">Filtrar por Régimen:</label>
            <div className="diet-chips" role="group" aria-labelledby="label-regimen">
              <button
                type="button"
                className={`diet-chip ${selectedDiet === DIET_TYPES.TODOS ? 'diet-chip--active' : ''}`}
                onClick={() => setSelectedDiet(DIET_TYPES.TODOS)}
              >
                <MaterialIcon name="apps" className="chip-icon" />
                <span>Todos los regímenes</span>
              </button>
              <button
                type="button"
                className={`diet-chip diet-chip--trad ${selectedDiet === DIET_TYPES.TRADICIONAL ? 'diet-chip--active' : ''}`}
                onClick={() => setSelectedDiet(DIET_TYPES.TRADICIONAL)}
              >
                <MaterialIcon name="restaurant" className="chip-icon" />
                <span>Tradicional</span>
              </button>
              <button
                type="button"
                className={`diet-chip diet-chip--veg ${selectedDiet === DIET_TYPES.VEGETARIANO ? 'diet-chip--active' : ''}`}
                onClick={() => setSelectedDiet(DIET_TYPES.VEGETARIANO)}
              >
                <MaterialIcon name="eco" className="chip-icon" />
                <span>Vegetariano</span>
              </button>
              <button
                type="button"
                className={`diet-chip diet-chip--hipo ${selectedDiet === DIET_TYPES.HIPOCALORICO ? 'diet-chip--active' : ''}`}
                onClick={() => setSelectedDiet(DIET_TYPES.HIPOCALORICO)}
              >
                <MaterialIcon name="fitness_center" className="chip-icon" />
                <span>Hipocalórico</span>
              </button>
            </div>
          </div>

          {/* Selector de modo de vista */}
          <div className="view-toggle-group">
            <label className="control-label">Modo de Vista:</label>
            <div className="view-toggle-buttons">
              <button
                type="button"
                className={`view-btn ${viewMode === 'dia' ? 'view-btn--active' : ''}`}
                onClick={() => setViewMode('dia')}
                title="Vista detallada y espaciosa por día"
              >
                <MaterialIcon name="view_day" className="view-icon" />
                <span>Por Día</span>
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === 'semana' ? 'view-btn--active' : ''}`}
                onClick={() => setViewMode('semana')}
                title="Vista panorámica de toda la semana"
              >
                <MaterialIcon name="view_week" className="view-icon" />
                <span>Semanal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Búsqueda rápida de ingredientes */}
        <div className="search-filter-group">
          <div className="search-input-wrapper">
            <MaterialIcon name="search" className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar plato o ingrediente (ej. lentejas, cazuela, reineta, pollo, quinua)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Buscar plato o ingrediente"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
              >
                <MaterialIcon name="close" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Banner de corte */}
      <div className="usm-alert usm-alert--info">
        <MaterialIcon name="info" className="alert-icon" />
        <div>
          <strong>Horario de corte para reservas:</strong> Hasta las 16:00 horas del día hábil anterior. La minuta incluye pan fresco y barra de aderezos en casino.
        </div>
      </div>

      {/* MODO 1: VISTA POR DÍA (ESPACIOSA, DETALLADA Y CÓMODA) */}
      {viewMode === 'dia' && (
        <div className="minuta-day-view-container">
          {/* Pestañas de días (Lunes a Viernes) */}
          <div className="day-tabs-bar" role="tablist" aria-label="Días de la semana">
            {daysMenu.map((dayItem, idx) => (
              <button
                key={dayItem.day}
                type="button"
                role="tab"
                aria-selected={activeDayIdx === idx}
                className={`day-tab-btn ${activeDayIdx === idx ? 'day-tab-btn--active' : ''}`}
                onClick={() => setActiveDayIdx(idx)}
              >
                <span className="day-tab-name">{dayItem.day}</span>
                <span className="day-tab-date">{dayItem.dateStr}</span>
              </button>
            ))}
          </div>

          {/* Tarjeta del Día Activo */}
          {currentDayItem && (
            <div className="current-day-panel">
              <div className="current-day-header">
                <div>
                  <h2 className="current-day-title">{currentDayItem.day}, {currentDayItem.dateStr}</h2>
                  <span className="current-day-desc">Seleccione o revise los platos disponibles para esta jornada</span>
                </div>
                <Link
                  to={`/reservar?date=${currentDayItem.dateKey}`}
                  className="usm-btn usm-btn--primary"
                >
                  <MaterialIcon name="calendar_today" />
                  <span>Reservar este día</span>
                </Link>
              </div>

              {/* Grid espacioso de regímenes alimenticios */}
              <div className="day-diets-grid">
                {dietsToDisplay.map(dietKey => {
                  const plato = currentDayItem.platos[dietKey];
                  if (!plato) return null;

                  if (searchQuery) {
                    const q = searchQuery.toLowerCase();
                    const match = plato.fondo.toLowerCase().includes(q) ||
                                  plato.sopa.toLowerCase().includes(q) ||
                                  plato.ensalada.toLowerCase().includes(q) ||
                                  plato.postre.toLowerCase().includes(q);
                    if (!match) return null;
                  }

                  return (
                    <div key={dietKey} className={`diet-card-detailed diet-card-detailed--${dietKey}`}>
                      <div className="diet-card-detailed__header">
                        <div className="diet-badge-title">
                          <MaterialIcon name={getDietIconName(dietKey)} className="diet-icon-md" />
                          <span className="diet-type-name">{getDietLabel(dietKey)}</span>
                        </div>
                        <span className="diet-calories-pill">
                          <MaterialIcon name="bolt" className="energy-icon" />
                          {plato.calorias}
                        </span>
                      </div>

                      <div className="diet-card-detailed__body">
                        {/* Plato de fondo destacado */}
                        <div className="main-dish-box">
                          <span className="main-dish-label">Plato de Fondo:</span>
                          <h3 className="main-dish-text">{plato.fondo}</h3>
                        </div>

                        {/* Componentes secundarios claros y separados */}
                        <div className="side-components-box">
                          <div className="side-comp-row">
                            <MaterialIcon name="soup_kitchen" className="side-comp-icon" />
                            <div className="side-comp-content">
                              <span className="side-comp-title">Entrada / Sopa:</span>
                              <span className="side-comp-val">{plato.sopa}</span>
                            </div>
                          </div>

                          <div className="side-comp-row">
                            <MaterialIcon name="nutrition" className="side-comp-icon" />
                            <div className="side-comp-content">
                              <span className="side-comp-title">Acompañamiento / Ensalada:</span>
                              <span className="side-comp-val">{plato.ensalada}</span>
                            </div>
                          </div>

                          <div className="side-comp-row">
                            <MaterialIcon name="bakery_dining" className="side-comp-icon" />
                            <div className="side-comp-content">
                              <span className="side-comp-title">Postre:</span>
                              <span className="side-comp-val">{plato.postre}</span>
                            </div>
                          </div>
                        </div>

                        {/* Información de alérgenos legible */}
                        <div className="allergens-box">
                          {plato.alergenos && plato.alergenos.length > 0 ? (
                            <div className="allergens-present">
                              <span className="allergens-label">
                                <MaterialIcon name="warning" className="warning-icon-sm" />
                                Alérgenos declarados:
                              </span>
                              <div className="allergens-pill-list">
                                {plato.alergenos.map(a => (
                                  <span key={a} className="allergen-pill">{a}</span>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="allergens-free">
                              <MaterialIcon name="check_circle" className="safe-icon-sm" />
                              <span>Libre de alérgenos principales reglamentados</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="diet-card-detailed__footer">
                        <Link
                          to={`/reservar?date=${currentDayItem.dateKey}&diet=${dietKey}`}
                          className="usm-btn usm-btn--sm usm-btn--outline usm-btn--full"
                        >
                          <span>Elegir menú {getDietLabel(dietKey)}</span>
                          <MaterialIcon name="arrow_forward" className="btn-arrow" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODO 2: VISTA SEMANAL PANORÁMICA */}
      {viewMode === 'semana' && (
        <div className="minuta-week-table-container">
          <div className="minuta-panoramic-grid">
            {daysMenu.map(dayItem => (
              <div key={dayItem.day} className="panoramic-day-card">
                <div className="panoramic-day-header">
                  <span className="p-day-name">{dayItem.day}</span>
                  <span className="p-day-date">{dayItem.dateStr}</span>
                </div>

                <div className="panoramic-day-body">
                  {dietsToDisplay.map(dietKey => {
                    const plato = dayItem.platos[dietKey];
                    if (!plato) return null;

                    return (
                      <div key={dietKey} className={`p-dish-item p-dish-item--${dietKey}`}>
                        <div className="p-dish-top">
                          <span className={`badge-diet badge-diet--${dietKey}`}>
                            <MaterialIcon name={getDietIconName(dietKey)} className="diet-mini-icon" />
                            {getDietLabel(dietKey)}
                          </span>
                          <span className="p-cal">{plato.calorias}</span>
                        </div>
                        <h4 className="p-dish-name">{plato.fondo}</h4>
                        <div className="p-dish-desc">
                          <span><strong>Entrada:</strong> {plato.sopa}</span>
                          <span><strong>Acomp:</strong> {plato.ensalada}</span>
                          <span><strong>Postre:</strong> {plato.postre}</span>
                        </div>
                        {plato.alergenos && plato.alergenos.length > 0 && (
                          <div className="p-dish-alergenos">
                            Contiene: {plato.alergenos.join(', ')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="panoramic-day-footer">
                  <Link 
                    to={`/reservar?date=${dayItem.dateKey}`}
                    className="usm-btn usm-btn--sm usm-btn--outline usm-btn--full"
                  >
                    <span>Reservar este día</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinutaPage;
