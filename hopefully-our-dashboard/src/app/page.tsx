"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CallAPI } from "@/lib/actions";
import { useEffect, useState } from "react";

export default function Home() {
  type jsonStructure = {
    Date: string;
    Time: string;
    UID: string;
    Check: string;
    COM: number;
  };
  const [data, setData] = useState<jsonStructure[]>([]);

  const fetchData = async () => {
    const result = await CallAPI();
    setData(result);
    console.log(result);
  }

  // useEffect(() => {
  //   fetchData();
  //   const intervalId = setInterval(fetchData, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);


  return (
    <>
    <Button onClick={fetchData}>
      Fetch Data
    </Button>
      <Table>
        <TableCaption>Start the HTTP Server and Run the parser</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="">UID</TableHead>
            <TableHead className="">Check In/Out</TableHead>
            <TableHead className="">COM Port</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="">{item.Date}</TableCell>
              <TableCell className="">{item.Time}</TableCell>
              <TableCell className="">{item.UID}</TableCell>
              <TableCell className="">{item.Check}</TableCell>
              <TableCell className="">{item.COM}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
