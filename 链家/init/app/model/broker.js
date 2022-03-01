"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Broker = app.model.define("broker", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(),
    tel: STRING(),
    company: STRING(),
    newHouse: STRING(),
    secondHandHouse: STRING(),
    renting: STRING(),
    state: STRING(),
    created_at: DATE,
    updated_at: DATE,
  });

  return Broker;
};
