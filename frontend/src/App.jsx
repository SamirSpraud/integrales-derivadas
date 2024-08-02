// src/App.jsx
import React, { useState } from 'react';
import Header from './components/Header';
import InputWithKeyboard from './components/InputWithKeyboard';
import Documentation from './components/Documentation';
import Grafica from './components/Grafica'; // Importa el nuevo componente
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('integrales');
  const [result, setResult] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [variable, setVariable] = useState('');
  const [isDerivative, setIsDerivative] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResult('');
    const isDeriv = tab === 'derivadas';
    setIsDerivative(isDeriv);
    console.log(`Tab changed to: ${tab}, isDerivative: ${isDeriv}`);
  };

  const handleInputChange = (value, varValue) => {
    setInputValue(value);
    setVariable(varValue);
  };

  const renderActiveTabView = () => {
    switch (activeTab) {
      case 'integrales':
      case 'derivadas':
        return (
          <>
            <h1>{activeTab === 'integrales' ? 'Integrales' : 'Derivadas'}</h1>
            <InputWithKeyboard
              onInputChange={handleInputChange}
              onCalculate={() => {}}
              isDerivative={isDerivative}
            />
            <div className="result">{result}</div>
          </>
        );
      case 'documentacion':
        return <Documentation />;
      case 'graficar':
        return <Grafica />; // Agrega el componente de gráfica aquí
      default:
        return null;
    }
  };

  return (
    <>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="main-content">{renderActiveTabView()}</main>
    </>
  );
}

export default App;
