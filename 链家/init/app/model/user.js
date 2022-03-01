'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('user', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(30),
        age: INTEGER,
        username: STRING(30),
        password: {
            type: STRING(32),
            comment: "md5存储"
        },
        tel: STRING,
        email: STRING,
        headerimg: STRING(1234),
        created_at: DATE,
        updated_at: DATE,
    });




    return User;
};