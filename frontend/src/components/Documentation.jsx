import React from 'react';
import './Documentation.css';

const Documentation = () => {
  return (
    <div className="documentation">
      <h2>Fórmulas y Datos Útiles para Integrales</h2>
      <div className="box">
        <h3>Uso de la App</h3>
        <ul>
          <li>Para integrales y derivadas, la aplicacion esta habilitada para usar los simbolos dispuestos en el teclado virtual.</li>
          <li>El apartado dispone de ejemplos basicos de uso.</li>
          <li>El apartado de graficado permite la graficacion de funciones trigonometicas, lineales y exponenciales.</li>
        </ul>
      </div>

      <div className="box">
        <h3>Fórmulas Básicas</h3>
        <ul>
          <li>∫x<sup>n</sup> dx = (x<sup>n+1</sup>)/(n+1) + C, (n ≠ -1)</li>
          <li>∫e<sup>x</sup> dx = e<sup>x</sup> + C</li>
          <li>∫1/x dx = ln|x| + C</li>
          <li>∫cos(x) dx = sin(x) + C</li>
          <li>∫sin(x) dx = -cos(x) + C</li>
          <li>∫sec<sup>2</sup>(x) dx = tan(x) + C</li>
          <li>∫csc<sup>2</sup>(x) dx = -cot(x) + C</li>
          <li>∫sec(x)tan(x) dx = sec(x) + C</li>
          <li>∫csc(x)cot(x) dx = -csc(x) + C</li>
        </ul>
      </div>

      <div className="box">
        <h3>Integrales de Funciones Trigonométricas</h3>
        <ul>
          <li>∫sin<sup>2</sup>(x) dx = (x/2) - (sin(2x)/4) + C</li>
          <li>∫cos<sup>2</sup>(x) dx = (x/2) + (sin(2x)/4) + C</li>
          <li>∫sin(x)cos(x) dx = (sin<sup>2</sup>(x)/2) + C</li>
          <li>∫sin<sup>3</sup>(x) dx = (2 - cos<sup>2</sup>(x))/3 + C</li>
          <li>∫cos<sup>3</sup>(x) dx = (2cos(x) + cos<sup>3</sup>(x))/3 + C</li>
          <li>∫tan(x) dx = -ln|cos(x)| + C</li>
          <li>∫cot(x) dx = ln|sin(x)| + C</li>
          <li>∫sec(x) dx = ln|sec(x) + tan(x)| + C</li>
          <li>∫csc(x) dx = ln|csc(x) - cot(x)| + C</li>
        </ul>
      </div>

      <div className="box">
        <h3>Consejos Útiles</h3>
        <ul>
          <li>Siempre revisa si puedes simplificar la expresión antes de integrar.</li>
          <li>Usa sustituciones cuando encuentres productos o cocientes complicados.</li>
          <li>Para integrales definidas, asegúrate de evaluar las funciones en los límites correctos.</li>
          <li>Descompón fracciones racionales en fracciones parciales para facilitar la integración.</li>
          <li>Recuerda las identidades trigonométricas para simplificar integrales con funciones trigonométricas.</li>
          <li>Para integrales que involucran raíces cuadradas, considera usar sustituciones trigonométricas.</li>
        </ul>
      </div>

      <div className="box">
        <h3>Métodos Comunes de Integración</h3>
        <ul>
          <li><strong>Método de Sustitución:</strong> Útil cuando se puede reconocer una función compuesta. Sustituye una parte de la integral con una nueva variable.</li>
          <li><strong>Integración por Partes:</strong> Basado en la regla del producto de la derivada. Se usa cuando la integral es un producto de dos funciones.</li>
          <li><strong>Fracciones Parciales:</strong> Descompone una fracción racional en una suma de fracciones más simples.</li>
          <li><strong>Transformaciones Trigonométricas:</strong> Utiliza identidades trigonométricas para simplificar la integración de funciones trigonométricas.</li>
          <li><strong>Integrales Trigonométricas:</strong> Métodos especiales para integrar productos de funciones trigonométricas.</li>
          <li><strong>Integrales Improprias:</strong> Se aplican cuando los límites de integración son infinitos o cuando la función tiene discontinuidades.</li>
          <li><strong>Integración de Funciones Racionales:</strong> Usa la descomposición en fracciones parciales para integrar funciones racionales.</li>
          <li><strong>Sustituciones Trigonométricas:</strong> Utiliza sustituciones como x = tan(θ) o x = sec(θ) para simplificar integrales que contienen raíces cuadradas.</li>
        </ul>
      </div>

      <div className="box">
        <h3>Ejemplos de Integración</h3>
        <ul>
          <li><strong>∫(2x + 3) dx:</strong> 2(∫x dx) + ∫3 dx = 2(x<sup>2</sup>/2) + 3x + C = x<sup>2</sup> + 3x + C</li>
          <li><strong>∫x e<sup>x</sup> dx (Integración por Partes):</strong> u = x, dv = e<sup>x</sup> dx. Entonces, du = dx y v = e<sup>x</sup>. ∫x e<sup>x</sup> dx = x e<sup>x</sup> - ∫e<sup>x</sup> dx = x e<sup>x</sup> - e<sup>x</sup> + C = e<sup>x</sup>(x - 1) + C</li>
          <li><strong>∫1/(x<sup>2</sup> + 1) dx:</strong> arctan(x) + C</li>
          <li><strong>∫e<sup>-x</sup> dx:</strong> -e<sup>-x</sup> + C</li>
          <li><strong>∫1/(x<sup>2</sup> - a<sup>2</sup>) dx:</strong> (1/2a)ln| (x - a)/(x + a) | + C</li>
          <li><strong>∫√(1 - x<sup>2</sup>) dx (Sustitución Trigonométrica):</strong> x = sin(θ), dx = cos(θ) dθ. Entonces, ∫√(1 - sin<sup>2</sup>(θ)) cos(θ) dθ = ∫cos<sup>2</sup>(θ) dθ = (θ + sin(θ)cos(θ))/2 + C = (arcsin(x) + x√(1 - x<sup>2</sup>))/2 + C</li>
        </ul>
      </div>
    </div>
  );
};

export default Documentation;
