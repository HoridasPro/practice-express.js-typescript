import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();
export const port = config.port;
import { userRouter } from "./modules/user/user_route";
import logger from "./middleware/logger";
import { profileRouter } from "./modules/profile/profile.route";
import config from "./config/env";
import { authRouter } from "./modules/auth/auth.route";

// Middle ware
app.use(express.json());
app.use(logger);

// Check data
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is express js",
    author: "Next Level",
  });
});

// get all data from db
app.use("/api/users", userRouter);

// create data
app.use("/api/users", userRouter);

// Get only one data
app.use("/api/users/:id", userRouter);

// Delete data
app.use("/api/users/:id", userRouter);

// Update data
app.use("/api/users/:id", userRouter);

// Create Profile
app.use("/api/profile", profileRouter);

// Create Login
app.use("/api/auth", authRouter);

export default app;
