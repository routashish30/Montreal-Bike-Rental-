import { useState } from 'react';
import { submitReport } from '../../actions/reports.actions';
import { useDispatch, useSelector } from 'react-redux';

const ReportsPage = ( props ) => {
    const [ bikeID, setBikeID ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ report, setReport ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);

    const dispatch = useDispatch();
    const error = useSelector(state => state.reports.error);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        if (bikeID && status && report) {
            dispatch(submitReport(bikeID, status, report));
            setBikeID('');
            setStatus('');
            setReport('');
            setSubmitted(false);
        }
    };

    return (
        <div className="container reports-container mt-3">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h2 className="text-center mb-5">Submit a Loss or Damage Report</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="bikeID" className="form-label">Bike ID</label>
                            <input
                                type="number"
                                className="form-control"
                                id="bikeID"
                                value={bikeID}
                                onChange={(e) => setBikeID(e.target.value)}
                            />
                            { submitted && !bikeID && (
                                <div className="form-text error-msg">Bike ID is required.</div>
                            )}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="status" className="form-label">Issue</label>
                            <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value=''></option>
                                <option value='Damaged'>Damaged</option>
                                <option value='Lost'>Lost</option>
                            </select>
                            { submitted && !status && (
                                <div className="form-text error-msg">Status is required.</div>
                            )}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="report" className="form-label">Report</label>
                            <input
                                type="text"
                                className="form-control"
                                id="report"
                                value={report}
                                onChange={(e) => setReport(e.target.value)}
                            />
                            { submitted && !report && (
                                <div className="form-text error-msg">Report is required.</div>
                            )}
                        </div>
                        { error && (
                            <div className="form-group mb-3 error-msg">{ error }</div>
                        )}
                        <div className="btn-box mt-4">
                            <button type="submit" className="btn btn-primary px-5">
                                Submit Report
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default ReportsPage;