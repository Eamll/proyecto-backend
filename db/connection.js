const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres://pixaapqw:ekGeXfZFPelGm2TblNxKFjcVKmqk4Uz4@babar.db.elephantsql.com/pixaapqw');
// const sequelize = new Sequelize('postgres://administrador:administrador@3.236.166.239:5432/proyecto');

const sequelize = new Sequelize('postgresql://postgres:Llave12325.@db.vhtsriezjncxpuzdccmh.supabase.co:5432/postgres');

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('La conexión se ha establecido satisfactoraimente.');
        const result = await sequelize.query('SELECT NOW() AS "theTime"');
        console.log(result[0][0].theTime);

    } catch (err) {
        console.error('No se ha podido conectar a la base de datos:', err);
    }
}

module.exports = {
    sequelize,
    connectDb
}