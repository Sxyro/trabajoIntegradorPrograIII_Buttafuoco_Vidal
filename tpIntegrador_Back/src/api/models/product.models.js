import connection from "../database/db.js";

const selectAllProducts = () => {

    const sql = "SELECT id, nombre, imagen, categoria, precio, activo FROM productos";


    return connection.query(sql);
}

const selectProductById = (id) => {

    let sql = "SELECT id, nombre, imagen, categoria, precio, activo FROM productos WHERE id = ? LIMIT 1";

    return connection.query(sql, [id]);
}


const insertProduct = (name, image, category, price) => {
    let sql = "INSERT INTO productos (nombre, imagen, categoria, precio) VALUES (?, ?, ?, ?)";

    return connection.query(sql, [name, image, category, price]);
}


const updateProduct = (name, image, category, price, active, id) => {
    let sql = `
        UPDATE productos
        SET nombre = ?, imagen = ?, categoria = ?, precio = ?, activo = ?
        WHERE id = ?
    `;

    return connection.query(sql, [name, image, category, price, active, id]);
}

const deleteProduct = (id) => {

     let sql = `UPDATE productos set activo = 0 WHERE id = ?`;

     return connection.query(sql, [id]);
}


export default {
    selectAllProducts,
    selectProductById,
    insertProduct,
    updateProduct,
    deleteProduct
}