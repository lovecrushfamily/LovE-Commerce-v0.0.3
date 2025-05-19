import Category from "../models/category.js";
import { CategorySchema } from "../schemas/category.js";

// Get all category
export const getAllCategorys = async (req, res) => {
    try {
        const data = await Category.getAll();
        if (data.length === 0) {
            return res.status(404).send("No category found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Category.getById(id);
        if (!item) {
            return res.status(404).send("Category not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new category
export const createCategory = async (req, res) => {
    try {
        //const { error } = await CategorySchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Category.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing category
export const updateCategory = async (req, res) => {
    try {
        //const { error } = await CategorySchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Category.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Category updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Category.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Category not found!");
        }
        return res.status(200).send("Category deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
