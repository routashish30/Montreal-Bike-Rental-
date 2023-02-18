import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getAllReports } from "../../actions/reports.actions";
import { useEffect } from 'react';

const ViewReportsPage = ( props ) => {
    const reports = useSelector((state) => state.reports.reports, shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllReports());
    }, [dispatch]);

    return (
        <div className='container inventory-container'>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h1>Loss & Damage Reports</h1>
                    <table className="table my-4">
                        <thead>
                            <tr>
                                <th>Bike ID</th>
                                <th>Status</th>
                                <th>Customer</th>
                                <th>Report</th>
                            </tr>
                        </thead>
                        <tbody>
                            { reports.length > 0 && (
                                reports.map((report) => (
                                    <tr>
                                        <td>{ report.bikeID }</td>
                                        <td>{ report.status }</td>
                                        <td>{ report.customer }</td>
                                        <td>{ report.report }</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>    
            </div>
        </div>
    )
};

export default ViewReportsPage;