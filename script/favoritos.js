let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

const renderizarFavoritos = () => {
    const contenedorFavoritos = document.getElementById("contenedorFavoritos");
    
    if(!contenedorFavoritos) return;  
    contenedorFavoritos.innerHTML = "";

    if(favoritos.length === 0){
        contenedorFavoritos.innerHTML = `
            <p>No tienes imágenes favoritas</p>
        `;
        return;
    }

    favoritos.forEach(data => {
        contenedorFavoritos.innerHTML += `
            <section class="card p-5">
                <h2>Favoritos</h2>
                <h2>Titulo: <span>${data.title}</span></h2>
                <h3>Fecha: ${data.date}</h3>
                <div class="contenedorImagen">
                    <img class="imagenApi" src="${data.url}" alt="${data.title}">
                    </div>
                <p class="descripcionApi">${data.explanation}</p>
                <button class="btn btn-danger" onclick="eliminarFavorito('${data.date}')">Eliminar de favoritos</button>
            </section>
        `
    })
}

renderizarFavoritos();

const eliminarFavorito = (fecha) => {

    favoritos = favoritos.filter(item => item.date !== fecha);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    renderizarFavoritos()
}