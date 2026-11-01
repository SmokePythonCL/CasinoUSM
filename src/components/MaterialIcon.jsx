import React from 'react';

export const MaterialIcon = ({ name, className = '', style = {}, filled = false }) => {
  return (
    <span 
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: filled ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        fontSize: 'inherit',
        lineHeight: 1,
        verticalAlign: 'middle',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};

export default MaterialIcon;
