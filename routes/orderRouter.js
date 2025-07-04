// routes/orderRoutes.js
import express from "express";
import paymentSuccess from "../ordercontrol.js";

const router = express.Router();

// POST /api/payment-success
router.post("/payment-success", paymentSuccess);

export default router;
