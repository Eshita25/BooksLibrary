import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MainBox = () => {
    const [books, setBooks] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [rating, setRating] = useState('');
    const [page, setPage] = useState(1);
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [totalPage, setTotalPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/getAllBook`, {
                    params: {
                        page,
                        limit,
                        genre: searchValue || undefined,
                        rating: rating,
                        auhtor: author,
                        title: title
                    }
                });
                setBooks(response.data.books);
                setTotalPage(Math.ceil(response.data.num / limit));
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, [page, searchValue, rating, author, title]);

    return (
        <div style={{ width: "80vw", height: "85vh", display: "flex", marginTop: "4rem", flexDirection: "column" }}>
            <div style={{ width: "100%" }}>
                <label>Genre: </label>
                <input
                    type="text"
                    placeholder="Genre"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <div style={{ width: "100%" }}>
                <label>Rating: </label>
                <input
                    type="number"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}

                />
            </div>
            <div style={{ width: "100%" }}>
                <label>Title: </label>
                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setRating(e.target.value)}

                />
            </div>
            <div style={{ width: "100%" }}>
                <label>Author: </label>
                <input
                    type="text"
                    placeholder="author"
                    value={author}
                    onChange={(e) => setRating(e.target.value)}

                />
            </div>

            <table style={{ borderCollapse: "collapse", marginTop: "1rem" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid grey", padding: "8px" }}>Title</th>
                        <th style={{ border: "1px solid grey", padding: "8px" }}>Author</th>
                        <th style={{ border: "1px solid grey", padding: "8px" }}>Genre</th>
                        <th style={{ border: "1px solid grey", padding: "8px" }}>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, idx) => (
                        <tr key={idx}>
                            <td style={{ border: "1px solid grey", padding: "8px" }}>
                                <Link to={`books/${book._id}`} style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>
                                    {book.title}
                                </Link>
                            </td>
                            <td style={{ border: "1px solid grey", padding: "8px" }}>{book.author}</td>
                            <td style={{ border: "1px solid grey", padding: "8px" }}>{book.genre}</td>
                            <td style={{ border: "1px solid grey", padding: "8px" }}>{book.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <button
                    style={{ padding: "0.5rem 1rem", margin: "0 1rem", backgroundColor: page === 1 ? "grey" : "#007bff", color: "white", borderRadius: "5px", border: "none", cursor: page === 1 ? "not-allowed" : "pointer" }}
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>
                Page {page} of {totalPage}
                <button
                    style={{ padding: "0.5rem 1rem", margin: "0 1rem", backgroundColor: page >= totalPage ? "grey" : "#007bff", color: "white", borderRadius: "5px", border: "none", cursor: page >= totalPage ? "not-allowed" : "pointer" }}
                    disabled={page >= totalPage}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MainBox;
