"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Control = app.model.define("control", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(),
    title: STRING(),
    area: STRING(),
    totalPrices: STRING(),
    rank: STRING(),
    state: STRING(),
    prov: STRING(),
    city: STRING(),
    district: STRING(),
    created_at: DATE,
    updated_at: DATE,
  });

  return Control;
};
