const express = require("express");
const app = express();
const cors = require("cors");
const DBconnection = require("./config/db");
const Tweet = require("./Models/Tweet");
const monk = require("monk");
const Filter = require("bad-words");
const Limit = require("express-rate-limit");

// const db = monk('mongodb://tweets:nabil1982@ds225294.mlab.com:25294/tweets')
// const tweets = db.get('tweets')
app.use(cors());

const filter = new Filter();
DBconnection();
app.use(express.json());
// const isValid = (tweet) => {
//     return (
//         tweet.name &&
//         tweet.name.toString() !== "" &&
//         tweet.content &&
//         tweet.content.toString() !== ""
//     );
// };
app.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.json(tweets);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server Error!!!",
    });
  }
});

app.get("/v2/tweets", (req, res) => {

  // let skip = Number(req.query.skip) || 0
  // let limit = Number(req.query.limit) || 5
  let {
    skip = 0,
      limit = 10,
      sort = 'desc',
  } = req.query
  skip = Number(skip) || 0
  limit = Number(limit) || 10
  limit = limit > 50 ? 50 : limit

  skip = skip < 0 ? 0 : skip
  limit = limit < 0 ? 10 : limit

  Promise.all([
      Tweet.countDocuments(),
      Tweet.find({}, null, {
        limit,
        skip,
        sort: {
          date: sort === ' desc' ? -1 : 1
        }
      })
    ])
    .then(([total, tweets]) => {
      res.json({
        tweets: tweets,
        meta: {
          total,
          skip,
          limit,
          has_available: total - (skip + limit) > 0,
        }
      })
    }).catch(err => {
      res.json(err.message)
    })



});

// app.use(
//   Limit({
//     windowMs: 30 * 1000, // 15 minutes
//     max: 1, // limit each IP to 100 requests per windowMs
//   })
// );

app.post("/tweets", async (req, res) => {
  const {
    name,
    content
  } = req.body;

  try {
    const tweet = await Tweet.findOne({
      name,
    });
    if (tweet) {
      return res.status(400).json({
        message: "Already exists !!",
      });
    }

    if (!name || !content) {
      return res.status(400).json({
        message: " content & name are required !!",
      });
    }


    const newTweet = new Tweet({
      name: filter.clean(name),
      content: filter.clean(content),
    });
    await newTweet.save();
    res.json(newTweet);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server is Down....");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});