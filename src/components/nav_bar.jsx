import React, { useState } from 'react';
import { useCasino } from '../context/CasinoContext';
import { NavLink } from 'react-router-dom';
import logoUsm from '../assets/logo-usm.svg';
import MaterialIcon from './MaterialIcon';

const NavBar = () => {
  const { user, selectedCampus, setSelectedCampus, campuses } = useCasino();
  const [showCampusModal, setShowCampusModal] = useState(false);

  return (
    <header className="usm-global-header">
      {/* 1. Barra azul oscura USM */}
      <div className="usm-topbar">
        <div className="usm-topbar__container">
          <div className="usm-topbar__left">
            <span className="usm-topbar__domain">USM.cl</span>
          </div>

          <div className="usm-topbar__right">
            <div className="usm-topbar__user" title={user.role}>
              <MaterialIcon name="person" className="icon-sm" />
              <span className="user-name">{user.name}</span>
            </div>

            <button
              type="button"
              className="usm-topbar__logout"
              onClick={() => alert(`Sesión activa de ${user.name} (RUT: ${user.rut})`)}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* 2. Banner con logo oficial USM y selector de sede */}
      <div className="usm-brand-banner">
        <div className="usm-brand-banner__container">
          <div className="usm-brand-banner__logo-wrap">
            <img 
              src={logoUsm} 
              alt="Universidad Técnica Federico Santa María" 
              className="usm-brand-banner__logo" 
            />
          </div>

          <div className="usm-brand-banner__meta">
            <button
              type="button"
              className="campus-pill-btn"
              onClick={() => setShowCampusModal(true)}
              title="Cambiar sede de atención"
            >
              <MaterialIcon name="location_on" className="campus-pin" />
              <span className="campus-text">{selectedCampus}</span>
              <span className="campus-edit">Cambiar</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Pestañas horizontales estilo USM */}
      <div className="usm-tabs-nav-bar">
        <div className="usm-tabs-nav-bar__container">
          <nav className="usm-nav-tabs">
            <NavLink
              to="/reservar"
              className={({ isActive }) => `usm-tab-link ${isActive ? 'usm-tab-link--active' : ''}`}
            >
              <MaterialIcon name="calendar_today" className="tab-icon" />
              <span>Reserva de menú</span>
            </NavLink>

            <NavLink
              to="/mis-reservas"
              className={({ isActive }) => `usm-tab-link ${isActive ? 'usm-tab-link--active' : ''}`}
            >
              <MaterialIcon name="receipt_long" className="tab-icon" />
              <span>Mis reservas</span>
            </NavLink>

            <NavLink
              to="/mis-consumos"
              className={({ isActive }) => `usm-tab-link ${isActive ? 'usm-tab-link--active' : ''}`}
            >
              <MaterialIcon name="bar_chart" className="tab-icon" />
              <span>Mis consumos</span>
            </NavLink>

            <NavLink
              to="/"
              className={({ isActive }) => `usm-tab-link ${isActive ? 'usm-tab-link--active' : ''}`}
              end
            >
              <MaterialIcon name="restaurant_menu" className="tab-icon" />
              <span>Minuta diaria</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Modal selector rápido de campus */}
      {showCampusModal && (
        <div 
          className="usm-modal-backdrop" 
          onClick={() => setShowCampusModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="usm-modal" onClick={e => e.stopPropagation()}>
            <div className="usm-modal__header">
              <h3>Seleccionar Sede o Campus de Atención</h3>
              <button 
                type="button"
                className="usm-modal__close" 
                onClick={() => setShowCampusModal(false)}
                aria-label="Cerrar modal"
              >
                ×
              </button>
            </div>
            <div className="usm-modal__body">
              <p className="text-secondary">Seleccione el campus donde retira sus colaciones institucionales:</p>
              <div className="campus-options-list">
                {campuses.map(campus => (
                  <button
                    key={campus}
                    type="button"
                    className={`campus-choice-btn ${selectedCampus === campus ? 'campus-choice-btn--active' : ''}`}
                    onClick={() => {
                      setSelectedCampus(campus);
                      setShowCampusModal(false);
                    }}
                  >
                    <div className="choice-left">
                      <MaterialIcon name="apartment" className="campus-choice-icon" />
                      <span>{campus}</span>
                    </div>
                    {selectedCampus === campus && (
                      <span className="check-mark">
                        <MaterialIcon name="check" className="check-icon" />
                        Activo
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
