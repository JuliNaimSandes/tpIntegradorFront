/*
    Este script se encargara de cargar las cosas que cada pagina tendra.
    Primordialmente el Header y el Footer.
*/

//Array de bases, si se usan mas, simplemente añadir mas indices!
//Indice 0: Ruta del Archivo o Link | Indice 1: IDs a rellenar.
const bases = [
    ["html/header.html", "pag-header-cont"],
    ["html/footer.html", "pag-footer-cont"]
]

//Solo se ejecutara luego de cargarse las bases, esto carga el nombre debajo de logo.
function nombreBajoLogo(){
    const n = localStorage.getItem("cliente-nombre");
    if(n != null && typeof n == "string"){
        document.getElementById("pag-header-nombre").innerHTML = n;
    }
}

function crearException(msj){
    throw new Error(`Error: ${msj}`);
}

//Funcion para extraer el codigo HTML del archivo dado.
async function extraerDe(link){
    let r = "";

    //Fetcher.
    try{
        const response = await fetch(link);

        //Si hay respuesta del fetch, se comienza a extraer.
        if(response.ok){
            r = await response.text();
        }
        else{ //Caso contrario, se tira un error.
            crearException(response.status);
        }
    }
    catch(ex){ //Mismo caso aqui.
        console.log(`Error al cargar el Header: ${ex}`);
    }

    return r;
}

//Importacion del Header y Footer.
async function importarBases(){
    try{
        //Bucle FOR para el relleno.
        for (let i = 0; i < bases.length; i++) {
            const extr = await extraerDe(bases[i][0]);
            document.getElementById(bases[i][1]).innerHTML = extr
        }
    }catch(ex){
        console.log(`Error al cargar las bases: ${ex}`);
    }
}

importarBases().then(
    nombreBajoLogo
);