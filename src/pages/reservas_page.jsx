import React, { useState } from 'react';
import { useCasino } from '../context/CasinoContext';
import { DIET_TYPES } from '../data/mockData';
import { Link } from 'react-router-dom';
import MaterialIcon from '../components/MaterialIcon';

const ReservasPage = () => {
  const { reservations, updateReservation, cancelReservation, campuses } = useCasino();
  
  const [editingRes, setEditingRes] = useState(null);
  const [modalMenuType, setModalMenuType] = useState('tradicional');
  const [modalCampus, setModalCampus] = useState('');
  const [modalNotes, setModalNotes] = useState('');

  const handleOpenEditModal = (res) => {
    setEditingRes(res);
    setModalMenuType(res.menuType);
    setModalCampus(res.campus);
    setModalNotes(res.notes || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingRes) return;

    updateReservation(editingRes.id, {
      menuType: modalMenuType,
      campus: modalCampus,
      notes: modalNotes
    });

    setEditingRes(null);
  };

  const getDietBadgeClass = (diet) => {
    switch(diet) {
      case 'vegetariano': return 'badge-diet badge-diet--veg';
      case 'hipocalorico': return 'badge-diet badge-diet--hipo';
      default: return 'badge-diet badge-diet--trad';
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Confirmada') {
      return (
        <span className="status-badge status-badge--confirmed">
          <MaterialIcon name="check" className="badge-icon-xs" />
          Confirmada
        </span>
      );
    }
    return (
      <span className="status-badge status-badge--canceled">
        <MaterialIcon name="close" className="badge-icon-xs" />
        Cancelada
      </span>
    );
  };

  return (
    <div className="usm-page-container">
      <div className="usm-page-header">
        <div>
          <h1 className="usm-title">Mis Reservas Activas</h1>
          <p className="usm-subtitle">
            Gestione sus colaciones programadas. Modifique el tipo de plato o indicaciones de salud directamente sin perder su cupo.
          </p>
        </div>
        <div className="usm-page-header__actions">
          <Link to="/reservar" className="usm-btn usm-btn--primary">
            <MaterialIcon name="add" />
            <span>Nueva Reserva</span>
          </Link>
        </div>
      </div>

      <div className="usm-alert usm-alert--info">
        <MaterialIcon name="lightbulb" className="alert-icon" />
        <div>
          <strong>Flexibilidad ante imprevistos:</strong> ¿Cambió su horario de clases o prefiere otro menú? Presione el botón <strong>"Modificar"</strong> en cualquiera de sus reservas vigentes. Puede conmutar régimen e ingresar notas de alergias en línea hasta las 16:00 horas del día previo.
        </div>
      </div>

      <div className="usm-card">
        <div className="usm-card__header flex-between">
          <h2 className="usm-heading">Colaciones Programadas para Noviembre 2026</h2>
          <span className="text-secondary text-sm">{reservations.length} registro(s) en historial</span>
        </div>

        <div className="usm-card__body no-padding">
          <div className="table-responsive">
            <table className="usm-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Fecha de Consumo</th>
                  <th>Tipo de Menú</th>
                  <th>Plato Asignado</th>
                  <th>Sede / Casino</th>
                  <th>Estado</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(res => (
                  <tr key={res.id} className={res.status === 'Cancelada' ? 'row--disabled' : ''}>
                    <td className="font-mono text-sm">
                      <strong>{res.id}</strong>
                    </td>
                    <td>
                      <div className="res-date-cell">
                        <MaterialIcon name="calendar_today" className="cell-icon-sm" />
                        <span>{res.dateFormatted}</span>
                      </div>
                    </td>
                    <td>
                      <span className={getDietBadgeClass(res.menuType)}>
                        {res.menuType.charAt(0).toUpperCase() + res.menuType.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className="font-medium text-dark">{res.menuName}</span>
                    </td>
                    <td>
                      <span className="text-sm text-secondary">
                        <MaterialIcon name="location_on" className="cell-icon-xs" />
                        {res.campus}
                      </span>
                    </td>
                    <td>
                      {getStatusBadge(res.status)}
                    </td>
                    <td className="text-right">
                      {res.canEdit && res.status === 'Confirmada' ? (
                        <div className="table-action-btns">
                          <button
                            type="button"
                            className="usm-btn usm-btn--sm usm-btn--outline-primary edit-action-btn"
                            onClick={() => handleOpenEditModal(res)}
                            title="Cambiar tipo de menú o notas sin cancelar la reserva"
                          >
                            <MaterialIcon name="edit" className="btn-icon-sm" />
                            <span>Modificar</span>
                          </button>
                          <button
                            type="button"
                            className="usm-btn usm-btn--sm usm-btn--danger-ghost cancel-action-btn"
                            onClick={() => {
                              if (window.confirm(`¿Está seguro de anular la reserva ${res.id}? El cupo se liberará.`)) {
                                cancelReservation(res.id);
                              }
                            }}
                            title="Anular reserva"
                          >
                            <span>Anular</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted text-sm">No modificable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Interactivo de Modificación Directa */}
      {editingRes && (
        <div 
          className="usm-modal-backdrop" 
          onClick={() => setEditingRes(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-edit-title"
        >
          <div className="usm-modal usm-modal--md" onClick={e => e.stopPropagation()}>
            <div className="usm-modal__header">
              <div>
                <h3 id="modal-edit-title" className="modal-title">Modificar Reserva #{editingRes.id}</h3>
                <span className="modal-subtitle">Fecha: {editingRes.dateFormatted}</span>
              </div>
              <button 
                type="button" 
                className="usm-modal__close" 
                onClick={() => setEditingRes(null)}
                aria-label="Cerrar modal de modificación"
              >
                <MaterialIcon name="close" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="usm-modal__body">
                <div className="usm-alert usm-alert--warning text-sm">
                  <MaterialIcon name="info" className="alert-icon-sm" />
                  <span>La modificación se aplicará inmediatamente conservando su horario de atención y cupo en el casino.</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Seleccione el nuevo régimen alimenticio:</label>
                  <div className="modal-diet-grid">
                    <label className={`modal-diet-card ${modalMenuType === 'tradicional' ? 'modal-diet-card--trad-active' : ''}`}>
                      <input
                        type="radio"
                        name="modalMenu"
                        value="tradicional"
                        checked={modalMenuType === 'tradicional'}
                        onChange={() => setModalMenuType('tradicional')}
                      />
                      <div className="diet-card-content">
                        <div className="diet-card-title-row">
                          <MaterialIcon name="restaurant" className="diet-card-icon" />
                          <strong>Menú Tradicional</strong>
                        </div>
                        <p className="text-xs text-secondary">Plato completo con aporte calórico estándar institucional.</p>
                      </div>
                    </label>

                    <label className={`modal-diet-card ${modalMenuType === 'vegetariano' ? 'modal-diet-card--veg-active' : ''}`}>
                      <input
                        type="radio"
                        name="modalMenu"
                        value="vegetariano"
                        checked={modalMenuType === 'vegetariano'}
                        onChange={() => setModalMenuType('vegetariano')}
                      />
                      <div className="diet-card-content">
                        <div className="diet-card-title-row">
                          <MaterialIcon name="eco" className="diet-card-icon" />
                          <strong>Menú Vegetariano</strong>
                        </div>
                        <p className="text-xs text-secondary">Proteínas vegetales, legumbres y cereales integrales.</p>
                      </div>
                    </label>

                    <label className={`modal-diet-card ${modalMenuType === 'hipocalorico' ? 'modal-diet-card--hipo-active' : ''}`}>
                      <input
                        type="radio"
                        name="modalMenu"
                        value="hipocalorico"
                        checked={modalMenuType === 'hipocalorico'}
                        onChange={() => setModalMenuType('hipocalorico')}
                      />
                      <div className="diet-card-content">
                        <div className="diet-card-title-row">
                          <MaterialIcon name="fitness_center" className="diet-card-icon" />
                          <strong>Menú Hipocalórico</strong>
                        </div>
                        <p className="text-xs text-secondary">Reducido en grasas, sin azúcares y alto en verduras al vapor.</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="modal-campus">Sede o Casino de Retiro:</label>
                  <select
                    id="modal-campus"
                    className="form-select"
                    value={modalCampus}
                    onChange={e => setModalCampus(e.target.value)}
                  >
                    {campuses.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="modal-notes">
                    Observaciones dietarias, exclusión de ingredientes o alérgenos:
                  </label>
                  <textarea
                    id="modal-notes"
                    className="form-textarea"
                    rows="3"
                    placeholder="Ej. Alergia a mariscos, intolerancia a la lactosa, sin sal añadida..."
                    value={modalNotes}
                    onChange={e => setModalNotes(e.target.value)}
                  />
                  <span className="text-xs text-secondary">
                    Esta observación se comunicará directamente a las manipuladoras de alimentos del casino.
                  </span>
                </div>
              </div>

              <div className="usm-modal__footer">
                <button
                  type="button"
                  className="usm-btn usm-btn--outline"
                  onClick={() => setEditingRes(null)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="usm-btn usm-btn--primary"
                >
                  <MaterialIcon name="save" />
                  <span>Guardar Modificación</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservasPage;
