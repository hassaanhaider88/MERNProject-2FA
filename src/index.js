import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import connectDB from './config/dbConnection.js';
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: ["http://localhost:3001"],
    // origin: "*",
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Increase the limit to 10mb
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
    res.json({ success: true, message: '2 FA Auth Server is running' });
});

app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})