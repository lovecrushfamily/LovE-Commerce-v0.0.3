import db from "../config/knex.js";

class coupon {
  constructor({
      coupon_id = 0,
      coupon_name = "",
      discount = null,
      min_amount = null,
      max_amount = null,
      limit = 0,
      image = "",
      start_day = "",
      end_day = "",
      created_at = "",
      updated_at = "",
  }) {
    this.coupon_id = coupon_id;
    this.coupon_name = coupon_name;
    this.discount = discount;
    this.min_amount = min_amount;
    this.max_amount = max_amount;
    this.limit = limit;
    this.image = image;
    this.start_day = start_day;
    this.end_day = end_day;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getAll() {
    const rows = await db("coupon").select("*");
    return rows.map((r) => new coupon(r));
  }

  static async getById(id) {
    const row = await db("coupon").where({ coupon_id: id }).first();
    return row ? new coupon(row) : null;
  }

  static async create(data) {
    const { coupon_id, ...insert } = data;
    return db("coupon").insert(insert);
  }

  static async update(data) {
    const { coupon_id, ...update } = data;
    return db("coupon").where({ coupon_id }).update(update);
  }

  static async delete(id) {
    return db("coupon").where({ coupon_id: id }).del();
  }
}

export default coupon;
