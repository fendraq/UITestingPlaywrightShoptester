import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer"
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

function Layout() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, login, logout } = useUser();
    const { cart } = useCart();
    const navigate = useNavigate();

    const toggleLogoutButton = () => {
        const logoutButton = document.getElementById("logout-button");
        if (user) {
            if (user.id >= 1) {
                logoutButton.style.display = "block";
            } else {
                logoutButton.style.display = "none";
            }
        } else {
            logoutButton.style.display = "none";
        }
    }

    useEffect(() => {
        toggleLogoutButton();
    });

    const handleLoginClick = () => {
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleLogoutClick = async () => {
        await fetch("/api/login", {
            method: "DELETE",
            credentials: "include"
        });
        logout();
        navigate("/");
        //console.log("Logout successful!");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.log("Email:", email);
        //console.log("Password:", password);
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            login(data);
            //console.log("Login successful!", data);

        } else {
            alert("Login failed!");
            console.error("Login failed!");
        }

        setIsDialogOpen(false);
    };
    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return <>
        <header>
            <nav className="navbar">
                {user ? <NavLink to={`/profile`}>Profile</NavLink> : null}
                <NavLink id="nav-home" to={"/"}>Home</NavLink>
                <NavLink id="nav-shop" to={"/shop"}>Shop</NavLink>
                <NavLink id="nav-cart" to={"/cart"}>Cart ({getTotalItems()})</NavLink>
                {user && user.role == "admin" ? <NavLink to={"/admin"}>Admin</NavLink> : null}
                {user ? (
                    <span id="logged-in-user">Welcome, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</span>
                ) : (
                    <button id="login-button" onClick={handleLoginClick}>Login</button>
                )}<button id="logout-button" onClick={handleLogoutClick}>Logout</button>
            </nav>
        </header>
        <main>
            <Outlet />
        </main>
        <Footer />
        {isDialogOpen && (
            <div className="dialog-overlay">
                <div className="dialog">
                    <h2>Login</h2>
                    <form id="login-form" onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <div className="button-group">
                            <button type="button" onClick={handleDialogClose}>Close</button>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </>
}

export default Layout