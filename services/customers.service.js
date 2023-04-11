const boom = require("@hapi/boom");
const sequelize = require("../libs/sequelize");

class CustomersService {
	getAll(){
		return new Promise(async (resolve, reject) => {
			try {
				const allCustomers = await sequelize.models.Customer.findAll({include: ["user"]});
				resolve(allCustomers);
			} catch (error) {
				reject(error);
			}
		});
	}

	search(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const customerFound = await sequelize.models.Customer.findByPk(Number(givenId));
				if (!customerFound) {
					throw boom.notFound("No se encontró al cliente especificado.");
				} else {
					resolve(customerFound);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	create(givenCustomer){
		return new Promise(async (resolve, reject) => {
			try {
				const newCustomer = await sequelize.models.Customer.create(givenCustomer, {include: ["user"]});
				resolve(newCustomer);
			} catch (error) {
				reject(error);
			}
		});
	}

	delete(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const customerToDelete = await this.search(givenId);
				await customerToDelete.destroy();
				const deletedCustomer = customerToDelete;
				resolve(deletedCustomer);
			} catch (error) {
				reject(error);
			}
		});
	}

	update(givenId, givenUpdate){
		return new Promise(async (resolve, reject) => {
			try {
				const customerToUpdate = await this.search(givenId);
				const updatedCustomer = customerToUpdate.update(givenUpdate);
				resolve(updatedCustomer);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = CustomersService;