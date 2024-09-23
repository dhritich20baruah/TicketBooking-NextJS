import { pool } from "../../../../utils/dbConnect";
import { parseISO, format, addHours } from "date-fns";
import Link from "next/link";

export default async function BusList({
  params,
}: {
  params: { searchParams: string };
}) {
  const searchArgs = params.searchParams;
  // Decode the URL-encoded string
  const decodedArgs = decodeURIComponent(searchArgs); // This will convert "%26" to "&"

  //Split the string on the "&" character
  const [origin, destination, doj] = decodedArgs.split("&");

  const data = await pool.query(
    `SELECT * FROM buses WHERE stoppages @> ARRAY[$1, $2]::text[] AND array_position(stoppages, $1) < array_position(stoppages, $2)`,
    [origin, destination]
  );

  const parsedDate = parseISO(doj);
  const formated_date = format(parsedDate, "dd/MM/yyyy");

  if (data.rows.length === 0) {
    return (
      <>
        <p className="my-4 mx-10">
          <strong>Home</strong> &gt; Bus Tickets
        </p>
        <p className="flex font-bold my-4 mx-10">
          {origin} - &gt; {destination} - &gt; {formated_date}
          <Link href="/">
            <button className="mx-5 p-1 text-white bg-indigo-500 rounded-md hover:cursor-pointer">
              Modify
            </button>
          </Link>
        </p>
        <div className="flex align-middle justify-center h-screen w-full">
            <p className="text-center text-2xl font-bold m-20">
                THERE ARE NO AVAILABLE BUSES
            </p>
        </div>
      </>
    );
  }

  const buses = data.rows;

  let route_name = data.rows[0].routes;

  const distance = await pool.query(
    `
    WITH stop_data AS (
    SELECT route_name,
    ROW_NUMBER() OVER () AS stop_index,
    (stop_data).name AS stop_name,
    (stop_data).distance_from_last AS distance_from_last
    FROM bus_routes,
    UNNEST(distance) AS stop_data
    )
    SELECT SUM(distance_from_last) AS total_distance
    FROM stop_data
    WHERE stop_index > (
    SELECT stop_index
    FROM stop_data
    WHERE stop_name = $1
    AND route_name = $3
    LIMIT 1
    )
    AND stop_index <= (
    SELECT stop_index
    FROM stop_data
    WHERE stop_name = $2
    AND route_name = $3
    LIMIT 1
    )
    AND route_name = $3
    `,
    [origin, destination, route_name]
  );

  const total_distance = distance.rows[0].total_distance

  //calculate distance of passenger pickup spot from bus origin. in postgresql the array index start from 1 not from zero like javascript
  const distance_origin = await pool.query(
    `
    WITH stop_data AS (
    SELECT route_name,
    ROW_NUMBER() OVER () AS stop_index,
    (stop_data).name AS stop_name,
    (stop_data).distance_from_last AS distance_from_last
    FROM bus_routes,
    UNNEST(distance) AS stop_data
    )
    SELECT SUM(distance_from_last) AS distance_from_start
    FROM stop_data
    WHERE stop_index > 1 
    AND stop_index <= (
    SELECT stop_index
    FROM stop_data
    WHERE stop_name = $1
    AND route_name = $2
    LIMIT 1
    )
    AND route_name = $2
    `,
    [origin, route_name]
  )

  const distance_from_start = distance_origin.rows[0].distance_from_start

  console.log("total-distance = ",total_distance, "distance from origin = ", distance_from_start)

  for (const bus of buses){
    const total_fare = parseFloat(bus.fare) * total_distance;

    const travel_time_hrs = total_distance / bus.speed;
    const hours = Math.floor(travel_time_hrs);
    const minutes = Math.round((travel_time_hrs - hours) * 60);
    const formatted_duration = `${hours}h ${minutes}m`;

    const startTime = new Date(`${doj}T${bus.start_time}`);
    const time_to_origin_hrs = distance_from_start / bus.speed;
    const departureTime = addHours(startTime, time_to_origin_hrs);
    const duration_ms = travel_time_hrs * 60 * 60 * 1000;
    const arrivalDate = new Date(departureTime.getTime() + duration_ms);
    
    const estimated_arrival_time = addHours(departureTime, travel_time_hrs);
    const formatted_departure_time = format(departureTime, "HH:mm:ss");
    const formatted_arrival_time = format(estimated_arrival_time, "HH:mm:ss");
    const formatted_arrival_date = format(arrivalDate, "dd/MM/yyyy")

    bus.total_fare = total_fare.toFixed(2);
    bus.start_time = formatted_departure_time;
    bus.estimated_arrival = formatted_arrival_time;
    bus.arrival_date = formatted_arrival_date;
    bus.duration = formatted_duration;
    bus.origin = origin;
    bus.destination = destination;
    bus.doj = doj;
  }

  return <main>BusList</main>;
}
