'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Secondhouse = app.model.define('secondhouses', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(),
        ditie: STRING(),
        quyu: STRING(),
        jiage: STRING(),
        fangxing: STRING(),
        mianji: STRING(),
        ts: STRING(),
        cx: STRING(),
        ll: STRING(),
        zx: STRING(),
        yt: STRING(),
        qs: STRING(),
        dt: STRING(),
        lx: STRING(),
        xq: STRING(),
        // _id: STRING(),
        img: STRING(),
        created_at: DATE,
        updated_at: DATE,
    });

    return Secondhouse;
};