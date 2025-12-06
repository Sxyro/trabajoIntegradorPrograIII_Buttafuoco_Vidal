import ProductModel from "../models/product.models.js"; 

export const getAllProducts = async (req, res) => {
    try {
        const [rows, fields] = await ProductModel.selectAllProducts();

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });

    } catch (error) {
        console.error("Error obteniendo productos", error.message);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}

export const getProductById = async (req, res) => { 
    try {
        let { id } = req.params;
        
        const [rows] = await ProductModel.selectProductById(id);

        if(rows.length === 0) {
            console.log(`Error!! No existe producto con el id ${id}`);

            return res.status(404).json({
                message: `No se encontro producto con id ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        });


    } catch (error) {
        console.log("Error obteniendo producto por id: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}

export const createProduct = async (req, res) => {

    try {
        let { name, image, category, price } = req.body;
        console.log(req.body);
        console.log(`Nombre producto: ${name}`);

        if(!category || !image || !name || !price) {
            return res.status(400).json({
                message: "Datos invalidos, asegurate de enviar todos los campos"
            });
        }

        let [rows] = await ProductModel.insertProduct(name, image, category, price);

        res.status(201).json({
            message: "Producto creado con exito!",
        });

    } catch (error) {
        console.log("Error al crear producto: ", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}

export const modifyProduct = async (req, res) => {
    try {
        let { id, name, image, category, price, active } = req.body;

        if(!id || !name || !image || !category || !price || !active) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let [result] = await ProductModel.updateProduct(name, image, category, price, active, id);

        console.log(result);


        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizo el producto"
            })
        }


        res.status(200).json({
            message: `Producto con id: ${id} actualizado correctamente`
        });

    } catch(error) {
        console.error("Error al actualizar producto: ", error);

        res.status(500).json({
            message: `Error interno del servidor: ${error}`
        });
    }
}

export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;

        let [result] = await ProductModel.deleteProduct(id);

        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: `No se elimino el producto con id: ${id}`
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });

    } catch (error) {
        console.error("Error al eliminar un producto por su id: ", error);

        res.status(500).json({
            message: `Error al eliminar producto con id: ${id}`,
            error: error.message
        });
    }
}