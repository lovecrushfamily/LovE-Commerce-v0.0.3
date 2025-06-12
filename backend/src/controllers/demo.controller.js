// Demo controller with basic CRUD operations
const Demo = require('../models/demo.model');

// Get all demos
exports.getAllDemos = async (req, res) => {
    try {
        const demos = await Demo.find();
        res.status(200).json({
            success: true,
            data: demos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching demos',
            error: error.message
        });
    }
};

// Get demo by ID
exports.getDemoById = async (req, res) => {
    try {
        const demo = await Demo.findById(req.params.id);
        if (!demo) {
            return res.status(404).json({
                success: false,
                message: 'Demo not found'
            });
        }
        res.status(200).json({
            success: true,
            data: demo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching demo',
            error: error.message
        });
    }
};

// Create new demo
exports.createDemo = async (req, res) => {
    try {
        const demo = await Demo.create(req.body);
        res.status(201).json({
            success: true,
            data: demo
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating demo',
            error: error.message
        });
    }
};

// Update demo
exports.updateDemo = async (req, res) => {
    try {
        const demo = await Demo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!demo) {
            return res.status(404).json({
                success: false,
                message: 'Demo not found'
            });
        }
        res.status(200).json({
            success: true,
            data: demo
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating demo',
            error: error.message
        });
    }
};

// Delete demo
exports.deleteDemo = async (req, res) => {
    try {
        const demo = await Demo.findByIdAndDelete(req.params.id);
        if (!demo) {
            return res.status(404).json({
                success: false,
                message: 'Demo not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting demo',
            error: error.message
        });
    }
}; 