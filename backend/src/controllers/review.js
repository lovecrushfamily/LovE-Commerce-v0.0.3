import Review from "../models/review.js";
import { ReviewSchema } from "../schemas/review.js";

// Get all review
export const getAllReviews = async (req, res) => {
    try {
        const data = await Review.getAll();
        if (data.length === 0) {
            return res.status(404).send("No review found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get review by ID
export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Review.getById(id);
        if (!item) {
            return res.status(404).send("Review not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new review
export const createReview = async (req, res) => {
    try {
        //const { error } = await ReviewSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Review.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing review
export const updateReview = async (req, res) => {
    try {
        //const { error } = await ReviewSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Review.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Review updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete review
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Review.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Review not found!");
        }
        return res.status(200).send("Review deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
