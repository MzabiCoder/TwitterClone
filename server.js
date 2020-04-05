const express = require("express");
const app = express();
const cors = require("cors");
const DBconnection = require('./config/db')
const Tweet = require('./Models/Tweet')

app.use(cors());
DBconnection()
app.use(express.json());
const isValid = (tweet) => {
    return (
        tweet.name &&
        tweet.name.toString() !== "" &&
        tweet.content &&
        tweet.content.toString() !== ""
    );
};
app.get("/", (req, res) => {
    const {
        name,
        content
    } = req.boy;
    if (isValid(req.body)) {
        const newTweet = {
            name: name.toString(),
            content: content.toString(),
            created: new Date()
        };
    } else {
        res.status(400).json({
            message: "name and content are required!!"
        });
    }
});

app.post("/tweets", (req, res) => {});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});