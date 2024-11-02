"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";

type passengerData = {
  id: number;
  bus_name: string;
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
  paymentid: string; //will be generated by stripe
  payment_status: boolean; //Will be false initially and will be true once payment is confirmed
};

const STRIPE_PUBLIC_KEY =
  "pk_test_51Oh5akSGJj1UMFGk8ivs6pI4dIOO5nCcBGsqyoVt36KY6L75H64NyJesIjf1qjdK29SPBwkypZK45Yc5PS8R8wJ7005GghDSIS";
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

type props = { formData: passengerData[]; bookingIds: Array<string> };

const PaymentForm: React.FC<props> = ({ formData, bookingIds }) => {
  const info = formData[0]; //Certain information like bus name, departure time, fare per person will be same. So I will only take the information from the index 0 in the form data array
  const totalFare = Math.round(info.fare * formData.length); //Fare per person per trip multiplied by number of passengers booking the seats at that single transaction will give the total fare.
  console.log(info);
  return (
    <main className="max-w-6xl mx-auto p-10 text-center border m-10">
      <div className="flex">
        <div className="payment-options w-[60%] p-10">
          <h1 className="text-xl font-bold mb-5">Make Payment</h1>
          <div className="my-10">
            <Elements stripe={stripePromise}>
                <Checkout bookingIds={bookingIds} totalFare={totalFare} formData={formData}/>
            </Elements>
          </div>
        </div>
        {/* Now we will display the details of that particular trip */}
        <div className="payment-info w-[40%] m-10">
          <div className="shadow-lg shadow-black">
            <h1 className="text-indigo-700 font-bold text-xl p-5">
              {info.bus_name}
            </h1>
            <hr />
            <div className="departure m-4 flex justify-between">
              <div className="flex">
                <div>
                  <h2 className="text-black">Departure</h2>
                  <h3 className="text-lg font-semibold">
                    {info.doj} <br /> {info.start_time}
                  </h3>
                </div>
              </div>
              <div className="px-5 text-right">
                <h2>Seats</h2>
                <h3 className="text-lg font-semibold flex">
                  {formData.map((item, index) => {
                    return (
                      <ul key={index} className="flex">
                        <li>{item.seat_no}, </li>
                      </ul>
                    );
                  })}
                </h3>
              </div>
            </div>
            <hr />
            <div className="drop_off m-4 flex justify-between">
              <div className="flex">
                <div>
                  <h2 className="text-black">Boarding Point</h2>
                  <h3 className="text-lg font-semibold">
                    {info.origin}
                  </h3>
                </div>
              </div>
              <div className="px-5 text-right">
                <h2>Drop Off Point</h2>
                <h3 className="text-lg font-semibold">{info.destination}</h3>
              </div>
            </div>
            <hr />
            <div className="passenger bg-indigo-700">
                <div className="flex font-semibold text-md py-5 px-4 text-white">
                    {formData.map((item, index) => {
                        return(
                            <ul key={index} className="flex">
                                <li className="mx-3">{item.passenger_name}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
          </div>
          <div className="shadow-lg shadow-black my-5 p-4 space-y-4">
            <h1 className="text-indigo-700 text-xl font-bold px-4">
                FARE BREAKUP
            </h1>
            <ul className="flex justify-between px-4 text-xl">
                <li>Onward Fare</li>
                <li>INR {totalFare}</li>
            </ul>
            <ul className="flex justify-between px-4 text-xl font-bold">
                <li>Total Payable</li>
                <li>INR {Math.round(totalFare)}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentForm;
