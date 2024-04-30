const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

app.get("/file", (req, res) => {
    res.sendFile(path.join(__dirname, "data.json"), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
        }
    });
});

app.listen(PORT, (error) => {
    if (!error) console.log("Server is active and listening on port " + PORT);
    else console.log("Error occurred :", error);
});
