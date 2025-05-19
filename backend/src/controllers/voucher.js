import Voucher from "../models/voucher.js";
import { VoucherSchema } from "../schemas/voucher.js";

// Get all voucher
export const getAllVouchers = async (req, res) => {
    try {
        const data = await Voucher.getAll();
        if (data.length === 0) {
            return res.status(404).send("No voucher found!");
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Get voucher by ID
export const getVoucherById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Voucher.getById(id);
        if (!item) {
            return res.status(404).send("Voucher not exist!");
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
};

// Create new voucher
export const createVoucher = async (req, res) => {
    try {
        //const { error } = await VoucherSchema.validate(req.body);
        //if (error) {
        //    return res.status(400).send(error.details[0].message);
        //}
        const result = await Voucher.create(req.body);
        return res.status(201).send(result);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Update existing voucher
export const updateVoucher = async (req, res) => {
    try {
        //const { error } = await VoucherSchema.validate(req.body);
        //if (error) {
        //   return res.status(400).send(error.details[0].message);
        //}
        const affectedRows = await Voucher.update(req.body);
        if (affectedRows === 0) {
            return res.status(404).send("Not updated successfully!");
        }
        return res.status(200).send("Voucher updated");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

// Delete voucher
export const deleteVoucher = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Voucher.delete(id);
        if (deleted === 0) {
            return res.status(404).send("Voucher not found!");
        }
        return res.status(200).send("Voucher deleted successfully!");
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};
