const { spawn } = require("child_process");

const server = spawn("node", ["server.js"]);
server.stdout.on("data", (data) => {
    console.log(`Server: ${data}`);
});
server.stderr.on("data", (data) => {
    console.error(`Server: ${data}`);
});

const parser = spawn("node", ["parser.js"]);
parser.stdout.on("data", (data) => {
    console.log(`parser.js output: ${data}`);
});
parser.stderr.on("data", (data) => {
    console.error(`parser.js error: ${data}`);
});
