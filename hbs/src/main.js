const express = require("express");
const handlebars = require("express-handlebars");

const ProductosApi = require("../api/productos.js");

const productosApi = new ProductosApi();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Set engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

//--------------------------------------------

app.post("/productos", (req, res) => {
  productosApi.guardar(req.body);
  res.redirect("/productos");
});

app.get("/productos", (req, res) => {
  const productos = productosApi.listarAll();
  const hayProductos = productos.length > 0 ? true : false;
  res.render("vista", { hayProductos, productos });
});

//--------------------------------------------
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
