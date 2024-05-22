import React,{useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { TokenAuthContext } from '../Context Api/AuthContext';


function Header({status}) {

  const {authStatus,setAuthStatus}=useContext(TokenAuthContext)

  const navigate=useNavigate()

  const handleLogout=()=>{
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    navigate('/')
    setAuthStatus(false)
  }
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" >
            <i className="fa-solid fa-layer-group" style={{ color: '#18898d' }}></i>
            {' '}
            Project Fair
          </Navbar.Brand>
          <div>
            {
              !status &&
              <button className='btn btn-outline-danger rounded' onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket fa-lg me-2"></i>
                Logout
              </button>
            }

          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header