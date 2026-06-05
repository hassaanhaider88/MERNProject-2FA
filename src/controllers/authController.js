import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';

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
    console.log(req.body);
    res.send("working")
}
export const logout = async () => { }
export const authStatus = async () => { }
export const setup2FA = async () => { }
export const verify2FA = async () => { }
export const reset2FA = async () => { }
