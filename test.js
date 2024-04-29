const fs = require("fs");
const util = require("util");

async function getDistance(src, dest) {
    const key =
        "AoLg7xkJlMmPKHh1WFWyxaC1NoBHT_bVXCz5gfdUUiaeZZdxKI-ZqkEC9iz9G1B5";
    const url = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${src}&destinations=${dest}&travelMode=driving&key=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    const dist = data.resourceSets[0].resources[0].results[0].travelDistance;
    return dist;
}

const main = async () => {
    const distance = await getDistance(
        "12.923680086298646, 77.49869193948666",
        "12.932846075112352, 77.63431583773891"
    );
    console.log(distance);
};

main();
