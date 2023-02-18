import { useEffect, useState } from "react";
import { Plus } from "react-bootstrap-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addLocation } from "../../actions/locations.actions";

const AddNewLocationForm = ( props ) => {
    const [ address, setAddress ] = useState('');
    const [ totalSpots, setTotalSpots ] = useState('');
    const [ availBikes, setAvailBikes ] = useState('');
    const [ openSpots, setOpenSpots ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);

    const error = useSelector(state => state.locations.error);

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        if (address && totalSpots && availBikes && openSpots) {
            dispatch(addLocation(address, totalSpots, availBikes, openSpots))
            .then(() => {
                setAddress('');
                setTotalSpots('');
                setAvailBikes('');
                setOpenSpots('');
                setSubmitted(false);
            });
        }
    }

    return (
        <div className='col-lg-3'>
            <div className='location-tile new-location-form'>
                <div className='title-container mb-3'>
                    <Plus size={40} className='pr-4'/>
                    <h2>Add new location</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Address:</label>
                        <input 
                            type="text"
                            id="new-loc-address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    { submitted && !address && (
                        <div className="form-text error-msg">Address is required.</div>
                    )}  
                    <div className='form-group'>
                        <label>Total Spots:</label>
                        <input 
                            type="number"
                            id="new-loc-total-spots"
                            value={totalSpots}
                            onChange={(e) => setTotalSpots(e.target.value)}
                        />
                    </div>
                    { submitted && !totalSpots && (
                            <div className="form-text error-msg">Total spots is required.</div>
                    )}
                    <div className='form-group'>
                        <label>Available Bikes:</label>
                        <input 
                            type="number"
                            id="new-loc-avail-bikes"
                            value={availBikes}
                            onChange={(e) => setAvailBikes(e.target.value)}
                        />
                    </div> 
                    { submitted && !availBikes && (
                        <div className="form-text error-msg">Available bikes is required.</div>
                    )}
                    <div className='form-group'>
                        <label>Open Spots:</label>
                        <input 
                            type="number"
                            id="new-loc-avail-bikes"
                            value={openSpots}
                            onChange={(e) => setOpenSpots(e.target.value)}
                        />
                    </div> 
                    { submitted && !openSpots && (
                        <div className="form-text error-msg">Open spots is required.</div>
                    )}
                    { error && (
                        <div className="form-group mb-3 error-msg">{ error }</div>
                    )}
                    <button type="submit" className="btn btn-primary px-5 mt-3">Add</button>
                </form>
            </div>
        </div>
    )
};

export default AddNewLocationForm;