'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const District = app.model.define('district', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        pid: INTEGER,
        district_name: STRING(255),
        type: INTEGER,
        hierarchy: INTEGER,
        district_sqe: STRING(255),
        created_at: DATE,
        updated_at: DATE,
    });

    return District;
};