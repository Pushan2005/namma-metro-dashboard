"use server";

export async function CallAPI() {
    const address: string = "http://localhost:3001/file";

    const response = await fetch(address);
    const data = await response.json();

    return data;
}

export async function getDistance(src: string, dest: string) {
    const key = process.env.NEXT_PUBLIC_BING;
    const url = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${src}&destinations=${dest}&travelMode=driving&key=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    const distance =
        data.resourceSets[0].resources[0].results[0].travelDistance;
    // this is in kilometers
    return distance;

    // you have to await getDistance to another variable if you want to access the returned value
}
