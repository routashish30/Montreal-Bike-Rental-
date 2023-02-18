import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";

const CustomerHomePage = ( props ) => {
    const user = useSelector(state => state.auth.user);

    return (
        <div className="admin-home container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h1>Welcome {user},</h1>
                    <nav>
                        <li>
                            <Link to="/reserve">
                                <button>
                                    Reserve a Bike <ChevronRight />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/checkOut">
                                <button>
                                    Check-Out a Bike <ChevronRight />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/return">
                                <button>
                                    Return a Bike <ChevronRight />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/reports">
                                <button>
                                    Loss & Damage Reports <ChevronRight />
                                </button>
                            </Link>
                        </li>
                    </nav>
                </div>
            </div>
        </div>
    )
};

export default CustomerHomePage;