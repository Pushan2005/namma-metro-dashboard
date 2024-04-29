"use server";

export async function CallAPI() {
    const address: string = "http://172.16.232.149:3001/file";

    const response = await fetch(address);
    const data = await response.json();

    return data;
}
