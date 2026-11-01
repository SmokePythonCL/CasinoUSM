// Contexto global de Casino USM
import React, { createContext, useContext, useState } from 'react';
import { 
  INITIAL_USER, 
  INITIAL_RESERVATIONS, 
  INITIAL_CONSUMPTIONS, 
  CAMPUSES, 
  WEEKLY_MENUS 
} from '../data/mockData';

const CasinoContext = createContext();

export const CasinoProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [selectedCampus, setSelectedCampus] = useState(INITIAL_USER.campusDefault);
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [consumptions, setConsumptions] = useState(INITIAL_CONSUMPTIONS);
  
  // Feedback / Notificaciones toast
  const [toastMessage, setToastMessage] = useState(null);

  const showNotification = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const closeNotification = () => {
    setToastMessage(null);
  };

  // Crear reservas múltiples (Meta 2)
  const createReservations = (selectedDaysMap) => {
    // selectedDaysMap: { "2026-11-18": { menuType: "vegetariano", notes: "...", campus: "..." } }
    const newEntries = Object.entries(selectedDaysMap).map(([dateKey, details], index) => {
      const parts = dateKey.split("-");
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const formatted = `${dayNames[d.getDay()]} ${parts[2]} ${months[d.getMonth()]}, ${parts[0]}`;

      // Nombre del plato según menú
      let menuName = "Colación Institucional";
      // Buscar en WEEKLY_MENUS
      for (const sem of Object.values(WEEKLY_MENUS)) {
        const foundDay = sem.find(s => s.dateKey === dateKey);
        if (foundDay && foundDay.platos[details.menuType]) {
          menuName = foundDay.platos[details.menuType].fondo;
          break;
        }
      }

      return {
        id: `RES-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: dateKey,
        dateFormatted: formatted,
        menuType: details.menuType,
        menuName: menuName,
        campus: details.campus || selectedCampus,
        status: "Confirmada",
        notes: details.notes || "",
        canEdit: true
      };
    });

    setReservations(prev => [...newEntries, ...prev]);
    setUser(prev => ({
      ...prev,
      balanceColaciones: Math.max(0, prev.balanceColaciones - newEntries.length)
    }));
    showNotification(`¡Éxito! Se han confirmado ${newEntries.length} reservas para su planificación.`, 'success');
  };

  // Modificar reserva existente (Meta 3)
  const updateReservation = (id, updatedFields) => {
    setReservations(prev => prev.map(res => {
      if (res.id === id) {
        let menuName = res.menuName;
        // Si cambió el tipo de menú, actualizar el nombre del plato
        if (updatedFields.menuType && updatedFields.menuType !== res.menuType) {
          for (const sem of Object.values(WEEKLY_MENUS)) {
            const foundDay = sem.find(s => s.dateKey === res.date);
            if (foundDay && foundDay.platos[updatedFields.menuType]) {
              menuName = foundDay.platos[updatedFields.menuType].fondo;
              break;
            }
          }
        }
        return {
          ...res,
          ...updatedFields,
          menuName: menuName
        };
      }
      return res;
    }));
    showNotification(`Reserva #${id} modificada exitosamente sin anulación destructiva.`, 'success');
  };

  // Cancelar reserva (si el usuario lo requiere conscientemente)
  const cancelReservation = (id) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: "Cancelada", canEdit: false } : r));
    setUser(prev => ({
      ...prev,
      balanceColaciones: prev.balanceColaciones + 1
    }));
    showNotification(`Reserva #${id} cancelada. Su saldo de colaciones ha sido restituido.`, 'info');
  };

  return (
    <CasinoContext.Provider value={{
      user,
      campuses: CAMPUSES,
      selectedCampus,
      setSelectedCampus,
      reservations,
      consumptions,
      createReservations,
      updateReservation,
      cancelReservation,
      toastMessage,
      showNotification,
      closeNotification
    }}>
      {children}
    </CasinoContext.Provider>
  );
};

export const useCasino = () => {
  const context = useContext(CasinoContext);
  if (!context) {
    throw new Error("useCasino must be used within a CasinoProvider");
  }
  return context;
};
