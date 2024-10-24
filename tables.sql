CREATE TABLE buses (
    id SERIAL PRIMARY KEY,
    bus_name VARCHAR NOT NULL,
    details TEXT NOT NULL,
    total_seats INTEGER NOT NULL,
    stoppages TEXT[] NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    start_time TIME NOT NULL,
    speed INTEGER NOT NULL,
    service VARCHAR(50) NOT NULL,
    routes VARCHAR
);

CREATE TABLE journey (
    id SERIAL PRIMARY KEY,
    bus_name VARCHAR NOT NULL,
    origin VARCHAR NOT NULL,
    destination VARCHAR NOT NULL,
    doj VARCHAR NOT NULL,
    passenger_name VARCHAR NOT NULL,
    seat_no VARCHAR NOT NULL,
    mobile_no VARCHAR NOT NULL,
    email VARCHAR,
    stoppages TEXT[] NOT NULL,
    fare DECIMAL(10, 2) NOT NULL,
    start_time TIME NOT NULL, 
    paymentID VARCHAR,
    payment_status BOOLEAN
);
  
CREATE TYPE stop AS (
    name VARCHAR(100),
    distance_from_last INTEGER
);

CREATE TABLE bus_routes (
    id SERIAL PRIMARY KEY,
    route_name VARCHAR(255) NOT NULL,
    distance stop[]
);

INSERT INTO bus_routes (route_name, distance) VALUES ('NH37_G2T',  ARRAY[
    ROW('Guwahati', 0)::stop,
    ROW('Nagaon', 120)::stop,
    ROW('Bokakhat', 120)::stop,
    ROW('Jorhat', 68)::stop,
    ROW('Sivsagar', 57)::stop,
    ROW('Moran', 42)::stop,
    ROW('Dibrugarh', 38)::stop,
    ROW('Tinsukia', 47)::stop
]);

INSERT INTO bus_routes (route_name, distance) VALUES ('NH37_T2G',  ARRAY[
    ROW('Tinsukia', 0)::stop,
    ROW('Dibrugarh', 47)::stop,
    ROW('Moran', 38)::stop,
    ROW('Sivsagar', 42)::stop,
    ROW('Jorhat', 57)::stop,
    ROW('Bokakhat', 68)::stop,
    ROW('Nagaon', 120)::stop,
    ROW('Guwahati', 120)::stop
]);

INSERT INTO bus_routes (route_name, distance) VALUES ('NH15_52_G2D',  ARRAY[
    ROW('Guwahati', 0)::stop,
    ROW('Mangaldoi', 72)::stop,
    ROW('Tezpur', 95)::stop,
    ROW('North Lakhimpur', 180)::stop,
    ROW('Dhemaji', 66)::stop
]);

INSERT INTO bus_routes (route_name, distance) VALUES ('NH15_52_D2G',  ARRAY[
    ROW('Dhemaji', 0)::stop,
    ROW('North Lakhimpur', 66)::stop,
    ROW('Tezpur', 180)::stop,
    ROW('Mangaldoi', 95)::stop,
    ROW('Guwahati', 72)::stop
]);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Network Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Guwahati', 'Nagaon', 'Bokakhat', 'Jorhat', 'Sivsagar', 'Moran', 'Dibrugarh', 'Tinsukia'],
    1.44,
    '20:00',
    41,
    'night',
    'NH37_G2T'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Chartered ASTC',
    'Volvo A/C Pushback 2+2',
    48,
    ARRAY['Guwahati', 'Nagaon', 'Bokakhat', 'Jorhat', 'Sivsagar', 'Moran', 'Dibrugarh'],
    2.16,
    '08:30',
    50,
    'day',
    'NH37_G2T'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Rayan',
    'Bharat Benz A/C 2+1 Seater',
    36,
    ARRAY['Nagaon', 'Bokakhat', 'Jorhat', 'Sivsagar', 'Moran', 'Dibrugarh', 'Tinsukia'],
    1.66,
    '07:30',
    42,
    'day',
    'NH37_G2T'
);


