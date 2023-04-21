const boom = require("@hapi/boom");
const sequelize = require("../libs/sequelize");

class CategoriesService {
	getAll(){
		return new Promise(async (resolve, reject) => {
			try {
				const allCategories = await sequelize.models.Category.findAll();
				resolve(allCategories);
			} catch (error) {
				reject(error);
			}
		});
	}

	search(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const categoryFound = await sequelize.models.Category.findByPk(Number(givenId));
				if (!categoryFound) {
					throw boom.notFound("No se encontró la categoría especificada.");
				} else {
					const categoryProducts = await sequelize.models.Product.findAll({where:{category: categoryFound.name}});
					const categoryWithProducts = { ...categoryFound.toJSON(), products: categoryProducts.map(x => x.toJSON()) };
					resolve(categoryWithProducts);
				}
			} catch (error) {
				reject(error);
			}
		});
	}

	getProducts(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const category = await this.search(givenId);
				const allProducts = await sequelize.models.Product.findAll();
				const categoryProducts = allProducts.filter(product => product.category === category.name);
				resolve(categoryProducts);
			} catch (error) {
				reject(error);
			}
		});
	}

	searchProduct(categoryId, productId){
		return new Promise(async (resolve, reject) => {
			try {
				const categoryProducts = await this.getProducts(categoryId);
				const productFound = categoryProducts.find(product => product.id === Number(productId));
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

	create(givenCategory){
		return new Promise(async (resolve, reject) => {
			try {
				const newCategory = await sequelize.models.Category.create(givenCategory);
				resolve(newCategory);
			} catch (error) {
				reject(error);
			}
		});
	}

	delete(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const categoryToDelete = await this.search(givenId);
				await categoryToDelete.destroy();
				const deletedCategory = categoryToDelete;
				resolve(deletedCategory);
			} catch (error) {
				reject(error);
			}
		});
	}

	update(givenId, givenUpdate){
		return new Promise(async (resolve, reject) => {
			try {
				const categoryToUpdate = await this.search(givenId);
				const updatedCategory = categoryToUpdate.update(givenUpdate);
				resolve(updatedCategory);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = CategoriesService;