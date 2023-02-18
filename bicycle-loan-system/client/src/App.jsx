import LoginPage from './components/LoginPage.jsx';
import RegistrationPage from './components/RegistrationPage.jsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';
import { useEffect } from 'react';
import { clearAuthError, logout } from './actions/auth.actions';
import { clearLocationsError } from './actions/locations.actions';
import { clearBikesError } from './actions/bikes.actions';
import AdminHomePage from './components/admin/AdminHomePage.jsx';
import CustomerHomePage from './components/customer/CustomerHomePage.jsx';
import InventoryPage from './components/admin/InventoryPage.jsx';
import LocationsPage from './components/admin/LocationsPage.jsx';
import ReservePage from './components/customer/ReservePage.jsx';
import CheckoutPage from './components/customer/CheckoutPage.jsx';
import ReturnPage from './components/customer/ReturnPage.jsx';
import ReportsPage from './components/customer/ReportsPage.jsx';
import ViewReportsPage from './components/admin/ViewReportsPage.jsx';

const App = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);

    const user = useSelector(state => state.auth.user);
    const role = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearAuthError());
        dispatch(clearLocationsError());
        dispatch(clearBikesError());
    }, [dispatch, location]);

    useEffect(() => {
        if (user) {
            setIsAdmin(role === 'admin');
            setIsCustomer(role === 'customer');
        } else {
            setIsAdmin(false);
            setIsCustomer(false);
        }
    }, [user, role, navigate]);

    return (
        <div className="App">
            <header className="App-header p-5">
                <Link to={"/home"}><h1 className="logo-text">Montréal Bike Rentals</h1></Link>
                { user && (
                    <nav>
                        <li><Link to={"/home"}>Home</Link></li>    
                        { isAdmin && (
                            <>
                                <li><Link to={"/inventory"}>Inventory</Link></li>
                                <li><Link to={"/locations"}>Locations</Link></li>
                                <li><Link to={"/reports"}>Reports</Link></li>
                            </>
                        )}
                        { isCustomer && (
                            <>
                                <li><Link to={"/reserve"}>Reserve</Link></li>
                                <li><Link to={"/checkOut"}>Check-Out</Link></li>
                                <li><Link to={"/return"}>Return</Link></li>
                                <li><Link to={"/reports"}>Reports</Link></li>                                
                            </>
                        )}
                        <li>
                            <a href='/login' onClick={(() => dispatch(logout()))}>
                                Logout
                            </a>  
                        </li>
                    </nav>
                )}
            </header>

            <div className="m-5">
                <Routes>
                    <Route path="/" element={ <Navigate replace to="/login" /> } />
                    <Route path="/login" element={ <LoginPage />} />
                    <Route path="/register" element={ <RegistrationPage />} />
                    { isAdmin && (
                        <>
                            <Route path="/home" element={ <AdminHomePage /> } /> 
                            <Route path="/inventory" element={ <InventoryPage /> } />
                            <Route path="/locations" element={ <LocationsPage />} />
                            <Route path="/reports" element={ <ViewReportsPage /> } />
                        </>
                    )}
                    { isCustomer && (
                        <>
                            <Route path="/home" element={ <CustomerHomePage /> } /> 
                            <Route path="/reserve" element={ <ReservePage /> } /> 
                            <Route path="/checkOut" element={ <CheckoutPage /> } />
                            <Route path="/return" element={ <ReturnPage /> } />
                            <Route path="/reports" element={ <ReportsPage /> } />
                        </>
                    )}
                </Routes>
            </div>
        </div>
    );
}

export default App;
