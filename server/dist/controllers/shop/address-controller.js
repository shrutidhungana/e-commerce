"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.editAddress = exports.fetchAllAddress = exports.addAddress = void 0;
const Address_1 = __importDefault(require("../../modals/Address"));
const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;
        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }
        const newlyCreatedAddress = new Address_1.default({
            userId,
            address,
            city,
            pincode,
            notes,
            phone,
        });
        await newlyCreatedAddress.save();
        res.status(201).json({
            success: true,
            data: newlyCreatedAddress,
            message: "Address is added successfully",
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.addAddress = addAddress;
const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required!",
            });
        }
        const addressList = await Address_1.default.find({ userId });
        res.status(200).json({
            success: true,
            data: addressList,
            message: "List of Addresses fetched Successfully",
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.fetchAllAddress = fetchAllAddress;
const editAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User and address id is required!",
            });
        }
        const address = await Address_1.default.findOneAndUpdate({
            _id: addressId,
            userId,
        }, formData, { new: true });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }
        res.status(200).json({
            success: true,
            data: address,
            message: "Address is updated successfully.",
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.editAddress = editAddress;
const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "User and address id is required!",
            });
        }
        const address = await Address_1.default.findOneAndDelete({ _id: addressId, userId });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Address is deleted successfully.",
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
exports.deleteAddress = deleteAddress;
