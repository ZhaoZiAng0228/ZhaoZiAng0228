'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, } = app.Sequelize;
    const Info = app.model.define('Info', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(),
        tit: STRING(),
        status: INTEGER,
        price: STRING(),
        date: STRING(),
        created_at: DATE,
        updated_at: DATE,
    });
    return Info;

};