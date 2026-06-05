import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import passport from 'passport';

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
export const setup2FA = async () => { }
export const verify2FA = async () => { }
export const reset2FA = async () => { }
