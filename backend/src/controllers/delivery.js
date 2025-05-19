import Delivery from "../models/delivery.js";
import { DeliverySchema } from "../schemas/delivery.js";

// Get all delivery
export const getAllDeliverys = async (req, res) => {
    try {
        const data = await Delivery.getAll();
        if (data.length === 0) {
            return res.status(404).send("No delivery found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get delivery by ID
export const getDeliveryById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Delivery.getById(id);
        if (!item) {
            return res.status(404).send("Delivery not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new delivery
export const createDelivery = async (req, res) => {
    try {
        //const { error } = await DeliverySchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Delivery.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing delivery
export const updateDelivery = async (req, res) => {
    try {
        //const { error } = await DeliverySchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Delivery.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Delivery updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete delivery
export const deleteDelivery = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Delivery.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Delivery not found!");
        }
        return res.status(200).send("Delivery deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
