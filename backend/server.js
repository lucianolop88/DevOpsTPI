const app = require("./app");
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto 5000`);
  });
}
