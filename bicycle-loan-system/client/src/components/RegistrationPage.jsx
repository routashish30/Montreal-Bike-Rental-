import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../actions/auth.actions';

const RegistrationPage = ( props ) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("customer");
    const [submitted, setSubmitted] = useState(false);

    const error = useSelector(state => state.auth.error);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        if (username && password && accountType) {
            dispatch(register(username, password, accountType))
            .then(() => navigate("/home"))
            .catch(() => {});
        }
    };

    return (
        <div className="container login-container mt-3">
            <h2 className="text-center">Register</h2>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="reg-username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="reg-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            { submitted && !username && (
                                <div className="form-text error-msg">Username is required.</div>
                            )}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="reg-password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="reg-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            { submitted && !password && (
                                <div className="form-text error-msg">Password is required.</div>
                            )}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="accountTypeRadio" className="form-label">Please select your role:</label>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="accountTypeRadio" 
                                    id="customerRadio" 
                                    checked={accountType === "customer"}
                                    onChange={() => setAccountType("customer")}
                                />
                                <label className="form-check-label" htmlFor="customerRadio">
                                    Customer
                                </label>
                            </div>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="accountTypeRadio" 
                                    id="adminRadio" 
                                    checked={accountType === "admin"}
                                    onChange={() => setAccountType("admin")}
                                />
                                <label className="form-check-label" htmlFor="adminRadio">
                                    Administrator
                                </label>
                            </div>
                        </div>
                        { error && (
                            <div className="form-group mb-3 error-msg">{ error }</div>
                        )}
                        <div className="btn-box mt-4">
                            <div>
                                <button type="submit" className="btn btn-primary px-5">
                                    Register
                                </button>
                            </div>
                            <div className='reg-container'>
                                <p>Already have an account?</p>
                                <Link to="/login">
                                    <button className="btn btn-primary px-5">
                                        Login
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

export default RegistrationPage;