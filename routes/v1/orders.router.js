/* Instances Initialization */
const OrdersService = require("../../services/orders.service");
	const service = new OrdersService();

const express = require("express");
	const router = express.Router();

const validationHandler = require("../../middlewares/validation.handler");
	const { creationSchema, fullValidationSchema, simpleValidationSchema, idValidationSchema } = require("../../schemas/orders.schema");

// GET Requests
router.get("/", getOrders); // ./Orders
async function getOrders(request, response, errorHandlers) {
	try {
		const allOrders = await service.getAll();
		response.status(200).json(allOrders);
	} catch (error) {
		errorHandlers(error);
	}
}

// ./Orders/{id}
router.get("/:id", validationHandler(idValidationSchema, "params"), getOrderById);
async function getOrderById(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const orderFound = await service.search(id);
		response.status(200).json(orderFound);
	} catch (error) {
		errorHandlers(error);
	}
}

// POST Requests
router.post("/", validationHandler(creationSchema, "body"), createOrder); // ./Orders
async function createOrder(request, response, errorHandlers) {
	try {
		const givenOrder = request.body;
		const newOrder = await service.create(givenOrder);
		response.status(201).json({massage: "La orden se creó correctamente.", orderCreated: newOrder});
	} catch (error) {
		errorHandlers(error);
	}
}

// DELETE Requests
router.delete("/:id", validationHandler(idValidationSchema, "params"), deleteOrder); // ./Orders/{id}
async function deleteOrder(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const orderDeleted = await service.delete(id);
		response.status(200).json({message: "La orden se borró correctamente.", orderDeleted});
	} catch (error) {
		errorHandlers(error);
	}
}

// PATCH Requests
router.patch("/:id",
	validationHandler(idValidationSchema, "params"),
	validationHandler(simpleValidationSchema, "body"),
simpleUpdateOrder); // ./Orders/{id}
async function simpleUpdateOrder(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const updateInfo = request.body;
		const originalOrder = await service.search(id);
		const orderUpdated = await service.update(id, updateInfo);
		response.status(200).json({
			massage: "La orden se actualizó correctamente.",
			orderBefore: originalOrder,
			orderAfter: orderUpdated
		});
	} catch (error) {
		errorHandlers(error);
	}
}

// PUT Requests
router.put("/:id",
	validationHandler(idValidationSchema, "params"),
	validationHandler(fullValidationSchema, "body"),
fullUpdateOrder); // ./Orders/{id}
async function fullUpdateOrder(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const updateInfo = request.body;
		const originalOrder = await service.search(id);
		const orderUpdated = await service.update(id, updateInfo);
		response.status(200).json({
			massage: "El ordero se actualizó correctamente.",
			orderBefore: originalOrder,
			orderAfter: orderUpdated
		});
	} catch (error) {
		errorHandlers(error);
	}
}

/* Export */
module.exports = router;