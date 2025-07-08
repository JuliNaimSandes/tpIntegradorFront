import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router();

//centralizamos todas las logicas de las rutas de productos aqui
// exportamos todas las rutas , a un archivo q va a centralizar en un archivo de barril q tiene todas las rutas


// GET

router.get("/", getAllProducts );


// GET PRODUCTS BY ID

router.get("/:id" ,validateId, getProductById );


// POST insert products

router.post("/", createProduct);


// PUT upadte products

router.put("/", modifyProduct);


// DELETE 

router.delete("/:id", removeProduct );


// exportamos rutas de los productos

export default router;