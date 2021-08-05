const express = require("express");
const RouterProductos = require("./routes/productos");
const app = express();
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR29rdSIsImlhdCI6MTYyODExMDU5MX0.xLhDOlyG5XxtHlky8vqk9X72pXJFS42nnXjro6KLVzk`;

const tokenDecifrado = jwt.verify(token, "Secreto");
console.log(tokenDecifrado);

app.listen(3000, console.log("Server ON"));

app.use(express.json());

app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  exphbs({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/components/",
  })
);

app.get("/token", (req, res) => {
  const token = jwt.sign({ name: "Goku" }, "Secreto");
  res.send(token);
});

app.get("/", (req, res) => {
  res.render("Home", { layout: "Home", name: "Goku" });
});

app.get("/carrito", (req, res) => {
  res.render("Carrito", { layout: "Carrito" });
});
app.use("/productos", RouterProductos);

app.get("*", (req, res) => {
  res.status(404).json({
    error: "404 Not Found",
    message: "No existe el recurso que solicita",
  });
});
