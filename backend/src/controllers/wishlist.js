import Wishlist from "../models/wishlist.js";
import { WishlistSchema } from "../schemas/wishlist.js";

// Get all wishlist
export const getAllWishlists = async (req, res) => {
    try {
        const data = await Wishlist.getAll();
        if (data.length === 0) {
            return res.status(404).send("No wishlist found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get wishlist by ID
export const getWishlistById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Wishlist.getById(id);
        if (!item) {
            return res.status(404).send("Wishlist not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new wishlist
export const createWishlist = async (req, res) => {
    try {
        //const { error } = await WishlistSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Wishlist.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing wishlist
export const updateWishlist = async (req, res) => {
    try {
        //const { error } = await WishlistSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Wishlist.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Wishlist updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete wishlist
export const deleteWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Wishlist.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Wishlist not found!");
        }
        return res.status(200).send("Wishlist deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
