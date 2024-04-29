"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CallAPI } from "@/lib/actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  type DataItem = {
    Time: string;
    COM: number;
    Check: string;
  };
  const [data, setData] = useState<DataItem[]>([]);
  type jsonStructure = {
    Date: string;
    Time: string;
    UID: string;
    Check: string;
    COM: number;
  };

  const fetchData = async () => {
    const result = await CallAPI();
    const newData = result.map((item: jsonStructure) => ({
      COM: item.COM,
      Time: item.Time,
      Check: item.Check,
    }));
    setData(newData);
  };

  return (
    <>
      <Button onClick={fetchData}>Fetch Data</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead className="">COM Port</TableHead>
            <TableHead className="">Check In/Check Out</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="">{item.Time}</TableCell>
              <TableCell className="">{item.COM}</TableCell>
              <TableCell className="">{item.Check}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
