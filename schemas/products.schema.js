const Joi = require("joi");

const id = Joi.string().alphanum().min(1);
const name = Joi.string().min(2);
const price = Joi.number().positive();
const category = Joi.string().min(1);

const limit = Joi.number().min(1);
const offset = Joi.number().min(0);

const fullValidationSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	category: category.required()
});

const simpleValidationSchema = Joi.object({
	name: name,
	price: price,
	category: category
});

const idValidationSchema = Joi.object({
	id: id.required()
});

const queryPaginationSchema = Joi.object({
	limit,
	offset
});

module.exports = { fullValidationSchema, simpleValidationSchema, idValidationSchema, queryPaginationSchema };