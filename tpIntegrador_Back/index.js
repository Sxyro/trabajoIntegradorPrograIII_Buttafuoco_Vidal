import express from "express";
const app = express();

import environments from "./src/api/config/environments.js";
const PORT = environments.port;

import cors from "cors";

import { productRoutes } from "./src/api/routes/index.js";
import { join, __dirname } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "src", "public")));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));

app.use("/api/productos", productRoutes);

app.get("/", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM productos");

        res.render("index", {
            title: "Indice",
            about: "Lista de productos",
            products: rows
        });

    } catch (error) {
        console.log(error);
    }
});

app.get("/consultar", (req, res) => {
    res.render("consultar", {
        title: "Consultar producto",
        about: "Consulta de productos por ID"
    });
});

app.get("/crear", (req, res) => {
    res.render("crear", {
        title: "Crear producto",
        about: "Alta de nuevos productos"
    });
});

app.get("/modificar", (req, res) => {
    res.render("modificar", {
        title: "Modificar producto",
        about: "Modificación de productos"
    });
});

app.get("/eliminar", (req, res) => {
    res.render("eliminar", {
        title: "Eliminar producto",
        about: "Eliminación de productos"
    });
});

app.get("/productos", async (req, res) => {
    try {
        const [rows] = await connection.query(
            "SELECT * FROM productos WHERE activo = 1"
        );

        res.render("productos", {
            title: "Tienda",
            about: "Productos disponibles",
            products: rows
        });

    } catch (error) {
        console.log(error);
        res.send("Error al cargar la tienda");
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
