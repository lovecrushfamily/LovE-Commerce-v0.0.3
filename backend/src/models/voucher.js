import db from "../config/knex.js";

class voucher {
  constructor({
      voucher_id = 0,
      voucher_name = "",
      discount = null,
      min_amount = null,
      limit = 0,
      delivery_id = 0,
      start_day = "",
      end_day = "",
      created_at = "",
      updated_at = "",
  }) {
    this.voucher_id = voucher_id;
    this.voucher_name = voucher_name;
    this.discount = discount;
    this.min_amount = min_amount;
    this.limit = limit;
    this.delivery_id = delivery_id;
    this.start_day = start_day;
    this.end_day = end_day;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getAll() {
    const rows = await db("voucher").select("*");
    return rows.map((r) => new voucher(r));
  }

  static async getById(id) {
    const row = await db("voucher").where({ voucher_id: id }).first();
    return row ? new voucher(row) : null;
  }

  static async create(data) {
    const { voucher_id, ...insert } = data;
    return db("voucher").insert(insert);
  }

  static async update(data) {
    const { voucher_id, ...update } = data;
    return db("voucher").where({ voucher_id }).update(update);
  }

  static async delete(id) {
    return db("voucher").where({ voucher_id: id }).del();
  }
}

export default voucher;
