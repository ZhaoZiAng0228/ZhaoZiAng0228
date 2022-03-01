'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const City = app.model.define('cities', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        code: STRING(50),
        parent_id: INTEGER,
        name: STRING(255),
        first_letter: STRING(10),
        level: INTEGER,
        created_at: DATE,
        updated_at: DATE,
    });
    return City;
};