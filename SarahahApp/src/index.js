import express from "express";
import dbConnection from "./DataBase/dbconnection.js";
import userController from "./users/user.controller.js";
const port = 3001;
const app = express();

app.use(express.json())

dbConnection();
app.use("/users", userController);
app.get("/", (req, res) => {
    res.send("Welcome to Saraha App API");
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal Server Error index", error: err.message });
})

app.use((req, res) => {
    res.status(404).send("Sorry Page Not Found");
})
app.listen(port, () => console.log(`server is running on port ${port}`));