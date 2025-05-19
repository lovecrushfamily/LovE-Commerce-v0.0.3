import db from "../config/knex.js";

class order {
  constructor({
      order_id = 0,
      account_id = 0,
      total_amount = null,
      status = "",
      address = "",
      payment = "",
      coupon_id = 0,
      created_at = "",
      updated_at = "",
  }) {
    this.order_id = order_id;
    this.account_id = account_id;
    this.total_amount = total_amount;
    this.status = status;
    this.address = address;
    this.payment = payment;
    this.coupon_id = coupon_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getAll() {
    const rows = await db("order").select("*");
    return rows.map((r) => new order(r));
  }

  static async getById(id) {
    const row = await db("order").where({ order_id: id }).first();
    return row ? new order(row) : null;
  }

  static async create(data) {
    const { order_id, ...insert } = data;
    return db("order").insert(insert);
  }

  static async update(data) {
    const { order_id, ...update } = data;
    return db("order").where({ order_id }).update(update);
  }

  static async delete(id) {
    return db("order").where({ order_id: id }).del();
  }
}

export default order;
