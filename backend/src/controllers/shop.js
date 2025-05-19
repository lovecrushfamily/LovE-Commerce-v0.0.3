import Shop from "../models/shop.js";
import { ShopSchema } from "../schemas/shop.js";

// Get all shop
export const getAllShops = async (req, res) => {
    try {
        const data = await Shop.getAll();
        if (data.length === 0) {
            return res.status(404).send("No shop found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get shop by ID
export const getShopById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Shop.getById(id);
        if (!item) {
            return res.status(404).send("Shop not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new shop
export const createShop = async (req, res) => {
    try {
        //const { error } = await ShopSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Shop.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing shop
export const updateShop = async (req, res) => {
    try {
        //const { error } = await ShopSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Shop.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Shop updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete shop
export const deleteShop = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Shop.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Shop not found!");
        }
        return res.status(200).send("Shop deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
