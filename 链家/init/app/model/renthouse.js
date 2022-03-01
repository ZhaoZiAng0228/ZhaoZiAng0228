'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Renthouse = app.model.define('renthouses', {
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
        fs: STRING(),
        jjr: STRING(),
        zf: STRING(),
        pp: STRING(),
        lz: STRING(),
        zq: STRING(),

        // _id: STRING(),
        img: STRING(),
        created_at: DATE,
        updated_at: DATE,
    });

    return Renthouse;
};