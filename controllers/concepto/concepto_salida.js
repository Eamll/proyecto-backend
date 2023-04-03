const ConceptoSalida = require("../../db/models/concepto/concepto_salida");


const mostrarConceptosSalida = async (req, res, next) => {
    try {
        const conceptosSalida = await ConceptoSalida.findAll();
        res.status(200).send({
            status: 'success',
            conceptosSalida,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    mostrarConceptosSalida,
};
