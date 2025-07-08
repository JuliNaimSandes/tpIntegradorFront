import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import {__dirname,join } from "./src/api/utils/index.js"



const app = express();
const PORT = environments.port;

// configuramos el ejs como motor de plantilla
app.set("view engine", "ejs");

//indicamos a la aplicacion que vamos a servir vistaas desde raiz de proyecto/src/views
app.set("views", join(__dirname, "src/views"));

//middlewere para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public")));

app.use(cors());// middleware Cors basico que permite todas las solicitudes (el error se da porq estamos con el back en el puerto 3000 y por ejemplo el front puerto 5000 ,entonces cors me resuelve ese error)

// para parasear el json del body en peticiones POST,PUT O PATCH    
app.use(express.json());

//para q se ejecute en todas las rutas , para logear todas las solicitudes
app.use(loggerUrl);    


// to do lo q apunte a /api/products va a atender a todo lo q apuntamos productRoutes , entonces en el archivo barril no hace falta escribir toda la ruta solo escribimos la variable donde asignamos
app.use("/api/products", productRoutes);

app.use("/dashboard", viewRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


