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
  type queueStructure = {
    UID: string;
    TimeIn: string;
    TimeOut: string;
  }

  const [data, setData] = useState<jsonStructure[]>([]);
  const [queue, setQueue] = useState<queueStructure[]>([]);

  const fetchData = async () => {
    const result = await CallAPI();
    setData(result);
    console.log(result);

    
    result.forEach((item: jsonStructure) => {
      if (!queue.some(i => i.UID === item.UID)) {
        if (item.Check === "In") {
          setQueue(oldQueue => [...oldQueue, {UID: item.UID, TimeIn: item.Time, TimeOut: ""}]);
        }
        else {
          setQueue(oldQueue => oldQueue.map(i => i.UID === item.UID ? { ...i, TimeOut: item.Time } : i))
        }
      } 
    });
  }



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
      <div className="">
        <h1>Queue</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UID</TableHead>
              <TableHead>Time In</TableHead>
              <TableHead>Time Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queue.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.UID}</TableCell>
                <TableCell>{item.TimeIn}</TableCell>
                <TableCell>{item.TimeOut}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

