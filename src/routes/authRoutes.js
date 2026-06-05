import passport from "passport";
import express from "express";
import {
    register,
    login,
    authStatus,
    logout,
    setup2FA,
    verify2FA,
    reset2FA,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local"), login);
router.get("/status", authStatus);
router.get("/logout", logout);
router.post(
    "/2fa/setup",
    (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.status(401).json({ success: false, message: "Unauthorized" });
    },
    setup2FA,
);
router.post(
    "/2fa/verify",
    (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.status(401).json({ success: false, message: "Unauthorized" });
    },
    verify2FA,
);
router.post(
    "/2fa/reset",
    (req, res, next) => {
        if (req.isAuthenticated()) return next();
        res.status(401).json({ success: false, message: "Unauthorized" });
    },
    reset2FA,
);

export default router;
