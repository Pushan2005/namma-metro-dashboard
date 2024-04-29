"use server";

export async function CallAPI() {
  const address: string = "http://localhost:3001/file";

  const response = await fetch(address);
  const data = await response.json();

  return data;
}
