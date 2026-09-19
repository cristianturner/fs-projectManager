import app from "./index.js";

throw new Error("FALLO SIMULADO - SIMULACRO DE CAOS");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});