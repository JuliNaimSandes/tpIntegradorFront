import Products from "../models/products.models.js";


// Get view for Products
export const vistaListado = async (req,res) => {
    try{
        const respuestaProductos = await Products.selectAllProducts();
        res.render("index" , {
        title: "Listado de productos",
        products: respuestaProductos[0]
        });

    }catch(error){
        console.error("Error obteniendo la informacion",  error.message);
        res.status(500).json({
            error: "Error interno al obtener la informacion"
        });
    }
    };

// Get view for get id

export const vistaConsultar = (req, res) => {
    res.render("consultar" , {
        title: "Consultar producto",
        about: "Consultar producto por id"
    })
};

// Create view create

export const vistaCrear = (req, res) => {
    res.render("crear", {
        title: "Crear producto"
    })
};

// modificar view

export const vistaModificar = (req, res ) => {
    res.render("modificar" , {
        title: "Modificar producto",
        about: "Buscamos id , luego generamos formulario para actualizar los campos"
    })
};

// eliminar view

export const vistaEliminar = (req, res ) => {
    res.render("eliminar" , {
        title: "Eliminar producto",
        about: "Buscamos el id, luego generamos boton para eliminar el producto"
    })
};