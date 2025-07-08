// Logica para trabajar acon archivos y rutas del proyecto

// convierte una URL de archivo (file:/) a una ruta de un sistema de archivos
import  { fileURLToPath }  from "url";

//Dirname devuelve el directorio padre de una ruta
//Join une partes de rutas
import { dirname, join} from "path";

const __filename = fileURLToPath(import.meta.url);
// import.url.meta proporciona la url absoluta del modo actual (file://ruta/al/archivo)
//fileURLToPath convierte ese url a una ruta de sistema (/ruta/al/archivo.js)   

const __dirname = join(dirname(__filename),"../../../");
//dirname(__filename) obtener el directorio del archivo actual
//join(...,",,/") retrocedemos tres niveles en la estructura de directorios  utils> api>src > proyectoBack

export{
    __dirname,
    join
}
