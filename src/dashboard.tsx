import { useEffect, useState } from "react";




const Dashoard: React.FC = () => {

    const [users ,setUsers] = useState<any>()
    console.log(users);
    

    // useEffect(() => {
    //     // GET request using fetch inside useEffect React hook
    //     fetch('https://api.npms.io/v2/search?q=react')
    //         .then(response => response.json())
    //         .then(data => setTotalReactPackages(data.total));
    
    // // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`http://localhost:5000/users`);
          const newData = await response.json();
          setUsers(newData)
        };
      fetchData()
      },[])

    return (
        <div>
            {/* <!-- Navbar --> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="container-fluid">
                    {/* <!-- Toggle button --> */}
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

                    {/* <!-- Collapsible wrapper --> */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* <!-- Navbar brand --> */}
                        <a className="navbar-brand mt-2 mt-lg-0" href="#">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                height="15"
                                alt="MDB Logo"
                                loading="lazy"
                            />
                        </a>
                        {/* <!-- Left links --> */}
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
                        {/* <!-- Left links --> */}
                    </div>
                    {/* <!-- Collapsible wrapper --> */}
                    {/* 
                    <!-- Right elements --> */}
                    <div className="d-flex align-items-center">
                        <p className="text-reset mt-3 m-lg-3">
                            username
                        </p>
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
                                <a className="dropdown-item" href="#">My Profile</a>
                                <a className="dropdown-item" href="#">Settings</a>
                                <a className="dropdown-item" href="#">logout</a>
                            </div>
                        </div>

                    </div>
                    {/* <!-- Right elements --> */}
                </div>
            </nav>

            <div className="container mt-5">
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
                     {users.map((items:any,index:number)=>  <tr key={items.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{items.username}</td>
                            <td>{items.email}</td>
                            <td>{items.mobileNo}</td>
                            <td>{items.dob}</td>
                            <td>{items.age}</td>
                        </tr>)} 
                    </tbody>
                </table>

            </div>

        </div>
    )

}

export default Dashoard;