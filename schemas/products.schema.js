const Joi = require("joi");

const id = Joi.string().alphanum().min(1);
const name = Joi.string().min(2);
const price = Joi.number().positive();
const categoryId = Joi.string().min(1);

const fullValidationSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	categoryId: categoryId.required()
});

const simpleValidationSchema = Joi.object({
	name: name,
	price: price,
	categoryId: categoryId
});

const idValidationSchema = Joi.object({
	id: id.required()
});

module.exports = { fullValidationSchema, simpleValidationSchema, idValidationSchema };