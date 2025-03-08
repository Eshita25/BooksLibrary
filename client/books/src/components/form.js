import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const Form = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        rating: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        console.log("jejden");
        e.preventDefault();

        if (!formData.title || !formData.author || !formData.genre || !formData.rating) {
            alert("All fields are required.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/books/addBook", formData);
            console.log("Book added:", response.data);

            if (onSubmit) {
                onSubmit(formData);
            }

            alert("Book added successfully");
            setFormData({ title: "", author: "", genre: "", rating: "" });
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add a New Book</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (1-5)"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    min="1"
                    max="5"
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Add Book</button>

            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
    },
    heading: {
        fontSize: "24px",
        color: "#333",
        marginBottom: "15px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    input: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "16px",
        outline: "none",
        transition: "border 0.3s",
    },
    button: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s",
    },
};

export default Form;  