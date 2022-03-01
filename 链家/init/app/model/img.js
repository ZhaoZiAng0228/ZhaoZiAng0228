'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Img = app.model.define('img', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(),
        url: STRING(),
        tel: STRING(),
        created_at: DATE,
        updated_at: DATE,
    });




    return Img;
};