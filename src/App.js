import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  // onblur handling function
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newUserData = { ...userData };
    newUserData[field] = value;
    setUserData(newUserData);
  };
  //submit handler to submit the data to database
  const handleRegisterSubmit = (e) => {
    const user = userData;
    fetch("https://stormy-coast-22399.herokuapp.com/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
    // console.log(userData);
    alert("user created");
    window.relaod();
    e.preventDefault();
  };

  // user data loading
  useEffect(() => {
    fetch("https://stormy-coast-22399.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div className="container">
      <h2 className="text-center mt-3">Welcome!</h2>
      <div className="row mt-2">
        {/* registration form for creating new users */}
        <div className="col-md-4 mt-3 px-5">
          <h4>New User Registration</h4>
          <form onSubmit={handleRegisterSubmit} className="regform">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="email">E-mail</label>
                <input
                  name="email"
                  type="email"
                  onBlur={handleOnBlur}
                  className="form-control"
                  id="email"
                  pattern="[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,4}$"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  onBlur={handleOnBlur}
                  className="form-control"
                  pattern="[A-Za-z]{2,}"
                  id="firstName"
                  placeholder="Should be at least 2 characters"
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  onBlur={handleOnBlur}
                  className="form-control"
                  pattern="[A-Za-z]{2,}"
                  id="lastName"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                onBlur={handleOnBlur}
                className="form-control"
                id="address"
                placeholder="Laurem Main St"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthdate">Birth Date</label>
              <input
                type="date"
                name="birthdate"
                onBlur={handleOnBlur}
                className="form-control"
                id="birthdate"
                placeholder="Select Your Birthdate"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="contactNumber">Phone Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  className="form-control"
                  onBlur={handleOnBlur}
                  pattern="^\d{10,}$"
                  id="contactNumber"
                  placeholder="Contact No. should be 10 digits"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Register
            </button>
          </form>
        </div>
        {/* showing users by loading from server */}
        <div className="col-md-8 mt-3 px-5">
          <div className="row">
            {users.map((user) => (
              <div key={user.firstName} className="col-md-4">
                <div className="card shadow my-2 border-0 rounded p-2">
                  <div className="card-body">
                    <h5>
                      {user.firstName} {user.lastName}
                    </h5>
                    <p>{user.email}</p>
                    <p>{user.address}</p>
                    <p>{user.birthdate}</p>
                    <p>{user.contactNumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
