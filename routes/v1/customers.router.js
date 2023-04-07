/* Instances Initialization */
const CustomersService = require("../../services/customers.service");
	const service = new CustomersService();

const express = require("express");
	const router = express.Router();

const validationHandler = require("../../middlewares/validation.handler");
	const { fullValidationSchema, simpleValidationSchema, idValidationSchema } = require("../../schemas/customers.schema");

// GET Requests
router.get("/", getCustomers); // ./Customers
async function getCustomers(request, response, errorHandlers) {
	try {
		const allCustomers = await service.getAll();
		response.status(200).json(allCustomers);
	} catch (error) {
		errorHandlers(error);
	}
}

// ./Customers/{id}
router.get("/:id", validationHandler(idValidationSchema, "params"), getCustomerById);
async function getCustomerById(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const customerFound = await service.search(id);
		response.status(200).json(customerFound);
	} catch (error) {
		errorHandlers(error);
	}
}

// POST Requests
router.post("/", validationHandler(fullValidationSchema, "body"), createCustomer); // ./Customers
async function createCustomer(request, response, errorHandlers) {
	try {
		const givenCustomer = request.body;
		const newCustomer = await service.create(givenCustomer);
		response.status(201).json({massage: "El cliente se creó correctamente.", customerCreated: newCustomer});
	} catch (error) {
		errorHandlers(error);
	}
}

// DELETE Requests
router.delete("/:id", validationHandler(idValidationSchema, "params"), deleteCustomer); // ./Customers/{id}
async function deleteCustomer(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const customerDeleted = await service.delete(id);
		response.status(200).json({massage: "El cliente se borró correctamente.", customerDeleted});
	} catch (error) {
		errorHandlers(error);
	}
}

// PATCH Requests
router.patch("/:id",
	validationHandler(idValidationSchema, "params"),
	validationHandler(simpleValidationSchema, "body"),
simpleUpdateCustomer); // ./Customers/{id}
async function simpleUpdateCustomer(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const updateInfo = request.body;
		const originalCustomer = await service.search(id);
		const customerUpdated = await service.update(id, updateInfo);
		response.status(200).json({
			massage: "El cliente se actualizó correctamente.",
			customerBefore: originalCustomer,
			customerAfter: customerUpdated
		});
	} catch (error) {
		errorHandlers(error);
	}
}

// PUT Requests
router.put("/:id",
	validationHandler(idValidationSchema, "params"),
	validationHandler(fullValidationSchema, "body"),
fullUpdateCustomer); // ./Customers/{id}
async function fullUpdateCustomer(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const updateInfo = request.body;
		const originalCustomer = await service.search(id);
		const customerUpdated = await service.update(id, updateInfo);
		response.status(200).json({
			massage: "El cliente se actualizó correctamente.",
			customerBefore: originalCustomer,
			customerAfter: customerUpdated
		});
	} catch (error) {
		errorHandlers(error);
	}
}

/* Export */
module.exports = router;