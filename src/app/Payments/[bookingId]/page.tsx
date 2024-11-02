import { pool } from "../../../../utils/dbConnect";
import PaymentForm from "./PaymentForm";

export default async function Payments({params}: {params: {bookingId: string}}){
    const bookingIds = decodeURIComponent(params.bookingId).split(',') //Will retrieve the booking ids from the URL
    let result:any = []
    await Promise.all(bookingIds.map(async (i) => { // Map over the bookingids and send a query to the db for each bookingId
        let res = await pool.query(`SELECT * FROM journey WHERE id = $1`, [i])
        result.push(res.rows[0]) //Each response will be separately stored in the result array 
    }))
    // The result array will then be send as props to a Payment Form component. Which I will create next.
    return (
        <main>
            <PaymentForm formData={result} bookingIds={bookingIds}/>
        </main>
    )
}