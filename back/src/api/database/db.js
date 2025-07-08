// aca vamos a escribir la logica de las conexiones , vamos a hacer un pull de conexiones , la conexion a la base de datos se establece en este archivo , y queda siempre abierta , entonces le podemos ir tirando querys

// importamos el modulo mysql2 en modo promesa para poder usar async/await para conectar a la BD

import mysql from "mysql2/promise";
import environments from "../config/environments.js";

//  Extraemos la variable de data base, creamos una const database que la sacamos de enviroments (otro paquete que importo ) y mediante los {} extraigo toda la informacion de database, entonces asi puedo usar por ejemplo database.port o database.name

const { database } = environments;

//creamos una nueva conexion 

//metodo de mysql2 createPool ( es un conjunto de conexiones a la base de datos , un conjunto activo y reutlizables(mejora el rendimiento))

const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password,
});

//exportamos coneccion para usarla en otros archivos 
export default connection;
