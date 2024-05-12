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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CallAPI, getDistance } from "@/lib/actions";
import { getTimeDifference, getRoadTime } from "@/lib/utils";
import { useState } from "react";

import { toast } from "sonner";

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
    };

    const [data, setData] = useState<jsonStructure[]>([]);
    const [queue, setQueue] = useState<queueStructure[]>([]);
    const [selectedUId, setSelectedUId] = useState<queueStructure>();
    const [metrics, setMetrics] = useState<number[]>();
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const fetchData = async () => {
        const result = await CallAPI();
        setData(result);
        console.log(result);

        result.forEach((item: jsonStructure) => {
            if (!queue.some((i) => i.UID === item.UID)) {
                if (item.Check === "In") {
                    setQueue((oldQueue) => [
                        ...oldQueue,
                        { UID: item.UID, TimeIn: item.Time, TimeOut: "" },
                    ]);
                } else {
                    setQueue((oldQueue) =>
                        oldQueue.map((i) =>
                            i.UID === item.UID
                                ? { ...i, TimeOut: item.Time }
                                : i
                        )
                    );
                }
            }
        });
    };

    const tableClick = (UID: string, TimeIn: string, TimeOut: string) => {
        setSelectedUId({ UID: UID, TimeIn: TimeIn, TimeOut: TimeOut });
    };

    const getMetrics = async (source: string, destination: string) => {
        const noJourneyError = () => {
            toast(
                "No Journey selected, please select a journey from the list",
                {
                    description:
                        "Please select a journey from the list to get the metrics",
                }
            );
        };
        const dist = await getDistance(source, destination);
        if (selectedUId?.TimeOut && selectedUId?.TimeIn) {
            const metroTime = getTimeDifference(
                selectedUId.TimeIn,
                selectedUId.TimeOut
            );
            console.log(selectedUId.TimeIn, selectedUId.TimeOut);
            const roadTime = getRoadTime(dist);
            const timeSaved = getTimeDifference(metroTime, roadTime);
            setMetrics([dist, metroTime, roadTime, timeSaved]);
        } else {
            noJourneyError();
        }
    };

    return (
        <>
            <div className="p-4">
                <Button onClick={fetchData}>Refresh</Button>
                {/* <Table>
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
      </Table> */}
                <div className="">
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
                                <TableRow
                                    onClick={() =>
                                        tableClick(
                                            item.UID,
                                            item.TimeIn,
                                            item.TimeOut
                                        )
                                    }
                                    key={index}
                                >
                                    <TableCell>{item.UID}</TableCell>
                                    <TableCell>{item.TimeIn}</TableCell>
                                    <TableCell>{item.TimeOut}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <br />
                <h1>
                    Selected Row: --------{selectedUId?.UID}--------
                    {selectedUId?.TimeIn}--------{selectedUId?.TimeOut}
                </h1>
                {/* Distance and time saved */}
                <div className="flex justify-center items-center max-w-56 mt-6 flex-col space-y-5 mx-auto">
                    <Label htmlFor="origin">Origin</Label>
                    <Input
                        id="origin"
                        type="text"
                        placeholder="Coordinates"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                        id="destination"
                        type="text"
                        placeholder="Coordinates"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <Button
                        onClick={(e) => {
                            getMetrics(origin, destination);
                        }}
                    >
                        Get Metrics
                    </Button>
                    <div>
                        {metrics && (
                            <>
                                <p>Distance: {metrics[0]}</p>
                                <br />
                                <p>Metro Journey: {metrics[1]}</p>
                                <br />
                                <p>Time on Road: {metrics[2]}</p>
                                <br />
                                <p>Time saved: {metrics[3]}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
