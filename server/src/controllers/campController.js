import {
  getAllCamps,
  getCampById,
  createCamp,
  updateCampById,
  deleteCampById,
} from "../models/campModel.js";
import { asyncHandler } from "../middleware/asyncHandlerMiddleware.js";

// Get all camps
export const getAllCampsController = asyncHandler(async (req, res) => {
  const camps = await getAllCamps();
  if (camps.length === 0) {
    return res.status(200).json({ message: "No camps found", camps: [] });
  }
  return res.status(200).json(camps);
});
// Get camp by ID
export const getCampByIdController = asyncHandler(async (req, res) => {
  const camp = await getCampById(req.params.id);
  if (!camp) {
    return res.status(404).json({ message: "Camp not found" });
  }
  return res.status(200).json(camp);
});
// Create new camp
export const createCampController = asyncHandler(async (req, res) => {
  const newCamp = await createCamp(req.body);
  return res.status(201).json(newCamp);
});
// Update camp by ID
export const updateCampByIdController = asyncHandler(async (req, res) => {
  const updatedCamp = await updateCampById(req.params.id, req.body);
  if (!updatedCamp) {
    return res.status(404).json({ message: "Camp not found" });
  }
  return res.status(200).json(updatedCamp);
});
// Delete camp by ID
export const deleteCampByIdController = asyncHandler(async (req, res) => {
  const deletedCamp = await deleteCampById(req.params.id);
  if (!deletedCamp) {
    return res.status(404).json({ message: "Camp not found" });
  }
  return res.status(200).json({ message: "Camp deleted successfully" });
});