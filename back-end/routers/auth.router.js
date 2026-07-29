import { Router } from 'express';

import {sign_up, sign_in, update_account, delete_account} from "../controllers/auth.controller.js"
const router = Router();

router.post("/sign_up", sign_up)
router.post("/sign_in", sign_in)
router.patch("/update_account/:id", update_account)
router.delete("/delete_account/:id", delete_account)

export default router;