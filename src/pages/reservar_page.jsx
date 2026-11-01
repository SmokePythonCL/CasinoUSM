import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCasino } from '../context/CasinoContext';
import { DIET_TYPES, WEEKLY_MENUS } from '../data/mockData';
import MaterialIcon from '../components/MaterialIcon';

const NOVEMBER_DAYS = [
  { dayNumber: 1, isWeekend: true, dateKey: "2026-11-01", dayOfWeek: "Dom" },
  { dayNumber: 2, isWeekend: false, dateKey: "2026-11-02", dayOfWeek: "Lun" },
  { dayNumber: 3, isWeekend: false, dateKey: "2026-11-03", dayOfWeek: "Mar" },
  { dayNumber: 4, isWeekend: false, dateKey: "2026-11-04", dayOfWeek: "Mié" },
  { dayNumber: 5, isWeekend: false, dateKey: "2026-11-05", dayOfWeek: "Jue" },
  { dayNumber: 6, isWeekend: false, dateKey: "2026-11-06", dayOfWeek: "Vie" },
  { dayNumber: 7, isWeekend: true, dateKey: "2026-11-07", dayOfWeek: "Sáb" },
  { dayNumber: 8, isWeekend: true, dateKey: "2026-11-08", dayOfWeek: "Dom" },
  { dayNumber: 9, isWeekend: false, dateKey: "2026-11-09", dayOfWeek: "Lun" },
  { dayNumber: 10, isWeekend: false, dateKey: "2026-11-10", dayOfWeek: "Mar" },
  { dayNumber: 11, isWeekend: false, dateKey: "2026-11-11", dayOfWeek: "Mié" },
  { dayNumber: 12, isWeekend: false, dateKey: "2026-11-12", dayOfWeek: "Jue" },
  { dayNumber: 13, isWeekend: false, dateKey: "2026-11-13", dayOfWeek: "Vie" },
  { dayNumber: 14, isWeekend: true, dateKey: "2026-11-14", dayOfWeek: "Sáb" },
  { dayNumber: 15, isWeekend: true, dateKey: "2026-11-15", dayOfWeek: "Dom" },
  { dayNumber: 16, isWeekend: false, dateKey: "2026-11-16", dayOfWeek: "Lun" },
  { dayNumber: 17, isWeekend: false, dateKey: "2026-11-17", dayOfWeek: "Mar" },
  { dayNumber: 18, isWeekend: false, dateKey: "2026-11-18", dayOfWeek: "Mié" },
  { dayNumber: 19, isWeekend: false, dateKey: "2026-11-19", dayOfWeek: "Jue" },
  { dayNumber: 20, isWeekend: false, dateKey: "2026-11-20", dayOfWeek: "Vie" },
  { dayNumber: 21, isWeekend: true, dateKey: "2026-11-21", dayOfWeek: "Sáb" },
  { dayNumber: 22, isWeekend: true, dateKey: "2026-11-22", dayOfWeek: "Dom" },
  { dayNumber: 23, isWeekend: false, dateKey: "2026-11-23", dayOfWeek: "Lun" },
  { dayNumber: 24, isWeekend: false, dateKey: "2026-11-24", dayOfWeek: "Mar" },
  { dayNumber: 25, isWeekend: false, dateKey: "2026-11-25", dayOfWeek: "Mié" },
  { dayNumber: 26, isWeekend: false, dateKey: "2026-11-26", dayOfWeek: "Jue" },
  { dayNumber: 27, isWeekend: false, dateKey: "2026-11-27", dayOfWeek: "Vie" },
  { dayNumber: 28, isWeekend: true, dateKey: "2026-11-28", dayOfWeek: "Sáb" },
  { dayNumber: 29, isWeekend: true, dateKey: "2026-11-29", dayOfWeek: "Dom" },
  { dayNumber: 30, isWeekend: false, dateKey: "2026-11-30", dayOfWeek: "Lun" }
];

const ReservarPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedCampus, setSelectedCampus, campuses, reservations, createReservations, user } = useCasino();

  const [selectedDays, setSelectedDays] = useState({});
  const [defaultDietChoice, setDefaultDietChoice] = useState("tradicional");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reservedDates = reservations
    .filter(r => r.status === "Confirmada")
    .map(r => r.date);

  useEffect(() => {
    const urlDate = searchParams.get('date');
    const urlDiet = searchParams.get('diet');
    if (urlDate) {
      setSelectedDays(prev => ({
        ...prev,
        [urlDate]: {
          menuType: urlDiet || defaultDietChoice,
          notes: ''
        }
      }));
    }
  }, [searchParams]);

  const toggleDaySelection = (dayObj) => {
    if (dayObj.isWeekend) return;
    if (reservedDates.includes(dayObj.dateKey)) return;

    const dateKey = dayObj.dateKey;
    setSelectedDays(prev => {
      const copy = { ...prev };
      if (copy[dateKey]) {
        delete copy[dateKey];
      } else {
        copy[dateKey] = {
          menuType: defaultDietChoice,
          notes: ''
        };
      }
      return copy;
    });
  };

  const updateDayDiet = (dateKey, menuType) => {
    setSelectedDays(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        menuType
      }
    }));
  };

  const updateDayNotes = (dateKey, notes) => {
    setSelectedDays(prev => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        notes
      }
    }));
  };

  const applyDietToAll = (diet) => {
    setDefaultDietChoice(diet);
    setSelectedDays(prev => {
      const updated = {};
      Object.keys(prev).forEach(key => {
        updated[key] = {
          ...prev[key],
          menuType: diet
        };
      });
      return updated;
    });
  };

  const selectQuickSample = () => {
    setSelectedDays({
      "2026-11-10": { menuType: "tradicional", notes: "" },
      "2026-11-17": { menuType: "vegetariano", notes: "" },
      "2026-11-19": { menuType: "hipocalorico", notes: "Alergia a mariscos" }
    });
  };

  const clearSelection = () => {
    setSelectedDays({});
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    const count = Object.keys(selectedDays).length;
    if (count === 0) return;

    if (count > user.balanceColaciones) {
      alert(`No dispone de saldo suficiente. Posee ${user.balanceColaciones} colaciones disponibles.`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      createReservations(selectedDays);
      setIsSubmitting(false);
      navigate('/mis-reservas');
    }, 600);
  };

  const selectedCount = Object.keys(selectedDays).length;

  return (
    <div className="usm-page-container">
      <div className="usm-page-header">
        <div>
          <h1 className="usm-title">Reserva de Menú Semanal y Mensual</h1>
          <p className="usm-subtitle">
            Planifique sus almuerzos en bloque para días continuos o salteados en una sola confirmación.
          </p>
        </div>
        <div className="quick-actions-bar">
          <button 
            type="button" 
            className="usm-btn usm-btn--sm usm-btn--secondary"
            onClick={selectQuickSample}
            title="Seleccionar automáticamente días discontinuos de ejemplo"
          >
            <MaterialIcon name="auto_mode" />
            <span>Cargar ejemplo (Días discontinuos)</span>
          </button>
          {selectedCount > 0 && (
            <button 
              type="button" 
              className="usm-btn usm-btn--sm usm-btn--outline"
              onClick={clearSelection}
            >
              <MaterialIcon name="delete_sweep" />
              <span>Limpiar selección</span>
            </button>
          )}
        </div>
      </div>

      <div className="usm-reservation-layout">
        {/* Columna izquierda: Calendario interactivo (60%) */}
        <div className="usm-calendar-col">
          <div className="usm-card">
            <div className="usm-card__header flex-between">
              <div>
                <h2 className="usm-heading">Noviembre 2026</h2>
                <span className="text-secondary text-sm">Haga clic sobre los días en que almorzará en el casino</span>
              </div>
              <div className="calendar-legend">
                <span className="legend-item"><span className="legend-dot legend-dot--selected"></span> Seleccionado</span>
                <span className="legend-item"><span className="legend-dot legend-dot--reserved"></span> Reservado</span>
                <span className="legend-item"><span className="legend-dot legend-dot--disabled"></span> Inhábil</span>
              </div>
            </div>

            <div className="usm-card__body">
              <div className="calendar-grid-header">
                <span>Dom</span>
                <span>Lun</span>
                <span>Mar</span>
                <span>Mié</span>
                <span>Jue</span>
                <span>Vie</span>
                <span>Sáb</span>
              </div>

              <div className="calendar-grid">
                {NOVEMBER_DAYS.map((day) => {
                  const isSelected = !!selectedDays[day.dateKey];
                  const isAlreadyReserved = reservedDates.includes(day.dateKey);
                  const isDisabled = day.isWeekend || isAlreadyReserved;

                  let cellClass = "calendar-cell";
                  if (day.isWeekend) cellClass += " calendar-cell--weekend";
                  if (isAlreadyReserved) cellClass += " calendar-cell--reserved";
                  if (isSelected) cellClass += " calendar-cell--selected";

                  return (
                    <button
                      key={day.dateKey}
                      type="button"
                      disabled={isDisabled}
                      className={cellClass}
                      onClick={() => toggleDaySelection(day)}
                      title={
                        isAlreadyReserved ? "Ya posee una reserva confirmada para este día" :
                        day.isWeekend ? "Fin de semana (casino cerrado)" :
                        isSelected ? "Haga clic para deseleccionar" : "Haga clic para agregar a su reserva"
                      }
                      aria-label={`${day.dayOfWeek} ${day.dayNumber} de Noviembre${isAlreadyReserved ? ' - Ya reservado' : isSelected ? ' - Seleccionado' : ''}`}
                    >
                      <span className="cell-day-num">{day.dayNumber}</span>
                      {isSelected && (
                        <span className="cell-badge">
                          <MaterialIcon name="check" className="badge-icon-xs" />
                          Listo
                        </span>
                      )}
                      {isAlreadyReserved && <span className="cell-badge cell-badge--reserved">Reservado</span>}
                    </button>
                  );
                })}
              </div>

              <div className="calendar-cutoff-notice">
                <MaterialIcon name="schedule" className="notice-icon" />
                <span>
                  <strong>Límite de confirmación:</strong> El casino requiere programar las raciones antes de las 16:00 horas del día hábil anterior.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha: Resumen interactivo en tiempo real (40%) */}
        <div className="usm-summary-col">
          <div className="usm-card usm-summary-card">
            <div className="usm-card__header">
              <h2 className="usm-heading">Resumen de Selección</h2>
              <span className="text-secondary text-sm">
                {selectedCount === 0 ? "No hay días seleccionados" : `${selectedCount} día(s) configurado(s)`}
              </span>
            </div>

            <div className="usm-card__body">
              {/* Sede / Campus de retiro */}
              <div className="form-group">
                <label className="form-label" htmlFor="campus-select">Sede o Casino de Retiro:</label>
                <div className="select-with-icon">
                  <MaterialIcon name="location_on" className="select-leading-icon" />
                  <select 
                    id="campus-select"
                    className="form-select form-select--with-icon"
                    value={selectedCampus}
                    onChange={e => setSelectedCampus(e.target.value)}
                  >
                    {campuses.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Asignación masiva */}
              {selectedCount > 1 && (
                <div className="bulk-diet-selector">
                  <span className="bulk-diet-label">Asignar régimen a todos:</span>
                  <div className="bulk-diet-buttons">
                    <button 
                      type="button" 
                      className={`bulk-btn ${defaultDietChoice === 'tradicional' ? 'bulk-btn--active' : ''}`}
                      onClick={() => applyDietToAll('tradicional')}
                    >
                      Tradicional
                    </button>
                    <button 
                      type="button" 
                      className={`bulk-btn ${defaultDietChoice === 'vegetariano' ? 'bulk-btn--active' : ''}`}
                      onClick={() => applyDietToAll('vegetariano')}
                    >
                      Vegetariano
                    </button>
                    <button 
                      type="button" 
                      className={`bulk-btn ${defaultDietChoice === 'hipocalorico' ? 'bulk-btn--active' : ''}`}
                      onClick={() => applyDietToAll('hipocalorico')}
                    >
                      Hipocalórico
                    </button>
                  </div>
                </div>
              )}

              {/* Lista detallada de días seleccionados */}
              {selectedCount === 0 ? (
                <div className="empty-selection-placeholder">
                  <MaterialIcon name="calendar_month" className="placeholder-icon-lg" />
                  <p>Haga clic sobre uno o más días en el calendario para agregarlos a su planificación.</p>
                </div>
              ) : (
                <div className="selected-days-list">
                  {Object.entries(selectedDays).map(([dateKey, config]) => {
                    const parts = dateKey.split('-');
                    const dateDisplay = `${parts[2]} de Noviembre, 2026`;

                    return (
                      <div key={dateKey} className="selected-day-row">
                        <div className="selected-day-header">
                          <span className="selected-day-date">
                            <MaterialIcon name="event" className="day-row-icon" />
                            {dateDisplay}
                          </span>
                          <button
                            type="button"
                            className="remove-day-btn"
                            onClick={() => toggleDaySelection({ dateKey })}
                            title="Quitar este día"
                            aria-label={`Quitar fecha ${dateDisplay}`}
                          >
                            <MaterialIcon name="close" />
                          </button>
                        </div>

                        <div className="selected-day-controls">
                          <div className="diet-choice-pills">
                            <label className={`diet-pill-option ${config.menuType === 'tradicional' ? 'diet-pill-option--trad' : ''}`}>
                              <input
                                type="radio"
                                name={`diet-${dateKey}`}
                                value="tradicional"
                                checked={config.menuType === 'tradicional'}
                                onChange={() => updateDayDiet(dateKey, 'tradicional')}
                              />
                              <span>Tradicional</span>
                            </label>

                            <label className={`diet-pill-option ${config.menuType === 'vegetariano' ? 'diet-pill-option--veg' : ''}`}>
                              <input
                                type="radio"
                                name={`diet-${dateKey}`}
                                value="vegetariano"
                                checked={config.menuType === 'vegetariano'}
                                onChange={() => updateDayDiet(dateKey, 'vegetariano')}
                              />
                              <span>Vegetariano</span>
                            </label>

                            <label className={`diet-pill-option ${config.menuType === 'hipocalorico' ? 'diet-pill-option--hipo' : ''}`}>
                              <input
                                type="radio"
                                name={`diet-${dateKey}`}
                                value="hipocalorico"
                                checked={config.menuType === 'hipocalorico'}
                                onChange={() => updateDayDiet(dateKey, 'hipocalorico')}
                              />
                              <span>Hipocalórico</span>
                            </label>
                          </div>

                          <div className="special-notes-input">
                            <input
                              type="text"
                              className="notes-input"
                              placeholder="Observaciones dietarias o alergias (opcional)..."
                              value={config.notes}
                              onChange={e => updateDayNotes(dateKey, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Resumen de saldo y confirmación */}
              <div className="summary-balance-box">
                <div className="balance-row">
                  <span>Colaciones solicitadas:</span>
                  <strong>{selectedCount}</strong>
                </div>
                <div className="balance-row">
                  <span>Saldo disponible:</span>
                  <span className={user.balanceColaciones < selectedCount ? 'text-danger' : 'text-success'}>
                    {user.balanceColaciones} colaciones
                  </span>
                </div>
                <div className="balance-row balance-row--total">
                  <span>Saldo restante:</span>
                  <strong>{Math.max(0, user.balanceColaciones - selectedCount)}</strong>
                </div>
              </div>

              <div className="summary-actions">
                <button
                  type="button"
                  className="usm-btn usm-btn--primary usm-btn--full"
                  disabled={selectedCount === 0 || isSubmitting || user.balanceColaciones < selectedCount}
                  onClick={handleConfirmReservation}
                >
                  <MaterialIcon name="check_circle" />
                  <span>{isSubmitting ? "Procesando transacción..." : `Confirmar Reserva (${selectedCount} colaciones)`}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservarPage;
