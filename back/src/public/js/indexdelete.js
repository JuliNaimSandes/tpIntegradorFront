// DELETE

const url = "http://localhost:3000/api";

let getProducts_form = document.getElementById("getProducts-form");
let getId_lista = document.getElementById("getId-list");

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
        
        if(!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`); // Error 404: Not Found
        }

        //guardamos producto en una variable
        let producto = datos.payload[0]; 

        mostrarProducto(producto);

    }catch(error){
        console.error("Error al obtener producto" , error);
        getId_lista.innerHTML = `<p>${error.message}</p>`
    }
})

function mostrarProducto(producto){
            let htmlProducto = `
                        <li class="li-listados productos-listados">
                            <div class="li-listados_datos">
                                <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
                                <img src="${producto.image}" alt="${producto.nombre}" class="img-listados">
                            </div>
                            <div class="li-listados_boton">
                                <input class="listados_boton" id="deleteProduct_button" type="button" value="Eliminar producto">
                            </div>
                        </li>
        `;

        getId_lista.innerHTML = htmlProducto;
        
        let idProd = producto.id;
        let deleteProduct_button = document.getElementById("deleteProduct_button");
        
        deleteProduct_button.addEventListener("click", function(event){

            event.stopPropagation();

            let confirmacion = confirm("Eliminar producto?");
            
            if(!confirmacion){
                alert("Eliminacion cancelada");
            }else{
                eliminarProducto(idProd);
            }
        })
}

async function eliminarProducto(id){
    try{
        let response = await fetch(`${url}/products/${id}`, {
            method: "DELETE"
        });

        let result = await response.json();

        if(response.ok){
            alert(result.message);
            getId_lista.innerHTML= "";
            return true;

        }else{
            console.error("Error" , result.message);
            alert("Ocurrio un error al eliminar un producto");
            return false;
        }
    } catch(error){
        console.error("Error en la solicitud DELETE",error);
        alert("Ocurrio un error al eliminar un producto");
        return false;
    }
}