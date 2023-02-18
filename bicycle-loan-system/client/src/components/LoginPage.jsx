import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth.actions';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const LoginPage = ( props ) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const error = useSelector(state => state.auth.error);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        if (username && password) {
            dispatch(login(username, password))
            .then(() => navigate("/home"));
        }
    };

    return (
        <div className="container login-container mt-3">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="login-username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="login-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            { submitted && !username && (
                                <div className="form-text error-msg">Username is required.</div>
                            )}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="login-password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="login-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            { submitted && !password && (
                                <div className="form-text error-msg">Password is required.</div>
                            )}
                        </div>
                        { error && (
                            <div className="form-group mb-3 error-msg">{ error }</div>
                        )}
                        <div className="btn-box mt-4">
                            <div>
                                <button type="submit" className="btn btn-primary px-5">
                                    Login
                                </button>
                            </div>
                            <div className='reg-container'>
                                <p>Don't have an account?</p>
                                <Link to="/register">
                                    <button className="btn btn-primary px-5">
                                        Register
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;