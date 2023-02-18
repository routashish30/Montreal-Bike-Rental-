import { useEffect, useState } from "react";
import { Plus } from "react-bootstrap-icons";
import { useDispatch, useSelector } from 'react-redux';
import { addBike } from "../../actions/bikes.actions";
import { getLocations } from "../../actions/locations.actions";

const AddNewBikeForm = ({ locations }) => {
    const [ status, setStatus ] = useState('Parked');
    const [ location, setLocation ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);

    const error = useSelector(state => state.bikes.error);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLocations())
    }, [dispatch])

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        if ((status === 'Parked' && location) || (status && status !== 'Parked')) {
            dispatch(addBike(status, location))
            .then(() => {
                setSubmitted(false);
            });
        }
    }

    return (
        <div className='new-bike-form mb-5'>
            <div className='title-container mb-3'>
                <Plus size={40} className='pr-4'/>
                <h2>Add new bike</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-groups mb-3'>
                    <div className='form-group'>
                        <label>Status:</label>
                        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Parked">Parked</option>
                            <option value="Storage">In Storage</option>
                        </select>
                    </div>
                    <div className='form-group location-group'>
                        <label>Location:</label>
                        <select className="form-select" value={status === 'Parked' ? location : ''} onChange={(e) => setLocation(e.target.value)} disabled={status !== 'Parked'}>
                            <option value=''></option>
                            { locations.length > 0 && (
                                locations.map((location, index) => (
                                    <option value={location.address} key={index+1}>{ location.address }</option>
                                ))
                            )}
                        </select>
                    </div>
                </div>
                <div className='submit-err-box'>
                    <div>
                        { status === 'Parked' && locations.length === 0 && (
                            <div className="form-text error-msg">You must first add a location in the Locations tab.</div>
                        )}
                        { submitted && status === 'Parked' && !location && (
                            <div className="form-text error-msg">Location is required.</div>
                        )}
                        { error && (
                            <div className="form-text error-msg">{ error }</div>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary px-5">Add</button>
                </div>
            </form>
        </div>
    )
};

export default AddNewBikeForm;