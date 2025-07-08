// PUT // 
const url = "http://localhost:3000/api";

let getProducts_form = document.getElementById("getProducts-form");
let getId_lista = document.getElementById("getId-list");

let updateForm_container =document.getElementById("updateForm-container");

getProducts_form.addEventListener("submit" , async (event) => {
    event.preventDefault();// evitamos el envio por defecto del formulario
    
    try{


        //queremos extraer la informacion de los campos del formulario, es un objeto javaScript especifico de informacion de formularios html , Formdata es una clase nativa de JavaScript
        let formData = new FormData(event.target);

        //transformamos el objeto FormData en un onjeto js normal
        //entries()es un iterabel
        //Object.formEntries devuelve en un objeto con pares clave valor

        let data = Object.fromEntries(formData.entries());

        // ahora que obtenemos el objeto con el campo de idprod , vamos a guardarlos en una variable
        let idProd = data.idProd.trim();// el trim es para eliminar posibles espacios

        if(!idProd) {
            throw new Error(`Error en el envio de datos del formulario`);
        };

        let response = await fetch(`${url}/products/${idProd}`);

        let datos = await response.json();

        
        // Optimizacion 4: Manejamos el error en una posible respuesta no existosa
        if(!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`); // Error 404: Not Found
        }


        //guardamos producto en una variable
        let producto = datos.payload[0]; 

        // agregamos boton actualizar producto
        let htmlProducto = `
                        <li class="li-listados productos-listados">
                            <div class="li-listados_datos">
                                <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
                                <img src="${producto.image}" alt="${producto.nombre}" class="img-listados">
                            </div>
                            <div class="li-listados_boton">
                                <input class="listados_boton" id="updateProduct_button" type="button" value="Actualizar producto">
                            </div>
                        </li>
        `;

        getId_lista.innerHTML = htmlProducto;

        // apuntamos al updateForm-container para mostrar el formulario de actulizacion dinamicamente

        let updateProduct_button = document.getElementById("updateProduct_button");
        
        // escuchamos el evento de click en el botton y creamos la funcion para darle la logica a ese boton
        updateProduct_button.addEventListener("click", function (event){
            formularioPutProducto (event, producto);
        })


    }catch(error){
        console.error("Error al obtener producto" , error);
        getId_lista.innerHTML = `<p>${error.message}</p>`
    }
})

//manejamos el evento para mostrar el formulario con los valores por defecto

function formularioPutProducto (event, producto){
    event.stopPropagation(); // evitamos la propagacion de eventos
    console.log(producto);

let updateProduct = `
                <div id="updateProducts-container" class="crudForm-container">
                    <h2>Actualizar producto</h2>

                    <form id="updateProducts-form" autocomplete="off">

                        <label for="idProd">Id</label>
                        <input type="number" name="id" id="idProd" value=${producto.id} readonly>

                        <label for="categoryProd">Categoria</label>
                        <select name="category" id="categoryProd" required>
                            <option value="suplemento">suplemento</option>
                            <option value="equipamiento">equipamiento</option>
                        </select>

                        <label for="imagenProd">Imagen</label>
                        <input type="text" name="image" id="imagenProd" value=${producto.image} required>

                        <label for="nombreUser">Nombre</label>
                        <input type="text" name="name" id="nombreUser" value="${producto.name}" required>

                        <label for="precioProd">Precio</label>
                        <input type="number" name="price" id="precioProd" value=${producto.price} required>

                        <input type="submit" value="Actualizar producto">
                    </form>
                </div>
                `;

updateForm_container.innerHTML = updateProduct;

// del nuevo formulario que acabamos de crear updateProduct , lo obtenemos y escuchamos el submit, luego le pasamos la nueva funcion actulizarProducto q es la funcion que le manda los datos al backEnd

let updateProduct_form = document.getElementById("updateProducts-form");

updateProduct_form.addEventListener("submit", function(event){
    actualizarProducto(event);
});
};

// funcion para enviar los nuevos datos al servidor

async function actualizarProducto(event){

    event.preventDefault();

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());
    console.table(data);

    if(!data.name || !data.image || !data.price){
        alert("Todos los campos son obligatorios");
        return;
    }


    
    try{
        let response = await fetch(`${url}/products` , {
            method:"PUT",
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify(data)
        });

        if (response.ok){
            console.log(response);

        let result = await response.json();
        console.log(result.message);
        alert(result.message);

        // Vaciamos si existiera la lista y el formulario de actualizacion del producto
            getId_lista.innerHTML = "";
            updateForm_container.innerHTML = "";

        } else {
            let error = await response.json();
            console.log("Error", error.message)
        }

    }catch(error){
        console.log("Error al enviar los datos", error);
        alert("Error al procesar la solicitud");
    }
};