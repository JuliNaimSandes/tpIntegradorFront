//Fetcher del Header!
async function extraerHeader(){
    let cliente = localStorage.getItem("cliente-nombre");
    if(cliente == null || typeof cliente != "string" || cliente == ""){
        cliente = "";
    }

    try{
        let headerFetch = await fetch("header.html");
        let header = await headerFetch.text();
        console.log(localStorage.getItem("cliente-nombre"));
        document.getElementById("pag-header-cont").innerHTML = header.replaceAll("$NOMBRECLIENTE", localStorage.getItem("cliente-nombre"));
    }catch(ex){
        console.log(ex);
    }
    
}
extraerHeader();