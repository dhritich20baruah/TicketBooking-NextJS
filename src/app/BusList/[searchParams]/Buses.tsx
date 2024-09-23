"use client";
import { useState } from "react";
import Link from "next/link";
import { parseISO, format } from "date-fns";

type busArr = {
  bus_name: string;
  details: string;
  total_seats: number;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
  service: "day" | "night";
  origin: string;
  destination: string;
  doj: string;
  bookedSeats: Array<string>;
  routes: string;
  total_fare: number;
  estimated_arrival: string;
  duration: string;
  arrival_date: string;
};

type props = { buses: busArr[] };

const Buses: React.FC<props> = ({ buses }) => {
  const parsedDate = parseISO(buses[0].doj);
  const formated_date = format(parsedDate, "dd/MM/yyyy");

  return (
    <main>
      <p className="my-4 mx-10">
        <strong>Home</strong> &gt; Bus Tickets
      </p>
      <p className="flex font-bold my-4 mx-10">
        {buses[0].origin} - &gt; {buses[0].destination} - &gt; {formated_date}
        <Link href="/">
          <button className="mx-5 p-1 text-white bg-indigo-500 rounded-md hover:cursor-pointer">
            Modify
          </button>
        </Link>
      </p>
    </main>
  );
};

export default Buses;
