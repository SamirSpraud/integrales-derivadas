import React, { useState } from "react";
import "./InputWithKeyboard.css";

const InputWithKeyboard = ({ onInputChange, onCalculate, isDerivative }) => {
  const [inputValue, setInputValue] = useState("");
  const [variable, setVariable] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleButtonClick = (value) => {
    setInputValue((prevValue) => prevValue + value);
  };

  const handleVariableChange = (event) => {
    setVariable(event.target.value);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const formatResult = (result) => {
    return result
      .replace(/\*\*/g, "^")
      .replace(/\*/g, "·")
      .replace(/sqrt\(/g, "√(");
  };

  const handleCalculate = async () => {
    setResult(null);
    setError(null);
    onInputChange(inputValue, variable);

    const cleanedExpression = inputValue.replace(/√/g, "sqrt");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        expression: cleanedExpression,
        variable: variable,
      }),
    };

    try {
      const endpoint = isDerivative ? "/derivada" : "/integral";
      const response = await fetch(
        `http://localhost:3000${endpoint}`,
        requestOptions
      );

      if (!response.ok) {
        switch (response.status) {
          case 400:
            throw new Error("Solicitud incorrecta. Por favor, revisa los datos ingresados.");
          case 404:
            throw new Error("Recurso no encontrado. Verifica la URL del endpoint.");
          case 500:
            throw new Error("Error interno del servidor. Intenta nuevamente más tarde.");
          default:
            throw new Error(`Error HTTP inesperado: ${response.status}`);
        }
      }

      const data = await response.json();

      if (data.result) {
        setResult(formatResult(data.result));
        setError(null);
      } else {
        setResult(null);
        setError(data.error || "Error desconocido al calcular");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setError(error.message || "Error de conexión con el servidor");
      setResult(null);
    }
  };

  return (
    <div className="input-with-keyboard">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Escribe aquí la expresión matemática..."
        title="Ejemplo: 3*x^2 + 2*sin(x) - 5..."
      />
      <input
        type="text"
        value={variable}
        onChange={handleVariableChange}
        placeholder="Variable (por ej. x, y, z)"
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
          <button onClick={() => handleButtonClick("y")}>y</button>
          <button onClick={() => handleButtonClick("z")}>z</button>
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
      <button onClick={handleCalculate}>Calcular</button>
      {error && <div className="error">Error: {error}</div>}
      {result !== null && !error && (
        <div className="result">Resultado: {result}</div>
      )}
    </div>
  );
};

export default InputWithKeyboard;
