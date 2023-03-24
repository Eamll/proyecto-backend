const { reglasValidacionCatalogo } = require("./validadorCatalogo");
const { reglasValidacionCategoria } = require("./validadorCategoria");
const { reglasValidacionSubcategoria } = require("./validadorSubcategoria");
const { reglasValidacionTipoCatalogo } = require("./validadorTipoCatalogo");


module.exports = {
    reglasValidacionCatalogo,
    reglasValidacionCategoria,
    reglasValidacionSubcategoria,
    reglasValidacionTipoCatalogo
}
