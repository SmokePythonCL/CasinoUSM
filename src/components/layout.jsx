import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CasinoProvider, useCasino } from '../context/CasinoContext';

import NavBar from './nav_bar';
import GlobalToast from './GlobalToast';
import MinutaPage from '../pages/minuta_page';
import ReservarPage from '../pages/reservar_page';
import ReservasPage from '../pages/reservas_page';
import ConsumosPage from '../pages/consumos_page';

const Layout = () => {
  return (
    <CasinoProvider>
      <BrowserRouter>
        <div className="usm-app-layout">
          <NavBar />
          <main className="usm-main-content">
            <Routes>
              <Route path="/" element={<MinutaPage />} />
              <Route path="/reservar" element={<ReservarPage />} />
              <Route path="/mis-reservas" element={<ReservasPage />} />
              <Route path="/mis-consumos" element={<ConsumosPage />} />
            </Routes>
          </main>
          <footer className="usm-footer">
            <div className="usm-footer__container">
              <span>Sitio web administrado por <strong>Dirección General de Sistemas de Gestión</strong> • Universidad Técnica Federico Santa María</span>
            </div>
          </footer>
          <GlobalToast />
        </div>
      </BrowserRouter>
    </CasinoProvider>
  );
};

export default Layout;
