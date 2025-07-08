// POST //
const url = "http://localhost:3000/api";

let altaProducs_form = document.getElementById("altaProduct-form");
    //agregamos un listener para cuando hace enviar 
    altaProducs_form.addEventListener("submit", async (event) => {
        event.preventDefault(); // evitamos q se mande por defecto el formulario

        let formData = new FormData(event.target); // obtenemos data de formulario , mediante la clase nativa de JavaScipt FormData

        let data = Object.fromEntries(formData.entries()); // lo transformamos a objeto , devuelve un objeto clave valor .
        
        //verificamos los datos
        if(!data.name || !data.image || !data.price){
            alert("Todos los campos son obligatorios");
            return;
        };

        try{

            let response = await fetch(`${url}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)// transformamos a json porq enviamos y recibimos data en texto plano
            });
                // boleano = ok q devuelve true si recibe un valor entre 200 y 299
                if(response.ok) {
                    console.log(response);
                    //convierte el body a objeto json
                    let result = await response.json();
                    alert(result.message);
                    event.target.reset();
                }else{
                    let error = await response.json();
                    console.log("Error: ", error.message);
                }

        }catch(error){
                
                console.log("Error al enviar los datos" , error);
                alert("Error al enviar la solicitud"); 
        }

    }); 
