import db from "../config/knex.js";

class account {
  constructor({
      account_id = 0,
      user_name = "",
      password = "",
      email = "",
      online = "",
      status = "",
      created_at = "",
      updated_at = "",
  }) {
    this.account_id = account_id;
    this.user_name = user_name;
    this.password = password;
    this.email = email;
    this.online = online;
    this.status = status;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async getAll() {
    const rows = await db("account").select("*");
    return rows.map((r) => new account(r));
  }

  static async getById(id) {
    const row = await db("account").where({ account_id: id }).first();
    return row ? new account(row) : null;
  }

  static async create(data) {
    const { account_id, ...insert } = data;
    return db("account").insert(insert);
  }

  static async update(data) {
    const { account_id, ...update } = data;
    return db("account").where({ account_id }).update(update);
  }

  static async delete(id) {
    return db("account").where({ account_id: id }).del();
  }
}

export default account;
