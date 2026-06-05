import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


// Middleware
app.use(express.json({limit : '10mb'})); // Increase the limit to 10mb
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})