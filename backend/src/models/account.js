import db from "../config/knex.js";
import pool from "../config/mysql.js";

class Account {
    constructor({
        account_id = 0,
        user_name = "",
        password_ = "",
        email = "",
        onl_ = 0,
        status_ = 0,
        created_at = "",
        updated_at = "",
    }) {
        this.account_id = account_id;
        this.user_name = user_name;
        this.password_ = password_;
        this.email = email;
        this.onl_ = onl_;
        this.status_ = status_;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static async getAllAccounts() {
        const accounts = await db("Account_").select("*");
        return accounts.map((accounts) => new Account(accounts));
    }

    static async getAccountById(id) {
        const account = await db("Account_").where({ account_id: id }).first();
        return new Account(account);
    }

    static async createAccount(data) {
        const {account_id, ...newData} = data
        return await db("Account_").insert(newData);
    }

    static async updateAccount(data) {
        const { account_id, ...updateData } = data;
        return await db("Account_")
            .where({ account_id: account_id })
            .update(updateData);
    }

    static async deleteAccount(id) {
        return await db("Account_").where({ account_id: id }).del();
    }

    static async isDuplicated(user_name) {
        const user = await db("Account_").where({ user_name : user_name }).first();
        return !!user;
    }
}

export default Account;

// Mysql2 Raw Query

// static async getAllAccounts() {
// const [rows] = await pool.query("Select * from Account_");
// return rows.map(rows => new Account(rows));
// }
