import React from 'react';
import { useCasino } from '../context/CasinoContext';
import MaterialIcon from '../components/MaterialIcon';

const ConsumosPage = () => {
  const { consumptions, user } = useCasino();

  return (
    <div className="usm-page-container">
      <div className="usm-page-header">
        <div>
          <h1 className="usm-title">Registro Histórico de Consumos</h1>
          <p className="usm-subtitle">
            Consulte las colaciones consumidas y validadas en los casinos institucionales de la USM.
          </p>
        </div>
      </div>

      {/* Tarjetas de estadísticas de consumo */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Saldo de Colaciones Disponibles</span>
            <MaterialIcon name="account_balance_wallet" className="stat-icon-primary" />
          </div>
          <span className="stat-number stat-number--primary">{user.balanceColaciones}</span>
          <span className="stat-desc">Válidas para el período mensual en curso</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Colaciones Consumidas (Octubre)</span>
            <MaterialIcon name="done_all" className="stat-icon-secondary" />
          </div>
          <span className="stat-number">{consumptions.length}</span>
          <span className="stat-desc">Validadas en tótems y mesones</span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Régimen Más Frecuente</span>
            <MaterialIcon name="favorite" className="stat-icon-accent" />
          </div>
          <span className="stat-number stat-number--accent">Tradicional</span>
          <span className="stat-desc">65% de sus preferencias registradas</span>
        </div>
      </div>

      {/* Historial de Consumos */}
      <div className="usm-card">
        <div className="usm-card__header flex-between">
          <h2 className="usm-heading">Detalle de Colaciones Validadas</h2>
          <div className="month-filter-badge">
            <MaterialIcon name="calendar_month" className="cell-icon-xs" />
            <span>Período: <strong>Octubre 2026</strong></span>
          </div>
        </div>

        <div className="usm-card__body no-padding">
          <div className="table-responsive">
            <table className="usm-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Fecha de Validación</th>
                  <th>Hora</th>
                  <th>Menú Consumido</th>
                  <th>Tipo</th>
                  <th>Casino / Sede</th>
                  <th>Punto de Control</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {consumptions.map(c => (
                  <tr key={c.id}>
                    <td className="font-mono text-sm">
                      <strong>{c.id}</strong>
                    </td>
                    <td>{c.date}</td>
                    <td>{c.time}</td>
                    <td>
                      <span className="font-medium text-dark">{c.menuName}</span>
                    </td>
                    <td>
                      <span className={`badge-diet badge-diet--${c.menuType}`}>
                        {c.menuType.charAt(0).toUpperCase() + c.menuType.slice(1)}
                      </span>
                    </td>
                    <td>{c.campus}</td>
                    <td>
                      <span className="text-secondary text-sm">
                        <MaterialIcon name="point_of_sale" className="cell-icon-xs" />
                        {c.validator}
                      </span>
                    </td>
                    <td>
                      <span className="status-badge status-badge--confirmed">
                        <MaterialIcon name="check" className="badge-icon-xs" />
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumosPage;
