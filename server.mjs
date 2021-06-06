import * as path from "path";
import express from "express";

const port = process.env.PORT || 5000;

const app = express();
const server = app.listen(port);

const leaderboard = {
    'karasik': 2000,
    'olenik': 1010,
    'yozh': 520,
    'deerik': 305
};

app.use(express.static(path.join(process.cwd(), 'client')));

// app.post('/postScore', (req, res) => {
//     req.
// })
