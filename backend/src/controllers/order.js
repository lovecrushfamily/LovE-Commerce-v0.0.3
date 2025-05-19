import Order from "../models/order.js";
import { OrderSchema } from "../schemas/order.js";

// Get all order
export const getAllOrders = async (req, res) => {
    try {
        const data = await Order.getAll();
        if (data.length === 0) {
            return res.status(404).send("No order found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Order.getById(id);
        if (!item) {
            return res.status(404).send("Order not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new order
export const createOrder = async (req, res) => {
    try {
        //const { error } = await OrderSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Order.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing order
export const updateOrder = async (req, res) => {
    try {
        //const { error } = await OrderSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Order.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Order updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Order.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Order not found!");
        }
        return res.status(200).send("Order deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
