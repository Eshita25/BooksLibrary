import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Book = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/getBook/${id}`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching book:", error.message);
            }
        };

        fetchBook();
    }, [id]);

    return (
        <div style={{marginTop:"5rem", }}>
        <h1>
            Title:{data?.title}
        </h1>
            <h3>
            Author: {data?.author}
            </h3>
            
            <h3>
Genre:{data?.genre}
            </h3>
<h4>
    Rating:{data?.rating}
</h4>
        </div>
    );
};

export default Book;
