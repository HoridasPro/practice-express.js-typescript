import type { Request, Response } from "express";
import { loginService } from "./auth.service";

const createLogin = async (req: Request, res: Response) => {
  try {
    const result = await loginService.createLoginIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "profile created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};
export const authController = {
  createLogin,
};
