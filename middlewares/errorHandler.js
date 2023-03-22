const manejarError = (error, req, res, next) => {
    if (error.name === 'SequelizeValidationError') {
        console.error('Validation error:', error.message);
        error.errors.forEach(err => {
            let friendlyMessage;
            console.log(err);
            if (err.validatorKey === 'isInt') {
                friendlyMessage = `Please enter a valid integer for '${err.path}'.`;
            } else if (err.validatorKey === 'is_null') {
                friendlyMessage = `The '${err.path}' field is required.`;
            } else {
                friendlyMessage = `An error occurred with the '${err.path}' field.`;
            }

            console.error('Error:', friendlyMessage);
            err.message = friendlyMessage;
        });

        // Combine friendly messages from all errors into a single message
        error.message = error.errors.map(err => err.message).join(' ');
    } else if (error.name === 'SequelizeForeignKeyConstraintError') {
        console.error('SequelizeForeignKeyConstraintError error:', error.message);
        // // Limpiar el nombre de la llave foranea
        const prefijo = `${error.table}_`;
        const sufijo = '_fkey';
        const nombreLlaveForanea = error.index.replace(prefijo, '').replace(sufijo, '');
        // const message = `El valor del atributo '${nombreLlaveForanea}' no existe`;
        // error.message = message;
        // console.log(error.parent.sql + "******");
        if (error.parent) {
            const parentSql = error.parent.sql;
            if (parentSql.includes('DELETE')) {
                errorMessage = `No se puede eliminar '${nombreLlaveForanea}' porque está asociado(a) a otro registro.`;
            } else if (parentSql.includes('UPDATE')) {
                errorMessage = `No se puede actualizar '${nombreLlaveForanea}' porque el valor proporcionado no existe o no es válido.`;
            } else if (parentSql.includes('INSERT')) {
                errorMessage = `No se puede insertar '${nombreLlaveForanea}' porque el valor proporcionado no existe o no es válido.`;
            } else {
                errorMessage = `El valor del atributo '${nombreLlaveForanea}' no existe, `;
            }
        } else {
            errorMessage = `El valor del atributo '${nombreLlaveForanea}' no existe`;
        }
        error.message = errorMessage;
    } else if (error.name === 'SequelizeUniqueConstraintError') {
        console.error('SequelizeUniqueConstraintError error:', error.message);
        const { path, value } = error.errors[0];
        const message = `El atributo '${path}' con valor '${value}' ya está en uso`;
        error.message = message;
    }

    else {
        console.error('Unexpected error:', error);
        error.message = 'Error interno del servidor'
    }
    res.status(500).send({
        status: "error",
        message: error.message,
    });
};

module.exports = manejarError;