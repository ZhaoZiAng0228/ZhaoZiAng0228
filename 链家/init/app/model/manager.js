"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Manager = app.model.define("manager", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    username: STRING(30),
    password: {
      type: STRING(32),
      comment: "md5存储",
    },
    state: STRING, // 1: 在职 2: 离职 3: 试用期
    role: STRING, // 用户角色 0：系统管理员  1： 普通用户
    tel: STRING,
    email: STRING,
    headerimg: STRING(1234),
    created_at: DATE,
    updated_at: DATE,
  });

  return Manager;
};
