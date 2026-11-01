import React from 'react';
import { useCasino } from '../context/CasinoContext';
import MaterialIcon from './MaterialIcon';

const GlobalToast = () => {
  const { toastMessage, closeNotification } = useCasino();
  if (!toastMessage) return null;

  return (
    <div className={`usm-toast usm-toast--${toastMessage.type}`} onClick={closeNotification}>
      <div className="usm-toast__content">
        <MaterialIcon 
          name={toastMessage.type === 'success' ? 'check_circle' : 'info'} 
          className="toast-icon-svg" 
        />
        <span className="toast-text">{toastMessage.message}</span>
      </div>
      <button type="button" className="toast-close" onClick={closeNotification} aria-label="Cerrar notificación">
        <MaterialIcon name="close" />
      </button>
    </div>
  );
};

export default GlobalToast;
