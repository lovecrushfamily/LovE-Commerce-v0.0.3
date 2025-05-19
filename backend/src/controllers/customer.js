import Customer from "../models/customer.js";
import { CustomerSchema } from "../schemas/customer.js";

// Get all customer
export const getAllCustomers = async (req, res) => {
    try {
        const data = await Customer.getAll();
        if (data.length === 0) {
            return res.status(404).send("No customer found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get customer by ID
export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Customer.getById(id);
        if (!item) {
            return res.status(404).send("Customer not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new customer
export const createCustomer = async (req, res) => {
    try {
        //const { error } = await CustomerSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Customer.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing customer
export const updateCustomer = async (req, res) => {
    try {
        //const { error } = await CustomerSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Customer.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Customer updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete customer
export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Customer.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Customer not found!");
        }
        return res.status(200).send("Customer deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
