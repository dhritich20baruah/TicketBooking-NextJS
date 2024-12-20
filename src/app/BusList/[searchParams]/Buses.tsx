"use client";
import { useState } from "react";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import SeatPlan from "./SeatPlan";

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

  const [totalFare, setTotalFare] = useState(0);
  const [totalSeats, setTotalSeats] = useState(0);
  const [busName, setBusName] = useState("")
  const [startTime, setStartTime] = useState("")
  const [seatVisibility, setSeatVisibility] = useState(false);
  const [stops, setStops] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([])

  const stopArr = buses[0].stoppages
  const start = stopArr.indexOf(buses[0].origin)
  const end = stopArr.indexOf(buses[0].destination)
  const stop = stopArr.slice(start, end)

  const handleFare = (total_fare: number, bus_name: string, startTime: string, total_seats: number, booked_Seats: string[]) => {
    setBookedSeats(booked_Seats)
    setTotalFare(total_fare)
    setTotalSeats(total_seats)
    setBusName(bus_name)
    setStartTime(startTime)
    setStops(stop)
    handleSeatVisible()
  }

  const handleSeatVisible = () => {
    setSeatVisibility((seatVisibility) => !seatVisibility)
  }

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

    <section id="busList" className="flex mx-10">
      <div className="w-max-[80%] mx-auto">
        {buses.map((item, index) => {
          return(
            <div key={index} id="card" className="p-4 grid grid-cols-6 gap-4 w-[100%] border-2 border-gray-600 font-md my-4">
              <div>
                <p className="font-bold text-lg">{item.bus_name}</p>
                <p>{item.details}</p>
              </div>
              <div>
                <p className="text-indigo-700 font-semibold">Start</p>
                <p className="font-bold text-lg">{item.start_time} hrs</p>
                <p className="font-bold text-lg">{formated_date}</p>
                <p className="text-indigo-700 font-semibold">{item.origin}</p>
              </div>
              <div>
                <p className="font-bold text-lg">Duration</p>
                <p className="font-bold text-lg text-indigo-600">{item.duration}</p>
              </div>
              <div>
                <p className="text-indigo-700 font-semibold">Arrival</p>
                <p className="font-bold text-lg">{item.estimated_arrival} hrs</p>
                <p className="font-bold text-lg">{item.arrival_date}</p>
                <p className="text-indigo-700 font-semibold">{item.destination}</p>
              </div>
              <div>
                <p className="font-bold text-lg">INR {item.total_fare}</p>
              </div>
              <div>
                <p className="font-semibold">
                  {item.total_seats} Total Seats
                </p>
                <br />
                <br />
                <button className="bg-indigo-600 p-4 text-white hover:cursor-pointer hover:bg-indigo-700" onClick={()=>handleFare(item.total_fare, item.bus_name, item.start_time, item.total_seats, item.bookedSeats)}>VIEW SEATS</button>
              </div>
              <div>
                {seatVisibility && (
                  <div>
                    <SeatPlan
                      origin={item.origin}
                      destination={item.destination}
                      doj={item.doj}
                      stoppages={stops}
                      bus_name={busName}
                      total_seats={totalSeats}
                      start_time={startTime}
                      fare={totalFare}
                      bookedSeats={bookedSeats}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
        {seatVisibility && (
          <button onClick={handleSeatVisible} className="bg-indigo-600 p-4 text-white hover:cursor-pointer hover:bg-indigo-800 fixed top-[10%] right-[10%]">X</button>
        )}
      </div>
    </section>
    </main>
  );
};

export default Buses;
