import express from "express"
import { createTrashcan, deleteTrashcan, getAllTrashcans, getTrashcanByTrashcanId } from "../controllers/trashcanController.js";

const router = express.Router();

router.get("/trashcan", getAllTrashcans);
router.get("/trashcan/:id", getTrashcanByTrashcanId);
router.post("/trashcan", createTrashcan);
router.delete("/trashcan/:id", deleteTrashcan);

export default router;