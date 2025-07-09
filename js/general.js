// Funciones constantemente referenciadas estaran aqui.
console.log("bloooooooooooooooooooooooom!");
let arrCarrito = cargarCarrito();

// Funcion para generar tarjetas de productos.
// Con el segundo argumento, podemos generar una tarjeta para carrito.
function generarTarjeta(prod, modo = 0) {
    if(modo == 1){
        return `
            <div id="tarjeta-producto">
                <img id="tarjeta-producto-imagen" src=${prod[0].image}>
                <h3 id="tarjeta-producto-nombre">${prod[0].name}</h3>
                <h3 id="tarjeta-producto-precio">$${prod[0].price}</h3>
                <h3 id="tarjeta-producto-categoria">Categoria: ${prod[0].category}</h3>
                <h3 id="tarjeta-producto-cantidad">x${prod[1]}</h3>
                <div id="tarjeta-producto-botones">
                    <button>Agregar Unidad</button>
                    <button>Borrar Unidad</button>
                </div>
            </div>
        `;
    }
    else{
        let r = `
            <div id="tarjeta-producto">
                <h3 id="tarjeta-producto-nombre">${prod[0].name}</h3>
                <img id="tarjeta-producto-imagen" src="${prod[0].image}">
                <h3 id="tarjeta-producto-precio">$${prod[0].price}</h3>
        `;
        
        //Esto decidira que boton aparecera en la tarjeta.
        if(!productoEnCarro(prod)){
            r += `
                <button id="tarjeta-producto-agr" onClick="agregarAlCarrito(${prod[0].id})">Agregar al Carro</button>
            </div>
            `;
        }
        else{
            r += `
                <button id="tarjeta-producto-elm" onClick="eliminarDelCarrito(${prod[0].id})">Eliminar del Carro</button>
            </div>
            `;
        }
        return r;
    }
}

// Funcion para cargar un carrito, tomando los productos del localStorage!
function cargarCarrito(){
    let arrCargado = localStorage.getItem("carrito");
    let r = [];

    if(arrCargado != null){
        arrCargado = JSON.parse(arrCargado);

        //Si no esta vacio, se carga.
        if(arrCargado.length > 0){
            arrCargado.forEach(prod => {r.push(prod)});
        }
    }
    
    return r;
}

// Funcion para averiguar si hay un producto en el carro.
function productoEnCarro(prod){
    let r = false;
    const c = arrCarrito;
    for (let i = 0; i < c.length; i++) {
        if(prod[0].id == c[i][0].id){
            r = true
            break;
        }
    }
    return r;
}

// Funcion para agregar un producto al carro, a resaltar que el carrito aqui esta almacenado de forma local.
function agregarAlCarrito(id){
    try{
        let prod = arrProductos[id-1]; //-1 Porque en la BD el ID comienza desde 1.
        if(!productoEnCarro(prod)){ //Si es producto nuevo, se añade en el array.
            arrCarrito.push([prod, 1]);
        }
        else{ //Caso contrario, se sumara su unidad!
            arrCarrito[encontrarIndiceProducto(prod)][1]++;
        }
        
        console.log(`Agregado al carrito el producto ${prod.name}`);
        actualizarTarjetasProducto();
    }
    catch(ex){
        console.log(ex);
    }

    localStorage.setItem("carrito", JSON.stringify(arrCarrito));
}

// Funcion para borrar un producto del carrito.
function eliminarDelCarrito(id){
    for (let i = 0; i < arrCarrito.length; i++) {
        const prod = arrCarrito[i];
        if(id == prod[0].id){
            //Si es la ultima unidad, se borra, sino, solo se le restara una.
            if(prod[1] <= 1){
                arrCarrito.splice(i, 1);
            }
            else{
                prod[1]--;
            }
        }
    }
    localStorage.setItem("carrito", JSON.stringify(arrCarrito));
    actualizarTarjetasProducto();
}

// Funcion para encontrar el indice de un producto.
function encontrarIndiceProducto(prod){
    let r = -1;
    for (let i = 0; i < arrCarrito.length; i++) {
        if(prod[0].id == arrCarrito[i][0].id){
            r = i;
            break;
        }
    }
    return r;
}