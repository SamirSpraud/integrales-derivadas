const express = require("express");
const math = require("mathjs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/integral", (req, res) => {
  const { expression, variable, a, b } = req.body;

  try {
    let result;
    if (a !== undefined && b !== undefined) {
      // Definir la función a integrar
      const fn = math.compile(expression);
      // Calcular la integral definida usando la aproximación numérica
      result = math.integral(expression, variable).evaluate({ [variable]: b }) -
               math.integral(expression, variable).evaluate({ [variable]: a });
    } else {
      // Calcular la integral indefinida
      result = math.integral(expression, variable);
    }
    res.json({ result: result.toString() });
  } catch (error) {
    console.error("Error al calcular la integral:", error);
    res.status(400).json({ error: "No se pudo calcular la integral" });
  }
});

app.post("/derivada", (req, res) => {
  const { expression, variable } = req.body;

  try {
    const result = math.derivative(expression, variable);
    res.json({ result: result.toString() });
  } catch (error) {
    console.error("Error al calcular la derivada:", error);
    res.status(400).json({ error: "No se pudo calcular la derivada" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
