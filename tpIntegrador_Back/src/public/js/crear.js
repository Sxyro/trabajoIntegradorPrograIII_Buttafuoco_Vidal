let altaProducts_form = document.getElementById("altaProducts-form");
let url = "http://localhost:3000/api/productos";

altaProducts_form.addEventListener("submit", event => {

    event.preventDefault();

    let formData = new FormData(event.target);
    console.log(formData);

    let data = Object.fromEntries(formData.entries());
    console.log(data);
    console.log(JSON.stringify(data));
    enviarProducto(data);
});


async function enviarProducto(data) {
    console.table(data);

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        console.log(response);

        let result = await response.json();
        console.log(result);

        if(response.ok) {
            console.log(result.message);
            alert(result.message);

        } else {
            console.error(result.message);
            alert(result.message);
        }

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
}