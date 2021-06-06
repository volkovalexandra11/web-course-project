import * as path from "path";
import express from "express";

const port = process.env.PORT || 5000;

const app = express();
const server = app.listen(port);

const leaderboard = {};

app.use(express.static(path.join(process.cwd(), 'client')));

app.get('/', (req, res) => {
    res.send('Jopa');
});
