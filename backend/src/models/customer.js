import db from "../config/knex.js";
import pool from "../config/mysql.js";

class Customer {
    constructor({
        customer_id = 0,
        user_name = "",
        password_ = "",
        email = "",
        onl_ = 0,
        status_ = 0,
        created_at = "",
        updated_at = "",
    }) {
        this.customer_id =customer_id;
        this.user_name = user_name;
        this.password_ = password_;
        this.email = email;
        this.onl_ = onl_;
        this.status_ = status_;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static async getAllCustomers() {
        const Customers = await db("Customer_").select("*");
        return Customers.map((Customers) => new Customer(Customers));
    }

    static async getCustomerById(id) {
        const Customer = await db("Customer_").where({ Customer_id: id }).first();
        return new Customer(Customer);
    }

    static async createCustomer(data) {
        return await db("Customer_").insert(data);
    }

    static async updateCustomer(data) {
        const { Customer_id, ...updateData } = data;
        return await db("Customer_")
            .where({ Customer_id: Customer_id })
            .update(updateData);
    }

    static async deleteCustomer(id) {
        return await db("Customer_").where({ Customer_id: id }).del();
    }

    static async isDuplicated(user_name) {
        const user = await db("Customer_").where({ user_name : user_name }).first();
        return !!user;
    }
}

export default Customer;