-- DOWN
INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Network Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Tinsukia','Dibrugarh', 'Moran', 'Sivsagar', 'Jorhat', 'Bokakhat', 'Nagaon', 'Guwahati'],
    1.44,
    '20:00',
    41,
    'night',
    'NH37_T2G'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Chartered ASTC',
    'Volvo A/C Pushback 2+2',
    48,
    ARRAY['Dibrugarh', 'Moran', 'Sivsagar', 'Jorhat', 'Bokakhat', 'Nagaon', 'Guwahati'],
    2.16,
    '08:30',
    50,
    'day',
    'NH37_T2G'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Rayan',
    'Bharat Benz A/C 2+1 Seater',
    36,
    ARRAY['Tinsukia','Dibrugarh', 'Moran', 'Sivsagar', 'Jorhat', 'Bokakhat', 'Nagaon'],
    1.66,
    '07:30',
    42,
    'day',
    'NH37_T2G'
);

-- Guwahati Dhemaji Route

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Network Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Guwahati', 'Mangaldoi', 'Tezpur', 'North Lakhimpur', 'Dhemaji'],
    1.44,
    '07:30',
    41,
    'day',
    'NH15_52_G2D'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Green Valley Travels',
    'Non A/C Seater Pushback 2+2',
    48,
    ARRAY['Guwahati', 'Mangaldoi', 'Tezpur', 'North Lakhimpur', 'Dhemaji'],
    1.5,
    '07:00',
    41,
    'day',
    'NH15_52_G2D'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Pranjit Travels',
    'Bharat Benz A/C 2+1',
    36,
    ARRAY['Guwahati', 'Mangaldoi', 'Tezpur', 'North Lakhimpur', 'Dhemaji'],
    1.88,
    '21:00',
    41.3,
    'night',
    'NH15_52_G2D'
);

-- Guwahati Dhemaji Route Down

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Network Travels',
    'Non A/C Seater Pushback 2+1',
    36,
    ARRAY['Dhemaji', 'North Lakhimpur', 'Tezpur', 'Mangaldoi', 'Guwahati'],
    1.44,
    '07:30',
    41,
    'day',
    'NH15_52_D2G'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Green Valley Travels',
    'Non A/C Seater Pushback 2+2',
    48,
    ARRAY['Dhemaji', 'North Lakhimpur', 'Tezpur', 'Mangaldoi', 'Guwahati'],
    1.5,
    '07:00',
    41,
    'day',
    'NH15_52_D2G'
);

INSERT INTO buses (
    bus_name, details, total_seats, stoppages, fare, start_time, speed, service, routes
) VALUES (
    'Pranjit Travels',
    'Bharat Benz A/C 2+1',
    36,
    ARRAY['Dhemaji', 'North Lakhimpur', 'Tezpur', 'Mangaldoi', 'Guwahati'],
    1.88,
    '21:00',
    41.3,
    'night',
    'NH15_52_D2G'
);

SELECT seat_no, bus_name FROM journey WHERE doj = '2024-09-02' AND 'Nagaon' = ANY(stoppages) OR 'Dibrugarh' = ANY(stoppages) AND array_position(stoppages, 'Nagaon') < array_position(stoppages, 'Dibrugarh');

SELECT seat_no FROM journey WHERE doj = '2024-09-02' AND 'Nagaon' = ANY(stoppages) AND 'Dibrugarh' = ANY(stoppages) AND array_position(stoppages, 'Nagaon') < array_position(stoppages, 'Dibrugarh') AND bus_name = 'Network Travels';



 WITH stop_data AS ( --This part creates a temporary result set (stop_data) which
      SELECT        --Retrieves the route_name and the stops along the route from the bus_routes table.
        route_name,
        (stop_data).name AS stop_name,
        ROW_NUMBER() OVER () AS stop_index --For each stop, it assigns a unique index (ROW_NUMBER() OVER () AS stop_index), and extracts the stop's name ((stop_data).name AS stop_name).
      FROM bus_routes, 
      UNNEST(distance) AS stop_data --UNNEST(distance) is used to "explode" the distance array (which holds the stops with their respective distances) into individual rows.
      WHERE route_name = $3 --the route_name is also used in the query to ensure the stops belong to the specified route.
    )
      SELECT array_agg(stop_name) --This part aggregates the stop names between the origin and destination into an array.
      FROM stop_data
      WHERE stop_index >= ( --It finds the stop_index for the origin stop and ensures that only stops from the origin (inclusive) onwards are selected.
        SELECT stop_index
        FROM stop_data
        WHERE stop_name = $1
        LIMIT 1
    )
    AND stop_index < ( --It limits the stops to those that come before the destination (exclusive), i.e., only stops between origin and destination are included.
      SELECT stop_index
      FROM stop_data
      WHERE stop_name = $2
      LIMIT 1
    );