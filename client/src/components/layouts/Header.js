import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
function Header() {
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setCurrentUser(user)
    }
  }, [])

  const logoutHandler = ()=>{
    localStorage.removeItem('user')
    message.success("Logout successfully")
    navigate("/login")
  }
  return (
    <>
      {/* <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Active</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
        </ul> */}

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* <div className="header"> */}
            <Link to="/" className="navbar-brand ms-4" >
              BUDGET-BOOK
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {" "}
                  <p className='nav-link active'>{currentUser && currentUser.username}</p>
                  {" "}
              </li>

              <li className="nav-item">
                <button  className='btn btn-dark mx-3'
                onClick={logoutHandler}>
                  Logout
                </button>
              </li>

            </ul>
          
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header