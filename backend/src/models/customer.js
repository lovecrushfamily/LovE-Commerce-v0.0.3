import db from "../config/knex.js";

class customer {
    constructor({
        customer_id = 0,
        customer_name = "",
        gender = "",
        phone = "",
        avatar = "",
        date_of_birth = "",
        nationality = "",
        address = "",
        created_at = "",
        updated_at = "",
    }) {
        this.customer_id = customer_id;
        this.customer_name = customer_name;
        this.gender = gender;
        this.phone = phone;
        this.avatar = avatar;
        this.date_of_birth = date_of_birth;
        this.nationality = nationality;
        this.address = address;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static async getAll() {
        const rows = await db("customer").select("*");
        return rows.map((r) => new customer(r));
    }

    static async getById(id) {
        const row = await db("customer").where({ customer_id: id }).first();
        return row ? new customer(row) : null;
    }

    static async create(data) {
        const { customer_id, ...insert } = data;
        return db("customer").insert(data);           // My bug. SOrry
    }

    static async update(data) {
        const { customer_id, ...update } = data;
        return db("customer").where({ customer_id }).update(update);
    }

    static async delete(id) {
        return db("customer").where({ customer_id: id }).del();
    }
}

export default customer;
