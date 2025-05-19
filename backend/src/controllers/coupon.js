import Coupon from "../models/coupon.js";
import { CouponSchema } from "../schemas/coupon.js";

// Get all coupon
export const getAllCoupons = async (req, res) => {
    try {
        const data = await Coupon.getAll();
        if (data.length === 0) {
            return res.status(404).send("No coupon found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get coupon by ID
export const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Coupon.getById(id);
        if (!item) {
            return res.status(404).send("Coupon not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new coupon
export const createCoupon = async (req, res) => {
    try {
        //const { error } = await CouponSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Coupon.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing coupon
export const updateCoupon = async (req, res) => {
    try {
        //const { error } = await CouponSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Coupon.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Coupon updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete coupon
export const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Coupon.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Coupon not found!");
        }
        return res.status(200).send("Coupon deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
