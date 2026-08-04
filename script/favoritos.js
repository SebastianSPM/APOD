const renderizarFavoritos = () => {
    const contenedorFavoritos = document.getElementById("contenedorFavoritos");
    
    if(!contenedorFavoritos) return;
    
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    
    contenedorFavoritos.innerHTML = "";

    if(favoritos.length === 0){
        contenedorFavoritos.innerHTML = `
            <p>No tienes imágenes favoritas</p>
        `;
        return;
    }

    favoritos.forEach(data => {
        contenedorFavoritos.innerHTML += `
            <section class="card">
                <h2>Favoritos</h2>

                <h2>Titulo: <span>${data.title}</span></h2>
                <h3>Fecha: ${data.date}</h3>
                <img class="imagenApi" src="${data.url}" alt="${data.title}">
                <p class="descripcionApi">${data.explanation}</p>
                <button class="btn btn-danger" onclick="eliminarFavorito('${data.date}')">Eliminar de favoritos</button>
            </section>
        `
    })
}

renderizarFavoritos();

const eliminarFavorito = (fecha) => {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

    favoritos = favoritos.filter(item => item.date !== fecha);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    renderizarFavoritos()
}