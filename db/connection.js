const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://pixaapqw:ekGeXfZFPelGm2TblNxKFjcVKmqk4Uz4@babar.db.elephantsql.com/pixaapqw');

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        const result = await sequelize.query('SELECT NOW() AS "theTime"');
        console.log(result[0][0].theTime);

    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}

module.exports = {
    sequelize,
    connectDb
}