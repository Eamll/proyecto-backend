const { ConceptoAjuste } = require("../../db/models/concepto");



const mostrarConceptosAjuste = async (req, res, next) => {
    try {
        const conceptosAjuste = await ConceptoAjuste.findAll();
        res.status(200).send({
            status: 'success',
            conceptosAjuste,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    mostrarConceptosAjuste,
};
