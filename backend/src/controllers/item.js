import Item from "../models/item.js";
import { ItemSchema } from "../schemas/item.js";

// Get all item
export const getAllItems = async (req, res) => {
    try {
        const data = await Item.getAll();
        if (data.length === 0) {
            return res.status(404).send("No item found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get item by ID
export const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.getById(id);
        if (!item) {
            return res.status(404).send("Item not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new item
export const createItem = async (req, res) => {
    try {
        //const { error } = await ItemSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Item.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing item
export const updateItem = async (req, res) => {
    try {
        //const { error } = await ItemSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Item.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Item updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete item
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Item.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Item not found!");
        }
        return res.status(200).send("Item deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
