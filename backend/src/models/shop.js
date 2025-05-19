import db from "../config/knex.js";

class shop {
  constructor({
      shop_id = 0,
      shop_name = "",
      description = "",
      address = "",
      phone_no = "",
      image = "",
      rating = null,
      status = "",
      created_at = "",
      updated_at = "",
      seller_id = 0,
  }) {
    this.shop_id = shop_id;
    this.shop_name = shop_name;
    this.description = description;
    this.address = address;
    this.phone_no = phone_no;
    this.image = image;
    this.rating = rating;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.seller_id = seller_id;
  }

  static async getAll() {
    const rows = await db("shop").select("*");
    return rows.map((r) => new shop(r));
  }

  static async getById(id) {
    const row = await db("shop").where({ shop_id: id }).first();
    return row ? new shop(row) : null;
  }

  static async create(data) {
    const { shop_id, ...insert } = data;
    return db("shop").insert(insert);
  }

  static async update(data) {
    const { shop_id, ...update } = data;
    return db("shop").where({ shop_id }).update(update);
  }

  static async delete(id) {
    return db("shop").where({ shop_id: id }).del();
  }
}

export default shop;
