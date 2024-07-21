const { Sequelize, DataTypes } = require("sequelize");
const { sql } = require("../config/db.config");
const app_config = require("../../json/app-config.json");
const bcrypt = require("bcrypt");

const TaskModel = sql.define(
  "task",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false
    },
    is_delete:{
        type: DataTypes.BOOLEAN,
        defaultValue : false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    schema: app_config.DB_SCHEMA,
    tableName: "task",
  }
);

module.exports = TaskModel;
