import * as path from "path";
import express from "express";
import bodyParser from "body-parser";

const port = process.env.PORT || 5000;

const app = express();
const server = app.listen(port);

const leaderboard = {
    'karasik': 2000,
    'olenik': 1010,
    'yozh': 520,
    'deerik': 305
};

function addScore(user, score) {
    const oldScore = leaderboard[user] || 0;
    leaderboard[user] = oldScore + score;
}

app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), 'client')));

app.post('/api/postScore', (req, res) => {
    console.log(req.body);
    const {user, score} = req.body;
    if ((typeof user !== 'string') || (typeof score !== 'number') || !(Number.isInteger(score))) {
        res.sendStatus(400).end();
        return;
    }
    addScore(user, score);
    console.log(leaderboard);
    res.sendStatus(200).end();
});
