// Stanrdized response function

import { createTrashcanService, deleteTrashcanService, getAllTrashcansService, getTrashcanByTrashcanIdService } from "../models/trashcanModel.js";
import errorHandling from "../middlewares/errorHandler.js";
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createTrashcan = async (req, res, next) => {
    const {trashcan_id, is_full, date_time} = req.body;
    try {
        const newTrashcan = await createTrashcanService(trashcan_id, is_full, date_time);
        handleResponse(res, 201, "Trashcan created", newTrashcan);
    } catch (err) {
        next(err);
    }
};

export const getAllTrashcans = async (req, res, next) => {
    try {
        const trashcans = await getAllTrashcansService();
        handleResponse(res, 200, "Trashcans fetched", trashcans);
    } catch (err) {
        next(err);
    }
};

export const getTrashcanByTrashcanId = async (req, res, next) => {
    try {
        const trashcan = await getTrashcanByTrashcanIdService(req.params.trashcan_id);
        if (!trashcan) return handleResponse(res, 404, "Trashcan not found");
            handleResponse(res, 200, "Trashcan fetched", trashcans);
    } catch (err) {
        next(err);
    }
};

export const deleteTrashcan = async (req, res, next) => {
    try {
        const trashcan = await deleteTrashcanService(req.params.trashcan_id);
        if (!trashcan) return handleResponse(res, 404, "Trashcan not found");
        handleResponse(res, 200, "Trashcan deleted", deleteTrashcan);
    } catch (err) {
        next(err);
    }
};