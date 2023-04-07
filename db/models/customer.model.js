const { Model, DataTypes } = require("sequelize");
const { USER_TABLE } = require("./user.model");

const CUSTOMER_TABLE = "customers";

const CustomerSchema = {
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
	lastName: {
		allowNull: false,
		type: DataTypes.STRING,
		field: "last_name"
	},
	phoneNumber: {
		allowNull: false,
		type: DataTypes.STRING,
		field: "phone_number"
	},
	userId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: "user_id",
		references: {
			model: USER_TABLE,
			key: "id"
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL"
	}
}

class Customer extends Model {
	static associate(models) {
		this.belongsTo(models.User, {as: "user"});
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: CUSTOMER_TABLE,
			modelName: "Customer",
			timestamps: false
		}
	}
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };