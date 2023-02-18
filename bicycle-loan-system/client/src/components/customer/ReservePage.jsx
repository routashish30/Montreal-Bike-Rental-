import { useEffect, useState } from "react";
import { getLocations } from "../../actions/locations.actions";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getUserBike, removeUserBike, setUserBike } from "../../actions/bikes.actions";

const ReservePage = ( props ) => {
    let locations = useSelector(state => state.locations.locations, shallowEqual);
    locations = locations.filter((location) => location.bikesAvailable > 0);
    const bike = useSelector(state => state.bikes.userBike);
    const error = useSelector(state => state.bikes.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLocations());
        dispatch(getUserBike());
    }, [dispatch]);

    const submitReservation = (location) => {
        dispatch(setUserBike('Reserved', location.address));
    }

    const cancelReservation = () => {
        dispatch(removeUserBike(bike.location));
    }

    return (
        <div className='container reserve-container'>
            <h1>Reserve a Bike</h1>
            { error && (
                <div className="form-group mb-3 error-msg">{ error }</div>
            )}
            { bike?.status === 'Reserved' && (
                <div className='row my-3'>
                    <div>
                        <h2>Your bike is reserved!</h2>
                        <p>Bike ID: {bike.bikeID}</p>
                        <p>Location: {bike.location}</p>  
                        <p>Your unique code: {bike.code}</p>
                    </div>
                    <div className='my-3'>
                        <p>Note: You can only reserve one bike at a time.</p>
                        <button 
                            className="btn btn-primary mt-3" 
                            onClick={() => cancelReservation()}
                        >
                            Cancel this reservation
                        </button>
                    </div>
                </div>
            )}
            { bike?.status === 'Checked Out' && (
                <div className='my-3'>
                    <p>You currently have a bike checked out. You cannot reserve a bike at this time.</p>
                </div>
            )}
            { !bike && (
                <div className='row my-3'>
                {
                    locations.length > 0 ? (
                        locations.map((location, index) => (
                            <div className='col-lg-3' key={index}>
                                <div className='reserve-tile'>
                                    <h2>{ location.address }</h2>
                                    <p>Available bikes: { location.bikesAvailable }</p>
                                    { location.bikesAvailable > 0 && (
                                        <button 
                                            className="btn btn-primary mt-3" 
                                            onClick={() => submitReservation(location)}
                                        >
                                            Reserve at this location
                                        </button>
                                    )}
                                </div>
                            </div>                            
                        ))
                    ) : <p>There are no available bikes at any location.</p>
                }
                </div>
            )}
        </div>
    )
};

export default ReservePage;