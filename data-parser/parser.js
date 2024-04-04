const fs = require("fs");
const csv = require("csv-parser");

const csvToJson = () => {
    const results = [];

    fs.createReadStream("rfid_data.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
            fs.writeFile(
                "data.json",
                JSON.stringify(results, null, 2),
                (err) => {
                    if (err) throw err;
                    console.log("data.json written");
                }
            );
        });
};

fs.watch("rfid_data.csv", (eventType, filename) => {
    if (eventType === "change") {
        console.log(`${filename} file Changed`);
        csvToJson();
    }
});
