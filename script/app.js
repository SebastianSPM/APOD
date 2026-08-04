const API = "https://api.nasa.gov/planetary/apod";

const API_KEY = "d4QAPpeEEQcVUGygvgGPAgGJchF5kylNMI9vpiIR"

const cargando = () => {
    Swal.fire({
        title: "Cargando...",
        Text: "Estamos cargando los datos",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

cargando();

fetch(`${API}?api_key=${API_KEY}`)
.then(response => {
    validarAPI(response.ok);

    if(!response.ok){
        throw new Error("Hay un error en la apis");
    }
    return response.json();
})
.then(data => {
    Swal.close();
    renderizar(data);
})
.catch(error => {
    console.error("Hay un error: ", error);
})

const validarAPI = (ok) => {
    if(ok){
        console.log("TODO OK");
    }else{
        console.log("FALLO ALGO");
    }
}

const renderizar = (data) => {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = `
        <section>
            <h2>Titulo: <span>${data.title}</span></h2>
            <img class="favoritosImagen" src="./../assets/images/heart-fill.svg" alt="" />
            <h3>Fecha: ${data.date}</h3>
            <img class="imagenApi" src="${data.url}" alt="${data.title}">
            <p class="descripcionApi">${data.explanation}</p>
            <input id="cambiarFecha" type="date" value="${data.date}">
        </section>
    `
    document.getElementById("cambiarFecha").addEventListener("change", (event) => {
        const fecha = event.target.value;
        nuevaImagen(fecha);
    });
}

const nuevaImagen = (fecha = "") => {
    let urlNormal = `${API}?api_key=${API_KEY}`;

    if(fecha){
        urlNormal += `&date=${fecha}`;
    }

    fetch(urlNormal)
    .then(response => response.json())
    .then(data => {
        renderizar(data);
    })
}

const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

favoritos.push(data)

localStorage.setItem("favoritos", JSON.stringify(favoritos))
