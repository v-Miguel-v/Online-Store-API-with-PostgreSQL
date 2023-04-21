const { User, UserSchema } = require("./user.model");
const { Product, ProductSchema } = require("./product.model");
const { Customer, CustomerSchema } = require("./customer.model");
const { Category, CategorySchema } = require("./category.model");

function setupModels(sequelize) {
	// Initilizations
	User.init(UserSchema, User.config(sequelize));
	Product.init(ProductSchema, Product.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));

	// Associations
	User.associate(sequelize.models);
	Product.associate(sequelize.models);
	Customer.associate(sequelize.models);
	Category.associate(sequelize.models);
}

module.exports = setupModels;