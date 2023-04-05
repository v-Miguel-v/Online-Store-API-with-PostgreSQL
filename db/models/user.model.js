const { Model, DataTypes } = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
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
	age: {
		allowNull: false,
		type: DataTypes.INTEGER
	},
	role: {
		allowNull: false,
		type: DataTypes.STRING,
		defaultValue: "customer"
	}
}

class User extends Model {
	static associate() {
		// para más tarde.
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: USER_TABLE,
			modelName: "User",
			timestamps: false
		}
	}
}

module.exports = { USER_TABLE, UserSchema, User };