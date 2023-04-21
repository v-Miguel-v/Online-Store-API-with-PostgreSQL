const { Model, DataTypes } = require("sequelize");
const { CATEGORY_TABLE } = require("./category.model");

const PRODUCT_TABLE = "products";

const ProductSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING
	},
	price: {
		allowNull: false,
		type: DataTypes.INTEGER
	},
	categoryId: {
		allowNull: false,
		type: DataTypes.STRING,
		field: "category_id",
		references: {
			model: CATEGORY_TABLE,
			key: "name"
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL"
	}
}

class Product extends Model {
	static associate(models) {
		this.belongsTo(models.Category, {as: "category"})
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: PRODUCT_TABLE,
			modelName: "Product",
			timestamps: false
		}
	}
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };