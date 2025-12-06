let getProducts_form = document.getElementById("getProducts-form");
let listado_productos = document.getElementById("listado-productos");
let contenedor_formulario = document.getElementById("contenedor-formulario");


getProducts_form.addEventListener("submit", async (event) => {
    
    event.preventDefault(); 

    let formData = new FormData(event.target); 
    console.log(formData);

    let data = Object.fromEntries(formData.entries()); 
    console.log(data);

    let idProducto = data.id;
    console.log(idProducto); 

    try {
        let response = await fetch(`http://localhost:3000/api/productos/${idProducto}`);
        console.log(response);

        let datos = await response.json();
        console.log(datos);

        let producto = datos.payload[0]; 

        mostrarProducto(producto); 

    } catch (error) {
        console.error("Error: ", error);
    }

});

function mostrarProducto(producto) {

    let htmlProducto = `
        <li class="li-listados">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-listados">
            <p>Id: ${producto.id}/ Nombre: ${producto.nombre}/ <strong>Precio: $${producto.precio}</strong></p>
        </li>
        <li class="li-botonera">
            <input type="button" id="updateProduct_button" value="Actualizar producto">
        </li>
        `;

    listado_productos.innerHTML = htmlProducto;

    let updateProduct_button = document.getElementById("updateProduct_button");

    updateProduct_button.addEventListener("click", event => {
        crearFormularioPut(event, producto);
    });
}


function crearFormularioPut(event, producto) {

    event.stopPropagation();
    console.table(producto);

let formularioPutHtml = `
    <form id="updateProducts-form" class="products-form-amplio">

        <input type="hidden" name="id" value="${producto.id}">

        <label for="nameProd">Nombre</label>
        <input type="text" name="name" id="nameProd" value="${producto.nombre}" required>
        <br>

        <label for="imageProd">Imagen</label>
        <input type="text" name="image" id="imageProd" value="${producto.imagen}" required>
        <br>

        <label for="categoryProd">Categoría</label>
        <select name="category" id="categoryProd" required>
            <option value="impresora">Impresora</option>
            <option value="cartucho">Cartucho</option>
        </select>
        <br>

        <label for="priceProd">Precio</label>
        <input type="number" name="price" id="priceProd" value="${producto.precio}" required>
        <br>

        <label for="activeProd">Estado</label>
        <select name="active" id="activeProd" required>
            <option value="1" ${producto.activo == 1 ? "selected" : ""}>Activo</option>
            <option value="0" ${producto.activo == 0 ? "selected" : ""}>Inactivo</option>
        </select>
        <br>

        <input type="submit" value="Actualizar producto">
    </form>
`;


    contenedor_formulario.innerHTML = formularioPutHtml;

    let updateProducts_form = document.getElementById("updateProducts-form");

    updateProducts_form.addEventListener("submit", event => {
        actualizarProducto(event)
    });
}

async function actualizarProducto(event) {
    event.preventDefault();

    let url = "http://localhost:3000/api/productos";
    
    let formData = new FormData(event.target);
    console.log(formData);

    let data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(response);

        let result = await response.json(); 

        if(response.ok) { 
            console.log(result.message);
            alert(result.message);

            listado_productos.innerHTML = "";
            contenedor_formulario.innerHTML = "";

        } else {
            console.error("Error: ", error.message);
            alert(error.message);
        }

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
}