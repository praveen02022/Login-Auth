import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UpdateModal from "./updatemodal";
const Dashoard: React.FC = () => {
    const [users, setUsers] = useState<any>([])
    const username = localStorage.getItem('username')
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear()
        navigate("/")

    }
    function formatDate(date: any) {
        return new Date(date).toLocaleDateString()
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/users`);
            const newData = await response.json();
            setUsers(newData)
        };
        fetchData()
    }, [])
    return (
        <div>
            <div>
                <div className="modal fade" id="exampleModalScrollable" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalScrollableTitle">profile</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <UpdateModal/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Team</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Projects</a>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center">
                        <h5 className="text-reset mt-3 m-lg-3 text-capitalize">
                            {username}
                        </h5>
                        <div className="dropleft">
                            <a
                                className="dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                            >
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                    className="rounded-circle"
                                    height="25"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" data-toggle="modal" data-target="#exampleModalScrollable">Edit Profile</a>
                                <a className="dropdown-item" onClick={logout}>logout</a>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
            <div className="container mt-5">

                <div>
                    <h6>User Registerd so for:</h6>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">s.no</th>
                            <th scope="col">username</th>
                            <th scope="col">email</th>
                            <th scope="col">mobile No</th>
                            <th scope="col">dob</th>
                            <th scope="col">age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((items: any, index: number) => <tr key={items._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{items.username}</td>
                            <td>{items.email}</td>
                            <td>{items.mobileNo}</td>
                            <td>{formatDate(items.dob)}</td>
                            <td>{items.age}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Dashoard;