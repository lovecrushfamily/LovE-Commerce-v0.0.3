import db from "../config/knex.js";

class product {
  constructor({
      product_id = 0,
      product_name = "",
      description = "",
      traits = "",
      stock = 0,
      sale_off = null,
      price = null,
      images = "",
      status = "",
      rating = null,
      category_id = 0,
      shop_id = 0,
      created_at = "",
      updated_at = "",
  }) {
    this.product_id = product_id;
    this.product_name = product_name;
    this.description = description;
    this.traits = traits;
    this.stock = stock;
    this.sale_off = sale_off;
    this.price = price;
    this.images = images;
    this.status = status;
    this.rating = rating;
    this.category_id = category_id;
    this.shop_id = shop_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getAll() {
    const rows = await db("product").select("*");
    return rows.map((r) => new product(r));
  }

  static async getById(id) {
    const row = await db("product").where({ product_id: id }).first();
    return row ? new product(row) : null;
  }

  static async create(data) {
    const { product_id, ...insert } = data;
    return db("product").insert(insert);
  }

  static async update(data) {
    const { product_id, ...update } = data;
    return db("product").where({ product_id }).update(update);
  }

  static async delete(id) {
    return db("product").where({ product_id: id }).del();
  }
}

export default product;
