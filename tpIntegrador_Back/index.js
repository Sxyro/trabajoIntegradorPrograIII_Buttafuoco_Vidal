import express from "express";
import cors from "cors";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";

const app = express();
const PORT = environments.port;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get("/api/productos", async (req, res) => {
  try {
    const sql = "SELECT * FROM productos";
    const [rows] = await connection.query(sql);
    res.status(200).json({
      payload: rows,
      message:
        rows.length === 0
          ? "No se encontraron productos"
          : "Productos encontrados",
    });
  } catch (error) {
    console.error("Error obteniendo productos", error);
    res.status(500).json({ message: "Error interno al obtener productos" });
  }
});

app.get("/api/productos/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let sql = "SELECT * FROM productos WHERE productos.id = ?";
    let [rows] = await connection.query(sql, [id]);

    if (rows.length === 0) {
      console.log(`Error! No se encontro producto con id ${id}`); 

      return res.status(404).json({
        message: `No se encontro producto con id ${id}`,
      });
    }

    res.status(200).json({
      payload: rows,
      message: "Producto encontrado",
    });
  } catch (error) {
    console.error(`Error obteniendo productos con id ${id}`, error.message);
    res.status(500).json({
      message: "Error interno al obtener producto con id",
    });
  }
});

app.post("/api/productos", async (req, res) => {
  try {
    let { name, image, category, price } = req.body;

    if (!name || !image || !category || !price) {
      return res.status(400).json({
        message: "Datos invalidos, asegurate de enviar todos los campos",
      });
    }

    let sql = `INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)`;

    let [result] = await connection.query(sql, [name, image, category, price]);

    res.status(201).json({
      message: "Producto creado con exito",
      productId: result.insertId,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
});

app.put("/api/productos", async (req, res) => {
  try {
    let { id, name, image, category, price, active } = req.body;

    if (!id || !name || !image || !category || !price || !active) {
      return res.status(400).json({
        message: "Faltan campos requeridos",
      });
    }

    let sql = `
            UPDATE productos
            SET nombre = ?, imagen = ?, categoria = ?, precio = ?, activo = ?
            WHERE id = ?
        `;

    let [result] = await connection.query(sql, [
      name,
      image,
      category,
      price,
      active,
      id,
    ]);
    console.log(result);

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "No se actualizo el producto",
      });
    }

    res.status(200).json({
      message: `Producto con id ${id} actualizado correctamente`,
    });
  } catch (error) {
    console.error("Error al actualizar productos", error);

    res.status(500).json({
      message: "Error interno del servidor",
      error,
    });
  }
});

app.delete("/api/productos/:id", async (req, res) => {
    try {
        let { id } = req.params;

        let sql = "DELETE FROM productos WHERE id = ?";

        let [result] = await connection.query(sql, [id]);

        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se eliminó el producto"
            });
        } 

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });

    } catch(error) {
        console.error("Error al eliminar un producto: ", error);

        res.status(500).json({
            message: `Error al eliminar un producto con id ${id}: `, error,
            error: error.message
        })
    }
});