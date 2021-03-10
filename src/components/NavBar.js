import React from  'react'
import {Navbar, Nav} from  'react-bootstrap'
import {Link} from  'react-router-dom'
import { ScrollTo } from "react-scroll-to";

function NavBar (props) {
  const myRef = React.createRef();

  return (
    <>
      <Navbar  className="pl-5" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="/"> JungleSwap </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav  className="mr-auto">
            <Link className="p-2" to="/add-form"> Add Plant </Link>
            {
              <ScrollTo >
                  {({ scroll }) => (
                    <Link className="p-2" onClick={() => scroll({y: 820, smooth: true})}>All Plants</Link>
                  )}
              </ScrollTo>
            }
            <Link className="p-2" to="/myrequests"> Messages </Link>
            {
              props.user ? (
                <Link className="p-2" to="/logout"> Log out </Link>
              ) : (
                <>
                  <Link className="p-2" to="/signin"> Sign in </Link>
                  <Link className="p-2" to="/signup"> Sign up </Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>  
    </>
  );
}

export default NavBar;