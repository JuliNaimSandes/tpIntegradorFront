//////////////////////
// JavaScript VIII //
// JSON, asincronia, promesas, fetch, async/await y try/catch

///////////
// JSON //
/* 
JavaScript Object Notation o JSON es un formato ligero de intercambio de datos que es el estandar para la comunicacion entre aplicaciones en la web.
Si bien se basa en la notacion de objetos de JavaScript, es independiente de lenguaje y ampliamente utilizado en todo tipo de sistemas y lenguajes de programacion.
Es facil de leer, ligero, facil de parsear y generar e independiente del lenguaje.

JSON es un formato de texto que representa datos estructurados basados en dos estructuras fundamentales

    1. Coleccion de pares nombre/valor (equivalente a un objeto en JavaScript)
    2. Lista ordenada de valores (equivalente a un array en JavaScript)

{
    "nombre": "Juan Perez",
    "edad": 30,
    "esEstudiante": false,
    "direccion": {
        "calle": "Cochabamba 1614, 2o piso del lado de la sombra",
        "ciudad": "CABA"
    },
    "telefonos" : ["1111-2345", "2222-3456"]
}


// Reglas de sintaxis_____

    - Los datos estan en pares nombre/valor (clave/valor)
    - Los datos estan separados por comas
    - Las llaves {} representan objetos
    - Los corchetes [] represetan arrays
    - Las comillas dobles "" son obligatorias para nombres de propiedades y strings


// Tipos de datos_______
    1. Strings: "texto" (siempre con comillas dobles)
    2. Numbers: 42 o 3.1416
    3. Booleans: true o false
    4. Null: representa un valor nulo
    5. Objects: {"clave": "valor"}
    6. Arrays: ["valor1", "valor2"]


// JSON vs Objectos JavaScript

    - Comillas: Siempre dobles en JSON, en JS pueden ser simples o dobles
    - Valores de texto: Siempre entre comillas, en JS puede estar sin comillas
    - Funciones: No estan permitidas en JSON, en JS son permitidas
    - Fechas: No soportadas directamente, en JS tienen soporte nativo
    - Comentarios: No permitidos en JSON, en JS si son permitidos


Para que usaremos JSON?
    -   Usaremos JSON para la comunicacion cliente-servidor 

    -   Almacenamiento local para guardar datos en el navegador

-   -   Para configuraciones, ya que muchas herramientas usan JSON para configuraciones como package.json en Node.js
*/

// JSON.stringify() permite convertir un objeto JavaScript a una cadena JSON
let usuario = {
    nombre: "Gabi",
    edad: 22,
    habilidades: ["HTML", "CSS", "JavaScript"]
};
console.log(usuario);

let jsonUsuario = JSON.stringify(usuario);
console.log(jsonUsuario);


// JSON.parse nos permite convertir una cadena JSON a un objeto JS
let estudiante = `
    {
        "nombre": "Juan Perez",
        "edad": 30,
        "esEstudiante": false,
        "direccion": {
            "calle": "Cochabamba 1614, 2o piso del lado de la sombra",
            "ciudad": "CABA"
        },
        "telefonos" : ["1111-2345", "2222-3456"]
    }
`;

console.log(estudiante);

let objetoEstudiante = JSON.parse(estudiante);
console.log(objetoEstudiante);
console.log(objetoEstudiante.nombre);


///////////////////////////////
// Asincronia en JavaScript //
/*
Es la capacidad de un programa de ejecutar tareas que toman tiempo (acceder a una API, esperar a un temporizador) sin bloquear la ejecucion del resto del codigo

En JavaScript es clave porque es un lenguaje de un solo hilo (single-threaded), por lo que podemos ejecutar solo una tearea a la vez. Pero para evitar que el hilo principal de ejecucion se bloquee, usaremos mecanimos asincronicos para delegar operaciones que tomaran tiempo y continuar ejecutando el resto del codigo mientras esas tareas se completan.


// Herramientas de JavaScript para asincronia
- Callbacks: funciones que se pasan como argumento para ejecutarse despues de completar una operacion

- Promises: Objeto que representa un valor que puede estar disponible ahora, en el futuro o nunca
    Estados: pending, fulfilled, rejected


Diferencias entre fetch() y Promesas
    - fetch es una funcion WebAPI que devuelve una promesa
    - Promesa es un objeto nativo de JS que puede ser usada en fetch

    - fetch() es una funcion para hacer peticiones HTTP
    - Promesa es un objeto para manejar resultados asincronicos

    - fetch() devuelve una promesa
    - Promesa devuelve un valor, exito o error futuro

*/

// Ejemplo Promise
let promesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Datos listos!");
    }, 2000);
});

promesa.then(data => console.log(data));



//////////////
// fetch() //
/*
- fetch() es una funcion incorporada en los navegadores modernos que permite realizar peticiones HTTP de forma asincronica utilizando promesas

- Es parte de las Web APIs prooporcionadas por el navegador

- Fue introducida como parte del Fetch API para reemplazar al viejo XMLHttpRequest


Caracteristicas tecnicas
    - Devuelve un objeto Promise, que se resuelve con un objeto Response
    - Usa el estandar HTTP: metodos como GET, POST, PUT y DELETE
    - Funcion bien con async/await
    - Es mas limpia y moderna que XMLHttpRequest
    - Soporta CORS, cabeceras, envio de JSON, etc


Sintaxis
Parametros:
    - url: string, se refiere a la URL donde estamos haciendo la solicitud
    
    - options: OPCIONAL, es un objeto que especifica configuracion adicional, como metodos (method), cabeceras (headers), cuerpo (body)

fetch(url, options)
    .then(response => {
        // respuesta cruda del sewrvidor
    })
    .catch(error => {
        // error de red o fallo total
    })


Casos de uso comunes
    - Consumir APIs REST (obtener datos de usuarios, productos, etc)
    - Enviar formularios con POST
    - Cargar contenido dinamico en una SPA (Single Page Application)
    - Interacciones cliente-servidor en tiempo real
*/

