"use strict";
const { OrderProductSchema, ORDER_PRODUCT_JOINTABLE } = require("./../models/jointable-order-product.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_JOINTABLE, OrderProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDER_PRODUCT_JOINTABLE);
  }
};