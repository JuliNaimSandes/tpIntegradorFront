const API_URL = "http://localhost:3000/api/products";
let arrProductos = []; //Hola de nuevo, Parcial 1.
let arrCarrito = [];

// Funcion para generar tarjetas de productos.
function generar_tarjeta(prod) {
    let r = `
        <div id="tarjeta-producto">
            <h3 id="tarjeta-producto-nombre">${prod.name}</h3>
            <img id="tarjeta-producto-imagen" src="${prod.image}">
            <h3 id="tarjeta-producto-precio">$${prod.price}</h3>
    `;
    
    //Esto decidira que boton aparecera en la tarjeta.
    if(!productoEnCarro(prod)){
        r += `
            <button id="tarjeta-producto-agr" onClick="agregarAlCarrito(${prod.id})">Agregar al Carro</button>
        </div>
        `;
    }
    else{
        r += `
            <button id="tarjeta-producto-elm" onClick="eliminarDelCarrito(${prod.id})">Eliminar del Carro</button>
        </div>
        `;
    }
    return r;
}

// Extraccion de productos desde la DB.
async function DB_extraerProductos() {
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        arrProductos = data.payload;
        console.log("Productos cargados!")
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
        arrProductos.forEach(prod => {
            productos_t += generar_tarjeta(prod);
        });
        document.getElementById("lista-productos").innerHTML = productos_t;
    }
    else{ //Instancia sin productos...
        document.getElementById("lista-productos-label").innerHTML = `
            No hay productos disponibles!
        `
    }
}

// Funcion para agregar un producto al carro, a resaltar que el carrito aqui esta almacenado de forma local.
function agregarAlCarrito(id){
    try{
        let prod = arrProductos[id-1]; //-1 Porque en la BD el ID comienza desde 1.
        arrCarrito.push(prod);
        localStorage.setItem("carrito", JSON.stringify(arrCarrito));
        console.log(`Agregado al carrito el producto ${prod.name}`);
        actualizarTarjetasProducto();
    }
    catch(ex){
        console.log(ex);
    }
}

// Funcion para eliminar un producto al carro.
function agregarAlCarrito(id){
    try{
        let prod = arrProductos[id-1]; //-1 Porque en la BD el ID comienza desde 1.
        arrCarrito.push(prod);
        localStorage.setItem("carrito", JSON.stringify(arrCarrito));
        console.log(`Agregado al carrito el producto ${prod.name}`);
        actualizarTarjetasProducto();
    }
    catch(ex){
        console.log(ex);
    }
}

// Funcion para averiguar si hay un producto en el carro.
function productoEnCarro(prod){
    let r = false;
    for (let i = 0; i < arrCarrito.length; i++) {
        if(prod.id == arrCarrito[i].id){
            r = true
            break;
        }
        
    }
    return r;
}

// Funcion para borrar un producto del carrito.
function eliminarDelCarrito(id){
    for (let i = 0; i < arrCarrito.length; i++) {
        if(id == arrCarrito[i].id){
            arrCarrito.splice(i, 1);
        }
    }
    localStorage.setItem("carrito", JSON.stringify(arrCarrito));
    actualizarTarjetasProducto();
}

// Funcion para recargar el carrito, tomando los productos del localStorage!
async function recargarCarrito(){
    let arrCargado = localStorage.getItem("carrito");

    if(arrCargado != null){
        console.log("hay un carrito!")
        arrCargado = JSON.parse(arrCargado);
        console.log(arrCargado);

        //Si no esta vacio, se carga.
        if(arrCargado.length > 0){
            arrCargado.forEach(prod => {arrCarrito.push(prod)});
            console.log("Productos guardados cargados!")
        }
        return 1; 
    }
    else{
        return 0;
    }
}

recargarCarrito().then(DB_extraerProductos().then(actualizarTarjetasProducto));
