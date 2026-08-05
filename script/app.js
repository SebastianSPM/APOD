const API = "https://api.nasa.gov/planetary/apod";

const API_KEY = "d4QAPpeEEQcVUGygvgGPAgGJchF5kylNMI9vpiIR"
const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const cargando = () => {
    Swal.fire({
        title: "Cargando...",
        text: "Estamos cargando los datos",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

cargando();

fetch(`${API}?api_key=${API_KEY}`)
.then(response => {
    Swal.close();
    if(!response.ok){
        throw new Error("Hay un error en la apis");
    }
    
    return response.json();
})
.then(data => {
    Swal.close();

    if(!data.url){
        Swal.fire({
            icon: "info",
            title: "Esta imagen no se encuentra disponible.",
            text: "No se encuentra disponible por el momento."
        });
        return;
    }

    renderizar(data);
})
.catch(error => {
    console.error("Hay un error: ", error);
})

const renderizar = (data) => {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = `
        <section>
            <h2>Titulo: <span>${data.title}</span></h2>
            <h3>Fecha: ${data.date}</h3>
            <div class="contenedorImagen">
                <div class="contenido">
                    <img class="imagenApi" src="${data.url}" alt="${data.title}">
                    <img id="btnFavorito" class="favoritosImagen" src="./assets/images/heart.svg" alt="" />
                </div>
            </div>
            <p class="descripcionApi">${data.explanation}</p>
            <div>
                <hr />
                <p>Cambia la fecha para ver más imagenes:</p>
                <input id="cambiarFecha" type="date" value="${data.date}">
            </div>
        </section>
    `

    let btnFavorito = document.getElementById("btnFavorito"); 
    let favoritoActivo = favoritos.some(item => item.date === data.date);

    btnFavorito.src = favoritoActivo ? "./assets/images/heart-fill.svg" : "./assets/images/heart.svg"
    btnFavorito.addEventListener("click", () => {

        favoritoActivo = !favoritoActivo;

        if(favoritoActivo){
            btnFavorito.src = "./assets/images/heart-fill.svg"
            Swal.fire({
                title: "Guardado en favoritos",
                text: "Puedes ver más artículos guardados",
                icon: "success"
            });
            seccionFavoritos(data)
        }else{
            btnFavorito.src = "./assets/images/heart.svg"
            Swal.fire({
                title: "Eliminado de favoritos",
                text: "Elige otra seccion para guardarlo en favorito",
                icon: "error"
            });
            eliminarFavorito(data.date)
        }
    })

    const fechaInput = document.getElementById("cambiarFecha");
    fechaInput.max = new Date().toISOString().split("T")[0];
    
    fechaInput.addEventListener("change", (event) => {        
        const fecha = event.target.value;
        nuevaImagen(fecha);
    });
}

const guardado = document.getElementById("guardados");

guardado.addEventListener("mouseenter", () => {
    guardado.src = "./assets/images/bookmark-fill.svg";
});

guardado.addEventListener("mouseleave", () => {
    guardado.src = "./assets/images/bookmark.svg";
});


const nuevaImagen = (fecha = "") => {
    let urlNormal = `${API}?api_key=${API_KEY}`;

    if(fecha){
        urlNormal += `&date=${fecha}`;
    }

    fetch(urlNormal)
    .then(response => {
        if(!response.ok){
            throw new Error("La imagen no se encuentra disponible.")
        }
        return response.json();
    })
    .then(data => {
        renderizar(data);
    })
    .catch(error => {
        Swal.fire({
            icon: "info",
            title: "Esta imagen no se encuentra disponible.",
            text: "No se encuentra disponible por el momento."
        });
    })
}

const seccionFavoritos = (data) => {
    const seccionExiste = favoritos.some(item => item.date === data.date);

    if(!seccionExiste){
        favoritos.push(data);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
}

const eliminarFavorito = (fecha) => {

    favoritos = favoritos.filter(item => item.date !== fecha);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}


