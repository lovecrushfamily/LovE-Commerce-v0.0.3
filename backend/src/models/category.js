import db from "../config/knex.js";

class category {
  constructor({
      category_id = 0,
      category_name = "",
      parent_id = 0,
      traits = "",
      description = "",
      created_at = "",
      updated_at = "",
  }) {
    this.category_id = category_id;
    this.category_name = category_name;
    this.parent_id = parent_id;
    this.traits = traits;
    this.description = description;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getAll() {
    const rows = await db("category").select("*");
    return rows.map((r) => new category(r));
  }

  static async getById(id) {
    const row = await db("category").where({ category_id: id }).first();
    return row ? new category(row) : null;
  }

  static async create(data) {
    const { category_id, ...insert } = data;
    return db("category").insert(insert);
  }

  static async update(data) {
    const { category_id, ...update } = data;
    return db("category").where({ category_id }).update(update);
  }

  static async delete(id) {
    return db("category").where({ category_id: id }).del();
  }
}

export default category;
