import express from "express";
import {
  getAllCampsController,
  getCampByIdController,
  createCampController,
  updateCampByIdController,
  deleteCampByIdController,
} from "../controllers/campController.js";
import {protect} from "../middleware/protectMiddleware.js";
import {adminOnly} from "../middleware/adminOnlyMiddleware.js";

const router = express.Router();

router.get("/all", getAllCampsController);

router.get("/:id", protect, getCampByIdController);

router.post("/create", protect, adminOnly, createCampController);

router.put("/update/:id", protect, adminOnly, updateCampByIdController);

router.delete("/delete/:id", protect, adminOnly, deleteCampByIdController);

export default router;