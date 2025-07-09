const API_URL = "http://localhost:3000/api/products";
let arrProductos = []; //Hola de nuevo, Parcial 1.

// Extraccion de productos desde la DB.
async function DB_extraerProductos() {
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        arrProductos = data.payload;
        console.log("Productos cargados!");
    }
    catch (err) { //Impresion del error.
        document.getElementById("lista-productos-label").innerHTML = `
            No se pudo cargar los productos!<br>
            <strong id="lista-productos-error"><u>${err.message}</strong></u>
        `
        console.error("Error cargando productos:", err);
    }
}

// Funcion para actualizar la lista de productos. De la mano con el array.
function actualizarTarjetasProducto(){
    if(arrProductos.length >= 1){
        let productos_t = ``;
        console.log(arrProductos);
        arrProductos.forEach(prod => {
            //El segundo indice esta puesto para que si genere la tarjeta.
            productos_t += generarTarjeta([prod,1]);
        });
        document.getElementById("lista-productos").innerHTML = productos_t;
    }
    else{ //Instancia sin productos...
        document.getElementById("lista-productos-label").innerHTML = `
            No hay productos disponibles!
        `;
    }
}

DB_extraerProductos().then(actualizarTarjetasProducto);
