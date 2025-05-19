import Feedback from "../models/feedback.js";
import { FeedbackSchema } from "../schemas/feedback.js";

// Get all feedback
export const getAllFeedbacks = async (req, res) => {
    try {
        const data = await Feedback.getAll();
        if (data.length === 0) {
            return res.status(404).send("No feedback found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Feedback.getById(id);
        if (!item) {
            return res.status(404).send("Feedback not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new feedback
export const createFeedback = async (req, res) => {
    try {
        //const { error } = await FeedbackSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Feedback.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing feedback
export const updateFeedback = async (req, res) => {
    try {
        //const { error } = await FeedbackSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Feedback.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Feedback updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Feedback.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Feedback not found!");
        }
        return res.status(200).send("Feedback deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
