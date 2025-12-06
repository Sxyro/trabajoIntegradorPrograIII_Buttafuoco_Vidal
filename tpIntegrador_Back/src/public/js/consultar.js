let getProducts_form = document.getElementById("getProducts-form");
let listado_productos = document.getElementById("listado-productos");
let url = "http://localhost:3000/api/productos";


getProducts_form.addEventListener("submit", async (event) => {
    
    event.preventDefault();

    let formData = new FormData(event.target); 
    console.log(formData);

    let data = Object.fromEntries(formData.entries());
    console.log(data);

    let idProducto = data.id;
    console.log(idProducto);

    try {

        console.log(`Realizamos una peticion GET a ${url}/${idProducto}`);
        
        let response = await fetch(`http://localhost:3000/api/productos/${idProducto}`);
        console.log(response);

        let result = await response.json();
        console.log(result);

        if(response.ok) {
            let producto = result.payload[0];
            mostrarProducto(producto); 

        } else {
            console.error(result.message)
            mostrarError(result.message);
        }


    } catch (error) {
        console.error("Error: ", error);
    }

})

function mostrarProducto(producto) {
    let htmlProducto = `
        <div class="consulta-contenedor">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="consulta-img">

            <div class="consulta-info">
                <p><strong>ID:</strong> ${producto.id}</p>
                <p><strong>Nombre:</strong> ${producto.nombre}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
            </div>
        </div>
    `;

    document.getElementById("contenedor-productos").innerHTML = htmlProducto;
}



function mostrarError(message) {
    listado_productos.innerHTML = `
        <li class="mensaje-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
}