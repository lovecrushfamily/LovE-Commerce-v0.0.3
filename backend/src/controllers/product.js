import Product from "../models/product.js";
import { ProductSchema } from "../schemas/product.js";

// Get all product
export const getAllProducts = async (req, res) => {
    try {
        const data = await Product.getAll();
        if (data.length === 0) {
            return res.status(404).send("No product found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Product.getById(id);
        if (!item) {
            return res.status(404).send("Product not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new product
export const createProduct = async (req, res) => {
    try {
        //const { error } = await ProductSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Product.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing product
export const updateProduct = async (req, res) => {
    try {
        //const { error } = await ProductSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Product.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Product updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Product not found!");
        }
        return res.status(200).send("Product deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
