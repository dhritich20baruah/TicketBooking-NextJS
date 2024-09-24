"use client"
import { useState } from "react";
import PassengerDetails from "./PassengerDetails";

type tripObj = {
  bus_name: string;
  origin: string;
  destination: string;
  doj: string;
  total_seats: number;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
  bookedSeats: Array<string>;
}

const SeatPlan: React.FC<tripObj> = ({ bus_name, origin, destination, doj, total_seats, stoppages, fare, start_time, bookedSeats}) => {

    let right = []
    let left = []

    if(total_seats == 48){
        let half_Seats = total_seats/2
        right = [...Array(half_Seats).keys()].map((i) => i + 1)
        left = Array.from({ length: half_Seats }, (_, index) => half_Seats + index + 1)
    } else {
        let half_Seats = 24
        right = [...Array(half_Seats).keys()].map((i) => i + 1)
        left = Array.from({ length: 12 }, (_, index) => half_Seats + index + 1)
    }

    const [selectedSeatArr, setSelectedSeatArr] = useState<string[]>([])

    const [passengerVisibility, setPassengerVisibility] = useState(false)

    const handlePassengerVisible = () => {
        setPassengerVisibility(passengerVisibility => !passengerVisibility)
    }

    const handleSeatClick = (seatNumber: string) => {
        //Check if the seat is already booked
        if(bookedSeats.includes(seatNumber)){
            return
        }
        //Check if the seat is already selected
        const isSelected = selectedSeatArr.includes(seatNumber)

        //if selected remove from array, otherwise add to the array
        setSelectedSeatArr((prevArr) => 
            !isSelected ? [...prevArr, seatNumber] : [...prevArr]
        )
    }

    function clearSelection(){
        setSelectedSeatArr([])
    }

    return(
        <>
        <main className="h-auto bg-gray-300 flex fixed shadow-lg shadow-black top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%]">
            <div id="bus" className="m-20 flex bg-white h-fit border-2 border-black border-l-8">
                <div id="driver" className="w-12 border-r-4 border-black bg-white">
                    <div className="w-6 h-6 my-5 mx-2 rounded-full border-2 border-black"></div>
                </div>
                <div id="seats" className="p-4 grid grid-rows-2 gap-y-4">
                    <div id="right" className="h-[50%] w-[100%] grid grid-cols-12 gap-x-1">
                        {right.map((item) => {
                            const isBooked = bookedSeats.includes(String(item))

                            const isSelected = selectedSeatArr.includes(String(item))
                            return(
                                <div className={`w-[2em] h-[2em] border-l-2 border-4 border-black hover:cursor-pointer hover:bg-orange-600 ${isBooked ? 'bg-indigo-500' : (isSelected ? 'bg-green-600': '')}`}
                                    key={item}
                                    onClick={()=>handleSeatClick(String(item))}
                                >
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                    <div id="left" className="h-[50%] w-[100%] grid grid-cols-12 gap-x-1">
                        {left.map((item) => {
                            const isBooked = bookedSeats.includes(String(item))

                            const isSelected = selectedSeatArr.includes(String(item))
                            return(
                                <div className={`w-[2em] h-[2em] border-l-2 border-4 border-black hover:cursor-pointer hover:bg-orange-600 ${isBooked ? 'bg-indigo-500' : (isSelected ? 'bg-green-600': '')}`}
                                key={item}
                                onClick={()=>handleSeatClick(String(item))}
                                >
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div id="station" className="w-[30%] space-y-2 bg-white p-8 m-12 shadow-lg shadow-black">
                <p className="font-bold my-4">{bus_name}</p>
                <p>Boarding Point: <span className="font-semibold">{origin}</span></p>
                <p>Drop off Point: <span className="font-semibold">{destination}</span></p>
                <hr />
                <div>
                    <p className="font-semibold">Seats:
                        <br />
                        {selectedSeatArr.map((seatNums)=>{return(
                            <span className="font-semibold" key={seatNums}>{seatNums}, </span>
                        )})}
                    </p>
                    <button onClick={clearSelection} className="bg-red-600 p-2 text-white hover:bg-orange-900 hover:cursor-pointer">CLEAR SELECTION</button>
                    <br />
                    {selectedSeatArr.length !== 0 ?
                    <button onClick={handlePassengerVisible} className="bg-indigo-600 p-2 text-white hover:bg-indigo-700 hover:cursor-pointer">CONTINUE</button>
                    : <button></button>
                    }
                    </div>
            </div>
        </main>
        {
        passengerVisibility &&
        <div>
            <button onClick={handlePassengerVisible} className="top-0 right-10 fixed font-bold p-1 m-3 text-white bg-red-500 hover:cursor-pointer z-30">X</button>  
            <PassengerDetails busName={bus_name} origin={origin} destination={destination} doj={doj} stoppages={stoppages} start_time={start_time} fare={fare} seatNos={selectedSeatArr}/>  
        </div>
        }
        </>
    )
}

export default SeatPlan