"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Router = app.model.define("router", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    title: STRING,
    path: STRING,
    component: STRING,
    role: STRING, // 用户角色 0：系统管理员  1： 普通用户
    created_at: DATE,
    updated_at: DATE,
  });

  return Router;
};
