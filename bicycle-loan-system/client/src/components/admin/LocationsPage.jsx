import { useEffect, useState } from "react";
import { getLocations } from "../../actions/locations.actions";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import AddNewLocationForm from "./AddNewLocationForm";

const LocationsPage = ( props ) => {
    const locations = useSelector(state => state.locations.locations, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLocations());
    }, [dispatch]);

    return (
        <div className='container locations-container'>
            <h1>Locations</h1>
            <div className='row my-3'>
                {
                    locations.length > 0 && (
                        locations.map((location, index) => (
                            <div className='col-lg-3' key={index}>
                                <div className='location-tile'>
                                    <h2>{ location.address }</h2>
                                    <p>Total spots: { location.totalSpots }</p>
                                    <p>Available bikes: { location.bikesAvailable }</p>
                                    <p>Open spots: { location.openSpots }</p>
                                </div>
                            </div>                            
                        ))
                    )
                }
                <AddNewLocationForm />
            </div>
        </div>
    )
};

export default LocationsPage;