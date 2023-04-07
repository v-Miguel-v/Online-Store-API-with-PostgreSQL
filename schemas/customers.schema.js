const Joi = require("joi");

const id = Joi.string().alphanum().min(1);
const name = Joi.string().min(2);
const lastName = Joi.string().min(2);
const phoneNumber = Joi.string().min(11).max(11).pattern(/^\d+$/);
const userId = Joi.string().alphanum().min(1);

const fullValidationSchema = Joi.object({
	name: name.required(),
	lastName: lastName.required(),
	phoneNumber: phoneNumber.required(),
	userId: userId.required()
});

const simpleValidationSchema = Joi.object({
	name: name,
	lastName: lastName,
	phoneNumber: phoneNumber,
	userId: userId
});

const idValidationSchema = Joi.object({
	id: id.required()
});

module.exports = { fullValidationSchema, simpleValidationSchema, idValidationSchema };