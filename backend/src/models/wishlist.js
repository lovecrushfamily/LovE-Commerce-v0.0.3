import db from "../config/knex.js";

class wishlist {
  constructor({
      customer_id = 0,
      product_id = 0,
      quantity = 0,
      created_at = "",
      updated_at = "",
  }) {
    this.customer_id = customer_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getAll() {
    const rows = await db("wishlist").select("*");
    return rows.map((r) => new wishlist(r));
  }

  static async getById(id) {
    const row = await db("wishlist").where({ customer_id: id }).first();
    return row ? new wishlist(row) : null;
  }

  static async create(data) {
    const { customer_id, ...insert } = data;
    return db("wishlist").insert(data);
  }

  static async update(data) {
    const { customer_id, ...update } = data;
    return db("wishlist").where({ customer_id }).update(update);
  }

  static async delete(id) {
    return db("wishlist").where({ customer_id: id }).del();
  }
}

export default wishlist;
