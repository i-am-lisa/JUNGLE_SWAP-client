import React from  'react'
import {Navbar, Nav} from  'react-bootstrap'
import {Link} from  'react-router-dom'

function NavBar (props) {
  return (
    <>
      <Navbar bg="light"  expand="lg">
      <Navbar.Brand href="/">JungleSwap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav  className="mr-auto">
            <Link className="p-2" to="/add-form"> Add Plant </Link>
            {
              props.user ? (
                <Link className="p-2" to="/logout"> LogOut </Link>
              ) : (
                <>
                  <Link className="p-2" to="/signin"> SignIn </Link>
                  <Link className="p-2" to="/signup"> SignUp </Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>  
    </>
    )
  }
  export default NavBar