const API_URL = "http://localhost:3000/api/products";

function generar_tarjeta(nombre, imagen, precio, categoria) {
    return `
        <div id="tarjeta-producto">
            <h3 id="tarjeta-producto-nombre">${nombre}</h3>
            <img id="tarjeta-producto-imagen" src="${imagen}">
            <h3 id="tarjeta-producto-precio">$${precio}</h3>
            <button id="tarjeta-producto-agr">Agregar al Carro</button>
        </div>
    `;
}

const tarjeta_formato = `
    <h3 id="tarjeta-producto-nombre">Proteina</h3>
    <img id="tarjeta-producto-imagen" src="https://imgs.search.brave.com/g_HZ2mUWqiJTueL4nphfoEUi5fu4NqT2YIh1QCNcqI4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZGVtdXNjdWxvcy5j/b20vd2ViL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDI0LzAzLzEt/c295LXByb3RlaW4t/cHVsdmVyLTEta2ct/cHJvdGVpbmEtc29q/YS0wMS5qcGc">
    <h3 id="tarjeta-producto-precio">$30000</h3>
`;

async function cargarProductos() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const lista = document.getElementById("lista-productos");
        let productos_t = ``;
        console.table(data.payload);
        data.payload.forEach(prod => {
            productos_t += generar_tarjeta(prod.name, prod.image, prod.price, prod.category);
        });
        lista.innerHTML = productos_t;
    } 
    catch (err) { //Impresion del error.
        document.getElementById("lista-productos-label").innerHTML = `
            No se pudo cargar los productos!<br>
            <strong id="lista-productos-error"><u>${err.message}</strong></u>
        `
        console.error("Error cargando productos:", err);
    }
}

cargarProductos();