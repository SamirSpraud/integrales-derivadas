import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Grafica.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Funciones matemáticas comunes que se pueden usar sin "Math."
const mathFunctions = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  exp: Math.exp,
  log: Math.log,
  sqrt: Math.sqrt,
  abs: Math.abs,
  pow: Math.pow,
  sqrt: Math.sqrt,
};

const functionTranslations = {
  '√': 'Math.sqrt',
  '^': '**',
  'π': 'Math.PI',
  'e': 'Math.E',
  'ln': 'Math.log'
};

const Grafica = () => {
  const [funcion, setFuncion] = useState('');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ label: 'Función', data: [], borderColor: '#f79c42', backgroundColor: 'rgba(247, 156, 66, 0.2)', borderWidth: 2 }]
  });
  const [error, setError] = useState(null);

  const handleFuncionChange = (event) => {
    setFuncion(event.target.value);
  };

  const handleButtonClick = (value) => {
    setFuncion((prevValue) => prevValue + value);
  };

  const parseFunction = (func) => {
    let parsedFunc = func;
    for (const [key, value] of Object.entries(functionTranslations)) {
      parsedFunc = parsedFunc.replace(new RegExp(`\\${key}`, 'g'), value);
    }
    for (const [key] of Object.entries(mathFunctions)) {
      parsedFunc = parsedFunc.replace(new RegExp(`\\b${key}\\b`, 'g'), key);
    }
    return new Function('x', `with (Math) { return ${parsedFunc} }`);
  };

  const handlePlot = () => {
    try {
      if (!funcion.trim()) {
        throw new Error('El campo de función no puede estar vacío.');
      }

      const parsedFunction = parseFunction(funcion);
      const labels = [];
      const values = [];
      const step = 0.1;

      for (let x = -10; x <= 10; x += step) {
        labels.push(x);
        values.push(parsedFunction(x));
      }

      setChartData({
        labels: labels,
        datasets: [{ ...chartData.datasets[0], data: values }]
      });
      setError(null);
    } catch (err) {
      setError(`Error al procesar la función: ${err.message}`);
    }
  };

  return (
    <div className="grafica-container">
      <input
        type="text"
        value={funcion}
        onChange={handleFuncionChange}
        placeholder='Introduce una función matemática, por ejemplo: sin(x)'
      />
      <div className="keyboard">
        <div className="keyboard-row">
          <button onClick={() => handleButtonClick("√(")}>√</button>
          <button onClick={() => handleButtonClick("^")}>^</button>
          <button onClick={() => handleButtonClick("(")}>(</button>
          <button onClick={() => handleButtonClick(")")}>)</button>
          <button onClick={() => handleButtonClick("+")}>+</button>
          <button onClick={() => handleButtonClick("-")}>-</button>
          <button onClick={() => handleButtonClick("*")}>*</button>
          <button onClick={() => handleButtonClick("/")}>/</button>
        </div>
        <div className="keyboard-row">
          <button onClick={() => handleButtonClick(".")}>.</button>
          <button onClick={() => handleButtonClick("e")}>e</button>
          <button onClick={() => handleButtonClick("x")}>x</button>
          <button onClick={() => handleButtonClick("π")}>π</button>
        </div>
        <div className="keyboard-row">
          <button onClick={() => handleButtonClick("sin(")}>sin</button>
          <button onClick={() => handleButtonClick("cos(")}>cos</button>
          <button onClick={() => handleButtonClick("tan(")}>tan</button>
          <button onClick={() => handleButtonClick("log(")}>log</button>
          <button onClick={() => handleButtonClick("ln(")}>ln</button>
        </div>
      </div>
      <button onClick={handlePlot}>Graficar</button>
      {error && <div className="grafica-error">Error: {error}</div>}
      <div className="grafica-chart">
        <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (tooltipItem) => `Valor: ${tooltipItem.raw}` } } } }} />
      </div>
    </div>
  );
};

export default Grafica;
