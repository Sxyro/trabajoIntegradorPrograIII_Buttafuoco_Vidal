const validateId = (req, res, next) => {
    const { id } = req.params;

    if(!id || isNaN(id)) {
        return res.status(400).json({
            message: "El id debe ser un numero"
        });
    }

    req.id = parseInt(id, 10); 

    console.log("Id validado!: ", req.id);

    next(); 
}

export {
    validateId,
}