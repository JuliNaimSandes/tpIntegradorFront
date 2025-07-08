//MIDDLEWARES// es lo q se ejecutan entre la peticion y la respuesta en el medio
// Estos son middlewares de aplicacion , aplicados a nivel global para todas las solicitudes : autenticacion ,registro de solicitudes o logging, analisis del cuerpo de la solicitud body parsing

// MIDDLEWARES DE RUTA 
// middlewares de loguer :  para logear y analizar y logear todas las solicitudes 
// para ver q metodos pedimos y que url , req.method y req.url , porq tenemos acceso a los objetos res y req , si no anda tolalesSting , si no usar toIsosString
const loggerUrl = ((req , res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// validar el id , este se lo pasamos luego por ejemplo a GET products by Id ( como tercer parametro ,antes del async). 
const validateId = (req, res, next) => {
    const id = req.params.id; // o const { id } = req.params

    // En caso de no existir id o de que este no sea un numero
    if(!id || isNaN(id)) {
        return res.status(400).json({
            error: "El ID debe ser un numero"
        })
    }

    // Convertimos el parametro id a un numero entero (integer) de base 10, decimal
    req.id = parseInt(id, 10);

    next();
}

export{
    loggerUrl,
    validateId
}