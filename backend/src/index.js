import express from "express";

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend is ready...");
});

app.listen(port, () => console.log(`Server is up running on port: ${port}`));