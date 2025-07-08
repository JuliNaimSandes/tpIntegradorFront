// este archivo lo q hace es extraer la informacion del .env y exportar

import dotenv from "dotenv";

// cargamos las variables de entorno desde archivo.env
// process y env son dos objetos de node 
dotenv.config();

export default{
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
}