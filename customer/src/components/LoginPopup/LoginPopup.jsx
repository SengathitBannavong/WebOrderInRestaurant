import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({ name:"", email:"", password:""})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
        // Clear error when user is typing
        if (error) setError("");
    }

    const onLogin = async (event) => {
        event.preventDefault()
        setLoading(true);
        setError("");

        // ✅ Validation
        if (currState === "Sign Up" && !data.name.trim()) {
            setError("Name is required");
            setLoading(false);
            return;
        }
        
        if (!data.email.trim()) {
            setError("Email is required");
            setLoading(false);
            return;
        }
        
        if (!data.password.trim()) {
            setError("Password is required");
            setLoading(false);
            return;
        }

        if (data.password.length < 8) {
            setError("Password must be at least 8 characters");
            setLoading(false);
            return;
        }

        try {
            // ✅ Call real API from backend
            let newUrl = url;
            if (currState === "Login") {
                newUrl += "/api/user/login"
            } else {
                newUrl += "/api/user/register"
            }

            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                // ✅ Save token and update context
                const token = response.data.token;
                setToken(token);
                localStorage.setItem("token", token);
                
                // ✅ Close popup
                setShowLogin(false);
                
                // ✅ Reset form
                setData({ name:"", email:"", password:""});
                
                console.log("Login/Register successful!");
            } else {
                setError(response.data.message || "Authentication failed");
            }
        } catch (error) {
            console.error("Authentication error:", error);
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.message.includes('Network Error')) {
                setError("Network error. Please check your connection.");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    // ✅ Close function
    const handleClose = () => {
        if (!loading) {
            setShowLogin(false);
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    {/* ✅ FIX CLOSE ICON - Use text × instead of image */}
                    <button 
                        type="button"
                        className="login-popup-title-close" 
                        onClick={handleClose}
                        disabled={loading}
                    >
                        ×
                    </button>
                </div>

                {/* ✅ ERROR MESSAGE */}
                {error && (
                    <div className="login-popup-error">
                        {error}
                    </div>
                )}

                <div className="login-popup-inputs">
                    {currState === "Login" ? null : (
                        <input 
                            name='name' 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            placeholder='Your name' 
                            required 
                            disabled={loading}
                        />
                    )}
                    <input 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type="email" 
                        placeholder='Your email' 
                        required 
                        disabled={loading}
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder='Password (min 8 characters)' 
                        required 
                        disabled={loading}
                    />
                </div>

                <button 
                    type='submit' 
                    disabled={loading}
                    className="login-popup-submit-btn"
                >
                    {loading ? 'Processing...' : (currState === "Sign Up" ? "Create account" : "Login")}
                </button>

                <div className="login-popup-condition">
                    <input type="checkbox" required disabled={loading} />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>

                {currState === "Login" ? (
                    <p>Create a new account? 
                        <span 
                            className="login-popup-switch"
                            onClick={() => !loading && setCurrState("Sign Up")}
                            style={{ opacity: loading ? 0.5 : 1 }}
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>Already have an account? 
                        <span 
                            className="login-popup-switch"
                            onClick={() => !loading && setCurrState("Login")}
                            style={{ opacity: loading ? 0.5 : 1 }}
                        >
                            Login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    )
}

export default LoginPopup