const express = require("express");
const usersRouter = require("./v1/users.router");
const ordersRouter = require("./v1/orders.router");
const productsRouter = require("./v1/products.router");
const customersRouter = require("./v1/customers.router");
const categoriesRouter = require("./v1/categories.router");

function routerApi(app) {
	const v1 = express.Router();
	app.use("/api/v1", v1);
		v1.use("/users", usersRouter);
		v1.use("/orders", ordersRouter);
		v1.use("/products", productsRouter);
		v1.use("/customers", customersRouter);
		v1.use("/categories", categoriesRouter);
}

module.exports = routerApi;