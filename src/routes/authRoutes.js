import passport from 'passport';
import express from 'express';
import {
    register,
    login,
    authStatus,
    logout,
    setup2FA,
    verify2FA,
    reset2FA
} from "../controllers/authController.js"

const router = express.Router();

router.post("/register", register)
router.post("/login", passport.authenticate("local"), login)
router.get("/status", authStatus);
router.get("/logout", logout)
router.post("/2fa/setup", setup2FA);
router.post("/2fa/verify", verify2FA);
router.post("/2fa/reset", reset2FA);
router.post("/2fa/reset", reset2FA);

export default router;