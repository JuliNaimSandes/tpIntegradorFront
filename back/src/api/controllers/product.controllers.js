import Products from "../models/products.models.js";


// el controlador gestiona la peticiones y respuestas del clientes



// GET PRODUCTS 

export const getAllProducts = async ( req , res) => {

    try{

        
        let [rows] = await Products.selectAllProducts();

        //aca delvovemos un estado , el 200 es como esta todo ok , y lo devolvemos en formato json
        // payload es un conjunto de datos(es como un estandar llamarlo asi, queda guardado como un array,un string es un json)
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });

    }catch(error){
        console.error("Error obteniendo productos",error);

        res.status(500).json({
            error: "Error interno del servidor al obtener productos"
        })
    }
};



// GET PRODUCTS BY ID 

export const getProductById =  async (req , res) => {
    
    try {
        //let id = req.params.id;
        let {id} = req.params; 


        const [rows] = await Products.selectProductFromId(id);

        //Verificamos si esta vacio para mandar un error
        if(rows.length === 0 ){
            return res.status(404).json({
                error: `No se encontro el producto: ${id}`
            })
        }

        // si esta todo bien mandamos la respuesta 
        res.status(200).json({
            payload: rows
        })

    }catch (error){
        console.error("Error obteniendo id ", error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto por id"
        })
    };
    
};

// POST create new product

export const createProduct = async (req,res) => {
    
    try{
        let {category , image , name ,price} = req.body;// agarramos y guardamos los datos en variables de lo que recibimos del cliente 

        if(!category || !image || !name || !price){
            return res.status(400).json({
                message: "Datos invalidos"
            })
        }

        const [rows] = await Products.insertNewProduct(category,image,name,price);


        // devolvemos informacion util del insertId para devolver el id del producto creado
        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });

    }catch(error){
        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })


    }
};



// PUT 

export const modifyProduct = async (req, res) => {
    try {
        let { id, category, image, name, price } = req.body;

        // Validacion basica para comprobar que estan todos los campos
        if(!id || !category || !image || !name || !price) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }


        const [result] = await Products.updateProduct(id,category,image,name,price);

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.error("Error al actualizar el producto", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
};


// DELETE

export const removeProduct = async (req, res) =>{
    try{
        let {id} = req.params;

        if(!id){
            return res.status(400).json()({
                message: "Se requiere un id para eliminar el producto"
            })
        }


        const [result] = await Products.deleteProduct(id);
        
        if(result.affectedRows === 0 ){
            return res.status(404).json({
                message: `No se encontro producto con id ${id}`
            });  
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        })

    } catch(error){
        console.error("Error en DELETE / products/:id", error);

        res.status(500).json({
            message: `Error al eliminar producto con id ${id}`, error,
            error: error.message
        })
    }
};