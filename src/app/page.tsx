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

  const today = new Date().toISOString().split("T")[0]
  return (
    <main className="bg-[url('/busbg.jfif')] bg-cover bg-center h-screen">
      <div id="main" className="flex justify-center items-center w-full h-screen">
        <form action="" method="post" className="flex">
          <div id="origin">
            <input type="text" name="from" className="font-lg p-[2.7em] h-20 font-bold outline-none border-2 border-gray-500" placeholder="From"/>
          </div>
          <div id="destination">
            <input type="text" name="to" className="font-lg p-[2.7em] h-20 font-bold outline-none border-2 border-gray-500" placeholder="To"/>
          </div>
          <input type="date" name="doj" min={today} className="font-lg p-[2.7em] h-20 font-bold outline-none border-2 border-gray-500"/>
          <button type="submit" className="bg-indigo-600 font-bold text-md h-22 px-5 py-5 text-white">SEARCH BUSES</button>
        </form>
      </div>
    </main>
  );
}
