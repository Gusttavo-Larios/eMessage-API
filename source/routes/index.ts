import { Router } from "express";
import privateRouter from "./private.routes";
import publicRouter from "./public.routes";

const router = Router();

router.use("/", publicRouter);
router.use("/", privateRouter);

export default router;
