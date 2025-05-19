import db from "../config/knex.js";

class item {
  constructor({
      item_id = 0,
      product_id = 0,
      order_id = 0,
      delivery_id = 0,
      quantity = 0,
      price = null,
      status = "",
      discount = null,
      payment = "",
      note = "",
  }) {
    this.item_id = item_id;
    this.product_id = product_id;
    this.order_id = order_id;
    this.delivery_id = delivery_id;
    this.quantity = quantity;
    this.price = price;
    this.status = status;
    this.discount = discount;
    this.payment = payment;
    this.note = note;
  }

  static async getAll() {
    const rows = await db("item").select("*");
    return rows.map((r) => new item(r));
  }

  static async getById(id) {
    const row = await db("item").where({ item_id: id }).first();
    return row ? new item(row) : null;
  }

  static async create(data) {
    const { item_id, ...insert } = data;
    return db("item").insert(insert);
  }

  static async update(data) {
    const { item_id, ...update } = data;
    return db("item").where({ item_id }).update(update);
  }

  static async delete(id) {
    return db("item").where({ item_id: id }).del();
  }
}

export default item;
