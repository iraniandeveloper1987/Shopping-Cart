import React from "react";
import { Navbar, Container, FormControl, Dropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { BsBasketFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" style={{ height: 80 }}>
        <Container>
          <Navbar.Brand>
            <Link to="/" className=" fs-2">
              Shopping Cart
            </Link>
          </Navbar.Brand>
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              placeholder="search a product"
              className="m-auto form-control form-control-lg  "
            />
          </Navbar.Text>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <BsBasketFill className="fs-3 " />
                <span className="p-2 fw-bold fs-5 ">{10}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{ minWidth: 380, height: 60 }}
                className="mt-2 text-lg-center  p-2 fs-3 "
              >
                <span className="">Cart is Empty!</span>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
