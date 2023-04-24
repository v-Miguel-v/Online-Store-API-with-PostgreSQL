const { Model, DataTypes, Sequelize } = require("sequelize");
const { CUSTOMER_TABLE } = require("./customer.model");

const ORDER_TABLE = "orders";

const OrderSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	customerId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: "customer_id",
		references: {
			model: CUSTOMER_TABLE,
			key: "id"
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL"
	},
	date: {
		allowNull: false,
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
	},
	total: {
		type: DataTypes.VIRTUAL,
		get() {
			if (this.products.length > 0) {
				return this.products.reduce( (total, product) => {
					return total + (product.price * product.OrderProduct.amount);
				}, 0);
			}
			return 0;
		}
	}
}

class Order extends Model {
	static associate(models) {
		this.belongsTo(models.Customer, {as: "customer"});
		this.belongsToMany(models.Product, {
			as: "products",
			through: models.OrderProduct,
			foreignKey: "orderId",
			otherKey: "productId"
		})
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: "Order",
			timestamps: false
		}
	}
}

module.exports = { ORDER_TABLE, OrderSchema, Order };