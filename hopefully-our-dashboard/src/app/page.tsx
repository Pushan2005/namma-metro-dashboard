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
import { CallAPI } from "@/lib/actions";
import { useEffect, useState } from "react";

export default function Home() {
  type jsonStructure = {
    Date: string;
    Time: string;
    UID: string;
    Check: string;
  };
  const [data, setData] = useState<jsonStructure[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await CallAPI();
      setData(result);
      console.log(result);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Table>
        <TableCaption>Start the HTTP Server and Run the parser</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="">UID</TableHead>
            <TableHead className="">Check In/Out</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.Date}</TableCell>
              <TableCell>{item.Time}</TableCell>
              <TableCell className="">{item.UID}</TableCell>
              <TableCell className="">{item.Check}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
