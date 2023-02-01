import Dexie from "dexie";

export default class Repository {
  constructor() {
    this.dbVersion = 1;
    this.dbName = "TastyStuff";

    this.db = new Dexie(this.dbName);
    this.db.version(this.dbVersion).stores({
      products: "++id,name",
      dishes: "++id,name,products",
    });

    this.products = this.db.products;
    this.dishes = this.db.dishes;

    this.getAllProducts = this.getAllProducts.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  getAllProducts() {
    return this.products.toArray();
  }

  async addProduct(name) {
    await this.products.add({ name });
  }

  async deleteProduct(id) {
    await this.products.delete(id);
  }

  async updateProduct(id, name) {
    await this.products.update(id, { name });
  }
}
