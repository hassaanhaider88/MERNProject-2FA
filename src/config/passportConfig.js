import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user) return done(null, false, { message: "User not found" })
            const isMatchPass = await bcrypt.compare(password, user.password)
            if (isMatchPass) {
                return done(null, user)
            } else {
                return done(null, false, { message: "incorrect Credentials" })
            }
        } catch (error) {
            return done(error)
        }
    }
))

passport.serializeUser((user, done) => {
    console.log("we are in Serialize User")
    done(null, user._id)
})

passport.deserializeUser(async (_id, done) => {
    try {
        console.log("we are in DeserializeUser");
        const user = await User.findById(_id);
        done(null, user)
    } catch (error) {
        done(error)
    }
})