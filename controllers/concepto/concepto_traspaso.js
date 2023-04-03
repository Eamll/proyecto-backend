const { ConceptoTraspaso } = require("../../db/models/concepto");



const mostrarConceptosTraspaso = async (req, res, next) => {
    try {
        const conceptosTraspaso = await ConceptoTraspaso.findAll();
        res.status(200).send({
            status: 'success',
            conceptosTraspaso,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    mostrarConceptosTraspaso,
};
