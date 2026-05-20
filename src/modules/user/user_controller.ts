import type { Request, Response } from "express";
import { createService } from "./user_service";

// all get data
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await createService.getAllUsersDataFromDB();
    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "User retried succssfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// create post
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await createService.createUserIntoDB(req.body);
    res.status(201).json({
      message: "Data created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// get single data
const getSingleData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await createService.getSingleData(id as string);

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "User not found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "Data retrieved Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// Delete data
const deleteData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await createService.deleteDataFromDB(id as string);
    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "Data is not deleted",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// Update data
const updateData = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await createService.updateDataFromDB(req.body, id as string);

    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "Update does not  successfully",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Update data successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

// all founction
export const userController = {
  createUser,
  getAllUsers,
  getSingleData,
  deleteData,
  updateData,
};
