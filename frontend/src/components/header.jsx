import React from 'react';
import './Header.css'; 

const Header = ({ activeTab, onTabChange }) => {
  return (
    <header className="header">
      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'integrales' ? 'active' : ''}`}
          onClick={() => onTabChange('integrales')}
        >
          Integrales
        </button>
        <button
          className={`tab ${activeTab === 'derivadas' ? 'active' : ''}`}
          onClick={() => onTabChange('derivadas')}
        >
          Derivadas
        </button>
        <button
          className={`tab ${activeTab === 'documentacion' ? 'active' : ''}`}
          onClick={() => onTabChange('documentacion')}
        >
          Documentación y Aprendizaje
        </button>
        <button
          className={`tab ${activeTab === 'graficar' ? 'active' : ''}`}
          onClick={() => onTabChange('graficar')}
        >
          Graficar
        </button>
      </nav>
    </header>
  );
};

export default Header;
