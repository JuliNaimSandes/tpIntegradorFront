// Funcion para generar tarjetas, version carrito!
function actualizarTarjetasCarrito(){
    if(arrCarrito.length >= 1){
        let productos_t = ``;
        arrCarrito.forEach(prod => {
            productos_t += generarTarjeta(prod, 1);
        });
        document.getElementById("lista-carrito").innerHTML = productos_t;
    }
    else{ 
        //Instancia sin productos...
        document.getElementById("lista-productos-label").innerHTML = `
            No hay productos en el carro!
        `;
    }
}

actualizarTarjetasCarrito();