// Ejemplo completo de fetch con GET

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return response.json(); // Transformamos a objeto JS
    })
    .then(data => {
        console.log("Usuarios:", data);
    })
    .catch(error => {
        console.error("Error al obtener los datos:", error);
    });

// TODO, ver ejemplo con opciones POST cuando veamos protocolo HTTP y arquitectura cliente-servidor

/* El objeto Response
La promesa devuelta por fetch() se resuelve con un objeto Response que tiene
    .ok             booleano (true si status esta entre 200 y 299)
    .status         codigo HTTP (200, 299, 404)
    .statusText     texto del estado("OK", "not found")
    .headers        cabeceras HTTP de la respuesta
    .json()         para leer el contenido de la respuesta
*/

async function cargarUsuarios() {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/users");

        if(!response.ok) throw new Error("Error HTTP: " + response.status);

        let data = await response.json();

        console.log("Usuarios:", data);

    } catch(error) {
        console.error("Error al obtener datos", error);
    }
}


//////////////////
// async-await //
/*
Es azucar sintactico (sintaxis sugar) es una manera de hacer el codigo o la sintaxis mas legible y comprensible.
Esta nueva y simplificada sintaxis nos permite escribir codigo asincrono con una sintaxis similar al codigo sincrono

El objetivo es hacer el manejo de la asincronia mas legible, estructurado y facil de entender y depurar

Entre las ventajas del async/await
    - Mas legible y secuencial
    - Mejor manejo de errores con try/catch
    - Ideal para flujos largos y complejos de asincronia


Cuando usamos await:
    1. JavaScript evalua la expresion que devuelve una promesa

    2. SUSPENDE la ejecucion de la funcion hasta que la promesa se resuelva o rechace

    3. Si se resuelve, se continua con el valor

    4. Si se rechaza, lanza un error que puede ser atrapado por try...catch


Resumen
    - async: declara una funcion asincrona que devuelve una promesa
    - await: pausa la funcion hasta que la promesa se resuelva
    - try/catch: maneja errores de promesas rechazadas

    Ventajas: Codigo mas limpio, legible y facil de depurar
*/

async function saludar() {
    return "Holis"
}

// Aunque saludar devuelve un string, en realidad, devuelve una Promise que se resuelve con este valor
saludar()
    .then(console.log)

// La palabra clave await pausa la ejecucion de la funcion async hasta que una Promesa sea resuelta (fulfilled) o rechazada (rejected)

// Ejemplo de encadenamiento (mas facil de interpretar con async/await)
async function flujoSecuencial() {
    let usuario = await obtenerUsuario();

    let posts = await obtenerPosts(usuario.id);

    let comentarios = await obtenerComentarios(posts[0].id);

    console.log(comentarios);
}


//////////////////
// try...catch //
/*
try...catch es una estructura de control utilizada para capturar y manejar errores que ocurren durante la ejecucion de bloques de codigo. Esta tecnica forma parte del manejo de excepciones en JavaScript

Su objetivo es evitar que errores inesperados detengan la ejecucion del programa y en su lugar permitir manejar dichos errores de forma controlada
*/

try {
    // Codigo que podria fallar

} catch (error) {
    // Manejar el error

} finally { // OPCIONAL -> Esto se ejecuta siempre, haya o no haya error
    // Codigo quie se ejecuta siempre
}


// Ejemplo basico
try {
    let resultado = 10 / 0;
    console.log(resultado);
    throw new Error("Error personalizado");

} catch (error) {
    console.log("Ocurrio un error:", error.message);

} finally {
    console.log("Esto se ejecuta siempre");
}

/* try...catch captura errores de tiempo de ejecucion (runtime)
    - Acceso a variables no definidas
    - Llamadas a funciones inexistentes
    - Errores lanzados con throw
    - Problemas en funciones JSON.parse()


Internamente

    1. El bloque try se ejecuta normalmente

    2. Si ocurre un error dentro del try, se detiene inmediatamente la ejecucion y pasa al bloque catch

    3. El objeto de error (se puede llamar por convencion: "error", "err", "e") contiene informacion como:
        .name       tipo de error(TypeError, ReferenceError)
        .message    mensaje descriptivo

    4. El bloque finally, si existe, siempre se ejecuta (ocurra o no un error)
*/


// throw: lanzando errores manualmente
// Podemos lanzar nuestros propios errores con throw, para validaciones o control de flujo
function dividir(a, b) {
    if (b === 0) {
        throw new Error("No se puede dividir entre cero");
    }
    return a / b
}

try {
    console.log(dividir(10, 0));

} catch(err) {
    console.error("Error:", err.message);
}


/*
Por que no usar try...catch en exceso?
    - Puede ocultar errores reales si no se maneja correctamente

    - Tiene un coste de rendimineto, especialmente en bucles

    - Es mejor usarlo en secciones donde hay riesgo real de error (operaciones de red)


Buenas practicas en el manejo de errores:
    - No atrapar errores que no podemos manejar

    - usar try...catch solo donde esperamos errores (parseando datos o haciendo llamadas a APIs)

    - Usar finally para cerrar recursos, limpiar o terminar tareas (conexiones, indicadores de carga, ble)

    - Siempre proporcionar informacion util en el error (e.message)'


Resumen
    - try: ejecuta codigo que puede lanzar errores
    - catch: captura y maneja el error
    - finally: codigo que se ejecuta siempre, con o sin error
    - throw: lanza errores manualmente
    - error: objeto con informacion del error
    - uso ideal: llamadas a red, parsing, validacion, async/await
*/