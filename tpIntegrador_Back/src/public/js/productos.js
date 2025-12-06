let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderCarrito() {
    let lista = document.getElementById("carrito-lista");
    let totalSpan = document.getElementById("cart-total");
    let countSpan = document.getElementById("cart-count");

    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((prod, i) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${prod.name} - $${prod.price}
            <button class="btn-borrar" data-index="${i}">X</button>
        `;
        lista.appendChild(li);

        total += prod.price;
    });

    totalSpan.textContent = total;
    countSpan.textContent = carrito.length;

    document.querySelectorAll(".btn-borrar").forEach(btn => {
        btn.addEventListener("click", eliminarProducto);
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarProducto(event) {
    let prod = JSON.parse(event.target.dataset.prod);
    carrito.push(prod);
    renderCarrito();
}

function eliminarProducto(event) {
    let index = event.target.dataset.index;
    carrito.splice(index, 1);
    renderCarrito();
}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    renderCarrito();
});

document.querySelectorAll(".btn-carrito").forEach(btn => {
    btn.addEventListener("click", agregarProducto);
});

document.getElementById("buscador").addEventListener("input", event => {
    let texto = event.target.value.toLowerCase();
    document.querySelectorAll(".card-producto").forEach(card => {
        let nombre = card.querySelector("h5").textContent.toLowerCase();
        card.style.display = nombre.includes(texto) ? "block" : "none";
    });
});

renderCarrito();
