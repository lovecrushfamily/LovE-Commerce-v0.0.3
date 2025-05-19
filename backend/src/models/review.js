import db from "../config/knex.js";

class review {
  constructor({
      product_id = 0,
      customer_id = 0,
      rating = false,
      comment = "",
      liked = false,
      images = "",
      shop_reply = "",
      created_at = "",
      updated_at = "",
  }) {
    this.product_id = product_id;
    this.customer_id = customer_id;
    this.rating = rating;
    this.comment = comment;
    this.liked = liked;
    this.images = images;
    this.shop_reply = shop_reply;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getAll() {
    const rows = await db("review").select("*");
    return rows.map((r) => new review(r));
  }

  static async getById(id) {
    const row = await db("review").where({ product_id: id }).first();
    return row ? new review(row) : null;
  }

  static async create(data) {
    const { product_id, ...insert } = data;
    return db("review").insert(data);
  }

  static async update(data) {
    const { product_id, ...update } = data;
    return db("review").where({ product_id }).update(update);
  }

  static async delete(id) {
    return db("review").where({ product_id: id }).del();
  }
}

export default review;
