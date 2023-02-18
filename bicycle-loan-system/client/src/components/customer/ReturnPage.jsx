import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { clearBikesError, getUserBike, removeUserBike, setUserBike } from "../../actions/bikes.actions";
import { getLocations } from "../../actions/locations.actions";

const ReturnTile = ({ location, returnBike, error }) => {
    const [ code, setCode ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);
    const dispatch = useDispatch(); 

    useEffect(() => {
        if (code === '') dispatch(clearBikesError());
    }, [code, dispatch]);

    return (
        <div className='col-lg-3'>
            <div className='return-tile'>
                <h2>{ location.address }</h2>
                <p>Open spots: { location.openSpots }</p>
                <div>
                    <label htmlFor="code">Your unique code:</label>
                    <input
                        className="form-control"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                { submitted && !code && (
                    <div className="form-text error-msg">Your code is required.</div>
                )}
                { error && code && (
                    <div className="form-text error-msg">{ error }</div>
                )}
                { location.bikesAvailable > 0 && (
                    <button 
                        className="btn btn-primary mt-3" 
                        onClick={() => returnBike(location.address, code, setSubmitted, setCode)}
                    >
                        Return at this location
                    </button>
                )}
            </div>
        </div>    
    )
};

const ReturnPage = ( props ) => {
    let locations = useSelector(state => state.locations.locations, shallowEqual);
    locations = locations.filter((location) => location.openSpots > 0);
    const bike = useSelector(state => state.bikes.userBike);
    const error = useSelector(state => state.bikes.error);
    const dispatch = useDispatch();

    const [ returned, setReturned ] = useState(false);

    useEffect(() => {
        dispatch(getLocations());
        dispatch(getUserBike());
    }, [dispatch]);

    const returnBike = (location, code, setSubmitted, setCode) => {
        setSubmitted(true);

        if (code) {
            dispatch(removeUserBike(location, code))
            .then(() => {
                setReturned(true);
            });

            setSubmitted(false);
        }
    }

    return (
        <div className='container return-container'>
            <h1>Return Your Bike</h1>
            { bike?.status === 'Checked Out' && (
                <div className='row my-3'>
                    <div>
                        <p>Bike ID: {bike.bikeID}</p>            
                    </div>
                    <div className='row my-3'>
                        { locations.length > 0 ? (
                            locations.map((location, index) => (
                                <ReturnTile 
                                    location={location} 
                                    returnBike={returnBike} 
                                    key={index} 
                                    error={error}
                                />
                            ))) : <p>There are no open spots at any location.</p>
                        }
                    </div>
                </div>
            )}
            { !returned && (!bike || bike?.status !== 'Checked Out') && (
                <div className='row my-3'>
                    <p>You don't have a bike checked out.</p>
                </div>
            )}
            { returned && (
                <div className='row my-3'>
                    <p>Bike returned successfully!</p>
                </div>
            )}
        </div>
    )
};

export default ReturnPage;