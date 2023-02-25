const boom = require("@hapi/boom");
const sequelize = require("../libs/sequelize");

class ProductsService {
	getAll(){
		return new Promise(async (resolve, reject) => {
			try {
				const allProducts = await sequelize.models.Product.findAll();
				resolve(allProducts);
			} catch (error) {
				reject(error);
			}
		});
	}

	search(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const productFound = await sequelize.models.Product.findByPk(Number(givenId));
				if (!productFound) {
					throw boom.notFound("No se encontró el producto especificado.");
				} else {
					resolve(productFound);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	create(givenProduct){
		return new Promise(async (resolve, reject) => {
			try {
				const allCategories = await sequelize.models.Category.findAll();
				const categoryFound = allCategories.find(category => category.name === givenProduct.category);
				if (!categoryFound) {
					throw boom.badRequest("La categoría especificada no es válida.");
				}
				const newProduct = await sequelize.models.Product.create(givenProduct);
				resolve(newProduct);
			} catch (error) {
				reject(error);
			}
		});
	}

	delete(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const productToDelete = await this.search(givenId);
				await productToDelete.destroy();
				const deletedProduct = productToDelete;
				resolve(deletedProduct);
			} catch (error) {
				reject(error);
			}
		});
	}

	update(givenId, givenUpdate){
		return new Promise(async (resolve, reject) => {
			try {
				const produtcToUpdate = await this.search(givenId);
				const updatedProduct = produtcToUpdate.update(givenUpdate);
				resolve(updatedProduct);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = ProductsService;