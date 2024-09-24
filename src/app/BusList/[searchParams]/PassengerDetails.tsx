import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

type passengerObj = {
  busName: string;
  origin: string;
  destination: string;
  doj: string;
  stoppages: Array<string>;
  start_time: string;
  fare: number;
  seatNos: Array<string>;
};

type passengerFormData = {
  busName: string;
  origin: string;
  destination: string;
  doj: string;
  passenger_name: string;
  seat_no: string;
  mobile_no: string;
  email: string;
  stoppages: Array<string>;
  fare: number;
  start_time: string;
};

const PassengerDetails: React.FC<passengerObj> = ({
  busName,
  origin,
  destination,
  doj,
  stoppages,
  start_time,
  fare,
  seatNos,
}) => {
  const [formData, setFormData] = useState<passengerFormData[]>(
    seatNos.map((seatNo: string) => ({
      busName,
      origin,
      destination,
      doj,
      passenger_name: "",
      seat_no: seatNo,
      mobile_no: "",
      email: "",
      stoppages,
      start_time,
      fare,
    }))
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [name]: value };
    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
        const response = await axios.post("", formData,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        alert("Seat Booked")
        
    } catch(error){
        console.log(error)
    }
  }

  return (
    <>
      <div className="fixed top-0 right-0 bg-white z-10 h-[100%] px-8 py-5 w-[30vw] shadow-lg shadow-black space-y-4 overflow-auto">
        <h2 className="text-xl font-bold">
          {busName}
        </h2>
        <h2 className="text-xl font-bold">
          PassengerDetails
        </h2>
        <div className="space-y-2">
          <h4 className="text-md font-semibold flex items-center">
            Passenger Information
          </h4>
          <form onSubmit={handleSubmit}>
            {seatNos.map((items: string, index: number) => {
              return (
                <div key={index} className="py-2">
                  <div className="space-y-2">
                    <p className="mb-2 font-bold">
                      Passenger{" "}
                      <span className="font-bold text-xl text-indigo-800">
                        {index + 1}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Seat No.:
                      <span className="font-bold text-xl text-indigo-800">
                        <input
                          type="text"
                          name="seat_no"
                          value={formData[index].seat_no}
                          onChange={(e) => handleInputChange(e, index)}
                        />
                      </span>
                    </p>
                    <label htmlFor="Name" className="font-semibold">
                      Name <br />
                      <input
                        type="text"
                        name="passenger_name"
                        onChange={(e) => handleInputChange(e, index)}
                        id="Name"
                        className="w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none"
                        required
                      />
                    </label>
                    <br />
                  </div>
                  <h4 className="font-semibold flex items-center">
                    Contact Details
                  </h4>
                  <div>
                    <label htmlFor="email" className="font-semibold">
                      Email ID <br />
                      <input
                        type="email"
                        name="email"
                        onChange={(e) => handleInputChange(e, index)}
                        id="email"
                        className="w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none"
                        required
                      />
                    </label>
                    <br />
                    <label htmlFor="Phone" className="font-semibold">
                      Phone <br />
                      <input
                        type="phone"
                        name="mobile_no"
                        onChange={(e) => handleInputChange(e, index)}
                        id="mobile_no"
                        className="w-[90%] border-2 border-gray-500 p-2 mx-2 outline-none"
                        required
                      />
                    </label>
                  </div>
                </div>
              );
            })}
            <hr />
            <p>
                <strong>Total Amount: INR {fare * seatNos.length}</strong>
            </p>
            <button type="submit" className="bg-indigo-600 p-2 text-white hover:cursor-pointer hover:bg-indigo-700">PROCEED TO PAY</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PassengerDetails;
