import db from "../config/knex.js";

class review {
  constructor({
      review_id = 0,
      product_id = 0,
      customer_id = 0,
      rating = 0,
      comment = "",
      liked = false,
      images = "",
      shop_reply = "",
      created_at = "",
      updated_at = "",
  }) {
    this.review_id = review_id;
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
    const row = await db("review")
      .where({ review_id: id })
      .first();
    return row ? new review(row) : null;
  }

  static async getByProductId(productId) {
    const rows = await db("review")
      .where({ product_id: productId })
      .select("*");
    return rows.map((r) => new review(r));
  }

  static async create(data) {
    const [id] = await db("review").insert(data);
    const created = await db("review")
      .where({ product_id: data.product_id, customer_id: data.customer_id })
      .first();
    return new review(created);
  }

  static async update(data) {
    const { product_id, customer_id, ...update } = data;
    return db("review")
      .where({ product_id, customer_id })
      .update(update);
  }

  static async delete(id) {
    return db("review")
      .where({ review_id: id })
      .del();
  }
}

export default review;
