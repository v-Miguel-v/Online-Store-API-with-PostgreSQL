const Joi = require("joi");

const id = Joi.string().alphanum().min(1);
const customerId = Joi.string().alphanum().min(1);
const date = Joi.date();

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

module.exports = { creationSchema, fullValidationSchema, simpleValidationSchema, idValidationSchema };