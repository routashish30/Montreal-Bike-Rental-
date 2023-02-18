import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";

const AdminHomePage = ( props ) => {
    const user = useSelector(state => state.auth.user);

    return (
        <div className="admin-home container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h1>Welcome {user},</h1>
                    <nav>
                        <li>
                            <Link to="/inventory">
                                <button>
                                    View Inventory <ChevronRight />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/locations">
                                <button>
                                    View Locations <ChevronRight />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports">
                                <button>
                                    View Reports <ChevronRight />
                                </button>
                            </Link>
                        </li>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default AdminHomePage;