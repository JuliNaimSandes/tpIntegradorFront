import { Router } from "express";
import Products from "../models/products.models.js";
import { vistaConsultar, vistaCrear, vistaEliminar, vistaListado, vistaModificar } from "../controllers/view.controllers.js";

const router = Router();




//Ruta de las vistas EJS

router.get("/",vistaListado);


// pagina de consultar

router.get("/consultar", vistaConsultar);

//pagina de crear productos

router.get("/crear", vistaCrear)

//pagina de modificar productos 

router.get("/modificar", vistaModificar);


// pagina de eliminar productos
router.get("/eliminar", vistaEliminar);

// exportamos rutas de las vistas
export default router;