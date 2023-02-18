import { useDispatch, useSelector } from 'react-redux';
import { getUserBike, removeUserBike, setUserBike, clearBikesError } from "../../actions/bikes.actions";
import { useEffect, useState } from 'react';

const CheckoutPage = ( props ) => {
    const [ code, setCode ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);

    const bike = useSelector(state => state.bikes.userBike);
    const error = useSelector(state => state.bikes.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserBike());
    }, [dispatch]);

    useEffect(() => {
        if (code === '') dispatch(clearBikesError());
    }, [code, dispatch]);

    const checkoutBike = () => {
        setSubmitted(true);

        if (code) {
            dispatch(setUserBike('Checked Out', bike.location, code));
            setSubmitted(false);
        }
    };

    const cancel = () => {
        dispatch(removeUserBike(bike.location));
    }

    return (
        <div className='container checkout-container'>
            <div className='row my-3'>
                <div>
                    <h1>Check-Out Your Bike</h1>
                        { bike?.status === 'Reserved' && (
                            <div className='my-3'>
                                <h2>Your bike reservation</h2>
                                <p>Bike ID: {bike.bikeID}</p>
                                <p>Location: {bike.location}</p>
                                <div>
                                    <label htmlFor="code">Your unique code:</label>
                                    <input
                                        className="form-control"
                                        id="code"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
                                { error && (
                                    <div className="form-text error-msg">{ error }</div>
                                )}
                                { submitted && !code && (
                                    <div className="form-text error-msg">Your code is required.</div>
                                )}
                                <button 
                                    className="btn btn-primary mt-3" 
                                    onClick={() => checkoutBike()}
                                >
                                    Check-out this bike
                                </button>
                            </div>
                        )}
                        { bike?.status === 'Checked Out' && (
                            <div className='my-3'>
                                <h2>Your bike is checked out!</h2>
                                <p>Bike ID: {bike.bikeID}</p>
                                <button 
                                    className="btn btn-primary mt-3" 
                                    onClick={() => cancel()}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                        { !bike && (
                            <div className='my-3'>
                                <p>You don't have a bike reserved. Go to the Reserve tab to reserve a bike.</p>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage;