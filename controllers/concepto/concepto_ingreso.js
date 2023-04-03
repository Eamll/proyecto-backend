const { ConceptoIngreso } = require("../../db/models/concepto");



const mostrarConceptosIngreso = async (req, res, next) => {
    try {
        const conceptosIngreso = await ConceptoIngreso.findAll();
        res.status(200).send({
            status: 'success',
            conceptosIngreso,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    mostrarConceptosIngreso,
};
