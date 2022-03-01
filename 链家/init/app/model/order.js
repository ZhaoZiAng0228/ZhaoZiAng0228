'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, } = app.Sequelize;
    const Order = app.model.define('Order', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        username: STRING(),
        serial: STRING(),
        type: STRING(),
        tel: STRING(),
        price: STRING(),
        date: STRING(),
        created_at: DATE,
        updated_at: DATE,
    });
    return Order;
};