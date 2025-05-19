import db from "../config/knex.js";

class feedback {
  constructor({
      account_id = 0,
      rating = false,
      content = "",
      created_at = "",
  }) {
    this.account_id = account_id;
    this.rating = rating;
    this.content = content;
    this.created_at = created_at;
  }

  static async getAll() {
    const rows = await db("feedback").select("*");
    return rows.map((r) => new feedback(r));
  }

  static async getById(id) {
    const row = await db("feedback").where({ account_id: id }).first();
    return row ? new feedback(row) : null;
  }

  static async create(data) {
    const { account_id, ...insert } = data;
    return db("feedback").insert(data);
  }

  static async update(data) {
    const { account_id, ...update } = data;
    return db("feedback").where({ account_id }).update(update);
  }

  static async delete(id) {
    return db("feedback").where({ account_id: id }).del();
  }
}

export default feedback;
