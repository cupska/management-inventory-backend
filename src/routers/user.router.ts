import { Router } from "express";

const userRouter = Router();
userRouter.post("/check/:username");

export default userRouter;
