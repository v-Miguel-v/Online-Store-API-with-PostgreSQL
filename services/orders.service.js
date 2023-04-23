const boom = require("@hapi/boom");
const sequelize = require("../libs/sequelize");

class OrdersService {
	getAll(){
		return new Promise(async (resolve, reject) => {
			try {
				const allOrders = await sequelize.models.Order.findAll({include: ["customer"]});
				resolve(allOrders);
			} catch (error) {
				reject(error);
			}
		});
	}

	search(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const orderFound = await sequelize.models.Order.findByPk(Number(givenId), {include: ["customer"]});
				if (!orderFound) {
					throw boom.notFound("No se encontró la orden especificada.");
				} else {
					resolve(orderFound);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	create(givenOrder){
		return new Promise(async (resolve, reject) => {
			try {
				const newOrder = await sequelize.models.Order.create(givenOrder);
				resolve(newOrder);
			} catch (error) {
				reject(error);
			}
		});
	}

	delete(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const orderToDelete = await this.search(givenId);
				await orderToDelete.destroy();
				const deletedOrder = orderToDelete;
				resolve(deletedOrder);
			} catch (error) {
				reject(error);
			}
		});
	}

	update(givenId, givenUpdate){
		return new Promise(async (resolve, reject) => {
			try {
				const orderToUpdate = await this.search(givenId);
				const updatedOrder = orderToUpdate.update(givenUpdate);
				resolve(updatedOrder);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = OrdersService;