const boom = require("@hapi/boom");
const sequelize = require("../libs/sequelize");

class UsersService {
	getAll(){
		return new Promise(async (resolve, reject) => {
			try {
				const allUsers = await sequelize.models.User.findAll();
				resolve(allUsers);
			} catch (error) {
				reject(error);
			}
		});
	}

	search(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const userFound = await sequelize.models.User.findByPk(Number(givenId));
				if (!userFound) {
					throw boom.notFound("No se encontró al usuario especificado.");
				} else {
					resolve(userFound);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	create(givenUser){
		return new Promise(async (resolve, reject) => {
			try {
				const newUser = await sequelize.models.User.create(givenUser);
				resolve(newUser);
			} catch (error) {
				reject(error);
			}
		});
	}

	delete(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const userToDelete = await this.search(givenId);
				await userToDelete.destroy();
				const deletedUser = userToDelete;
				resolve(deletedUser);
			} catch (error) {
				reject(error);
			}
		});
	}

	update(givenId, givenUpdate){
		return new Promise(async (resolve, reject) => {
			try {
				const userToUpdate = await this.search(givenId);
				const updatedUser = userToUpdate.update(givenUpdate);
				resolve(updatedUser);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = UsersService;