const { Model, DataTypes, Sequelize } = require("sequelize");
const { ORDER_TABLE } = require("./order.model");
const { PRODUCT_TABLE } = require("./product.model");

const ORDER_PRODUCT_JOINTABLE = "jointable_orders_products";

const OrderProductSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	orderId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: "order_id",
		references: {
			model: ORDER_TABLE,
			key: "id"
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL"
	},
	productId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: "product_id",
		references: {
			model: PRODUCT_TABLE,
			key: "id"
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL"
	},
	amount: {
		allowNull: false,
		type: DataTypes.INTEGER
	}
}

class OrderProduct extends Model {
	static associate(models) {
		// this.belongsTo(models.Customer, {as: "customer"});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_PRODUCT_JOINTABLE,
			modelName: "OrderProduct",
			timestamps: false
		}
	}
}

module.exports = { ORDER_PRODUCT_JOINTABLE, OrderProductSchema, OrderProduct };