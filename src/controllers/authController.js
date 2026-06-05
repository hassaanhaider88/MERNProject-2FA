import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import passport from 'passport';
import speakeasy from 'speakeasy';
import qrcode from "qrcode"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    console.log(req.body)
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Provide All Fields"
            })
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPass
        })
        if (!newUser) {
            return res.status(500).json({
                success: false,
                message: "Something Went's wrong.."
            })
        }

        return res.status(201).json({
            success: true,
            message: "Register Successfully",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error While Registering ${error.message}`
        })
    }
}
export const login = async (req, res) => {
    try {
        console.log("the Authenticated User", req.user);
        res.status(201).json({
            success: true,
            message: "user loggedIn",
            data: req.user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}
export const logout = async (req, res) => {
    try {
        console.log(req.user)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "user UnAuthorized",
            })
        }
        req.logout((err) => {
            if (err) return res.status(40).json({ success: false, message: "user not logged In" })
            res.status(200).json({
                success: true,
                message: "logout Successfully"
            })
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const authStatus = async (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({
                success: true,
                message: "User logged In Successfully",
                username: req.user.username,
                is2FAActive: req.user.is2FAEnabled
            })
        } else {
            res.status(401).json({
                success: false,
                message: "User Unauthorized"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const setup2FA = async (req, res) => {
    try {
        const user = req.user;
        const secret = speakeasy.generateSecret();
        user.towFactorSecret = secret.base32;
        user.is2FAEnabled = true;
        await user.save();
        const url = speakeasy.otpauthURL({
            secret: secret.base32,
            label: `${req.user.username}`,
            issuer: "Hassaam.come",
            encoding: "base32"
        })
        const qrImgUrl = await qrcode.toDataURL(url);
        res.json({ success: true, message: "Setup done", qrcode: qrImgUrl })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verify2FA = async (req, res) => {
    try {
        const { token } = req.body;
        const user = req.user;
        const verified = speakeasy.totp.verify({
            secret: user.towFactorSecret,
            encoding: "base32",
            token,
        });
        if (verified) {
            const jwtToken = jwt.sign({ username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "1d" })

            res.status(200).json({
                success: true,
                message: "2 FA Successfully Added",
                token: jwtToken
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: "Providing Invalid OTP"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const reset2FA = async (req, res) => {
    try {
        const user = req.user;
        user.towFactorSecret = "",
            user.is2FAEnabled = false;
        await user.save();
        res.status(200).json({
            success: true,
            message: "disabled 2 FA done"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
