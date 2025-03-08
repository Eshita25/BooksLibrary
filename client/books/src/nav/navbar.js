import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "1rem",
            width: "100dvw",
            position: "fixed",
            top: "0px"
        }}>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Books Library
            </div>
            <div style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer"
            }}>
                <Link to='add' style={{color:'white', textDecoration:"none"}}>
                    Add Book
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
