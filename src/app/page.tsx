"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const stoppages: string[] = [
    "Guwahati",
    "Nagaon",
    "Bokakhat",
    "Jorhat",
    "Sivsagar",
    "Dibrugarh",
    "Tinsukia",
    "Saikhowa",
    "Tezpur",
    "Dhemaji",
    "North Lakhimpur",
    "Mangaldoi"
  ]

  const [places, setPlaces] = useState<string>("")
  const [origin, setOrigin] = useState<string>("")
  const [destination, setDestination] = useState<string>("")
  const [doj, setDoj] = useState<string>("")
  const [stops, setStops] = useState<string>("")
  const [filteredOrigins, setFilteredOrigins] = useState<string[]>([]);
  const [filteredDestinations, setFilteredDestination] = useState<string[]>([]);

  // For Origin
  const handleSearchOrigin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setPlaces(query);
    const filteredResult: string[] = stoppages.filter((stopp) => 
    stopp.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredOrigins(filteredResult)
  }

  const getOrigin = (stopp: string) => {
    setPlaces(stopp);
    setOrigin((prevOrigin) => {
      if (prevOrigin !== stopp){
        return stopp
      } else {
        return prevOrigin
      }
    })
  }

  // For Destination
  const handleSearchDestination = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setStops(query);
    const filteredResult: string[] = stoppages.filter((stopp) => 
    stopp.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredDestination(filteredResult)
  }

  const getDestination = (stopp: string) => {
    setStops(stopp);
    setDestination((prevDestination) => {
      if (prevDestination !== stopp){
        return stopp
      } else {
        return prevDestination
      }
    })
  }

  const today = new Date().toISOString().split("T")[0]

  const searchBuses = () => {
    try {
      router.push(`/BusList/` + origin + `&` + destination + `&` + doj)      
    } catch (error) {
      console.error("Error fetching data: ", error)
    }
  }

  return (
    <main className="bg-[url('/busbg.jfif')] bg-cover bg-center h-screen">
      <div id="main" className="flex justify-center items-center w-full h-screen">
        <form action="" method="post" className="flex" onSubmit={(e) => {
          e.preventDefault();
          searchBuses();
        }}>
          <div id="origin">
            <input type="text" name="from" className="font-lg p-[2.7em] h-20 font-bold outline-none border-2 border-gray-500" placeholder="From" value={places} onChange={handleSearchOrigin}/>
            <div className="absolute bg-white w-56 px-5 py-2">
              {places && (
                <ul id="fromList">
                  {filteredOrigins.map((stopp, index) => (
                    <li key={index} className="my-2 font-bold text-gray-700 hover:cursor-pointer" onClick={()=>getOrigin(stopp)}>{stopp}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div id="destination">
            <input type="text" name="to" className="font-lg p-[2.7em] h-20 font-bold outline-none border-2 border-gray-500" placeholder="To" value={stops} onChange={handleSearchDestination}/>
            <div className="absolute bg-white w-56 px-5 py-2">
              {places && (
                <ul id="toList">
                  {filteredDestinations.map((stopp, index) => (
                    <li key={index} className="my-2 font-bold text-gray-700 hover:cursor-pointer" onClick={()=>getDestination(stopp)}>{stopp}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <input type="date" name="doj" min={today} className="font-lg p-[2.7em] h-20 font-bold outline-none border-2 border-gray-500" onChange={(event) => setDoj(event.target.value)}/>
          <button type="submit" className="bg-indigo-600 font-bold text-md h-22 px-5 py-5 text-white">SEARCH BUSES</button>
        </form>
      </div>
    </main>
  );
}
