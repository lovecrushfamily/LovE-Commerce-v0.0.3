import db from "../config/knex.js";

class delivery {
  constructor({
      delivery_id = 0,
      name = "",
      cost = null,
      category_id = 0,
      description = "",
      created_at = "",
      updated_at = "",
  }) {
    this.delivery_id = delivery_id;
    this.name = name;
    this.cost = cost;
    this.category_id = category_id;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getAll() {
    const rows = await db("delivery").select("*");
    return rows.map((r) => new delivery(r));
  }

  static async getById(id) {
    const row = await db("delivery").where({ delivery_id: id }).first();
    return row ? new delivery(row) : null;
  }

  static async create(data) {
    const { delivery_id, ...insert } = data;
    return db("delivery").insert(insert);
  }

  static async update(data) {
    const { delivery_id, ...update } = data;
    return db("delivery").where({ delivery_id }).update(update);
  }

  static async delete(id) {
    return db("delivery").where({ delivery_id: id }).del();
  }
}

export default delivery;
