const Joi = require("joi");

const id = Joi.string().alphanum().min(1);
const customerId = Joi.string().alphanum().min(1);
const date = Joi.date();

const orderId = Joi.string().alphanum().min(1);
const productId = Joi.string().alphanum().min(1);
const amount = Joi.number().min(1);

const creationSchema = Joi.object({
	customerId: customerId.required(),
	date: date
});

const fullValidationSchema = Joi.object({
	customerId: customerId.required(),
	date: date.required()
});

const simpleValidationSchema = Joi.object({
	customerId: customerId,
	date: date
});

const idValidationSchema = Joi.object({
	id: id.required()
});

const addProductToAnOrderSchema = Joi.object({
	orderId: orderId.required(),
	productId: productId.required(),
	amount: amount.required()
});

module.exports = { creationSchema, fullValidationSchema, simpleValidationSchema, idValidationSchema, addProductToAnOrderSchema };