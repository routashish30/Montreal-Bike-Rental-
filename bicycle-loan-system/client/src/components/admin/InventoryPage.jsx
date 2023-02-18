import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllBikes, updateBike } from "../../actions/bikes.actions";
import AddNewBikeForm from "./AddNewBikeForm";

const TableRow = ({ bike, locations }) => {
    const [ status, setStatus ] = useState(bike.status);
    const [ location, setLocation ] = useState(bike.location);

    const dispatch = useDispatch();

    const enableLocation = ['Parked', 'Reserved'];
    const enableStatus = ['Parked', 'Damaged', 'Storage', 'Lost'];

    useEffect(() => {
        if (status !== bike.status || location !== bike.location) {
            // parked bikes require a location
            if (status === 'Parked' && location) {
                dispatch(updateBike(bike.bikeID, status, location));
            } else if (status !== 'Parked') {
                dispatch(updateBike(bike.bikeID, status));
            }
        }

    }, [status, location, dispatch, bike.status, bike.location, bike.bikeID]);

    return (
        <tr>
            <td>{ bike.bikeID }</td>
            <td>
                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} disabled={!enableStatus.includes(bike.status)}>
                    <option value="Parked">Parked</option>
                    <option value="Storage">In Storage</option>
                    <option value="Damaged">Damaged</option>
                    <option value="Lost">Lost</option>
                    { bike.status === 'Checked Out' && <option value="Checked Out">Checked Out</option> }
                    { bike.status === 'Reserved' && <option value="Reserved">Reserved</option> }
                </select>
            </td>
            <td>{ bike.customer || 'N/A' }</td>
            <td>
                <select className="form-select" value={enableLocation.includes(status) ? location : 'N/A'} onChange={(e) => setLocation(e.target.value)} disabled={status !== 'Parked'}>
                    <option value={enableLocation.includes(status) ? location : ''}>{enableLocation.includes(status) ? location : 'N/A'}</option>
                    { locations.length > 0 && (
                        locations.filter(loc => loc.address !== location).map((loc, index) => (
                            <option value={loc.address} key={index+1}>{ loc.address }</option>
                        ))
                    )}
                </select>
            </td>
        </tr>
    )
};

const InventoryPage = ( props ) => {
    const bikes = useSelector((state) => state.bikes.bikes, shallowEqual);
    let locations = useSelector(state => state.locations.locations);
    locations = locations.filter(loc => loc.openSpots > 0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBikes());
    }, [dispatch]);

    const renderBikeRows = () => {
        return bikes.map((bike, index) => <TableRow bike={bike} key={index} locations={locations}/>)
    };

    return (
        <div className='container inventory-container'>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h1>Inventory</h1>
                    <table className="table my-4">
                        <thead>
                            <tr>
                                <th>Bike ID</th>
                                <th>Status</th>
                                <th>Customer</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            { bikes.length > 0 && renderBikeRows() }
                        </tbody>
                    </table>
                    <AddNewBikeForm locations={locations}/>
                </div>    
            </div>
        </div>
    )
};

export default InventoryPage;