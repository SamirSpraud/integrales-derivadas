import "./App.css";
import Header from "./components/header";
import InputWithKeyboard from "./components/InputWithKeyboard";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("integrales");
  const [result, setResult] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [variable, setVariable] = useState("");
  const [isDerivative, setIsDerivative] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResult("");
    const isDeriv = tab === "derivadas";
    setIsDerivative(isDeriv);
    console.log(`Tab changed to: ${tab}, isDerivative: ${isDeriv}`);
  };

  const handleInputChange = (value, varValue) => {
    setInputValue(value);
    setVariable(varValue);
  };

  const renderActiveTabView = () => {
    switch (activeTab) {
      case "integrales":
      case "derivadas":
        return (
          <>
            <h1>{activeTab === "integrales" ? "Integrales" : "Derivadas"}</h1>
            <InputWithKeyboard
              onInputChange={handleInputChange}
              onCalculate={() => {}}
              isDerivative={isDerivative}
            />
            <div className="result">{result}</div>
          </>
        );
      case "documentacion":
        return <h1>Documentación y Aprendizaje</h1>;
      case "graficar":
        return <h1>Graficar Funciones</h1>;
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
