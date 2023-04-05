const Joi = require("joi");

const id = Joi.string().alphanum().min(1);
const name = Joi.string().min(2);
const age = Joi.number().integer().positive();
const role = Joi.string().min(1);

const fullValidationSchema = Joi.object({
	name: name.required(),
	age: age.required(),
	role: role
});

const simpleValidationSchema = Joi.object({
	name: name,
	age: age,
	role: role
});

const idValidationSchema = Joi.object({
	id: id.required()
});

module.exports = { fullValidationSchema, simpleValidationSchema, idValidationSchema };