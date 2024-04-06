import React from "react";
import { Navbar as NavbarBs, Button, Container } from "react-bootstrap";
import { BsCart } from "react-icons/bs";

const Navbar = () => {
  return (
    <NavbarBs className="border-bottom  border-secondary  ">
      <Container>
        <NavbarBs.Text>
          <NavbarBs.Brand className="text-white fs-1  fw-bolder ">
            MYShopping
          </NavbarBs.Brand>
        </NavbarBs.Text>

        <NavbarBs.Collapse className=" justify-content-end  ">
          <Button variant="btn btn-outline-secondary" className="text-white ">
            <BsCart className="mx-2 fs-2 fw-bold pb-2 "></BsCart>
            <span className="fs-5 fw-bold ">Shopping Cart</span>
          </Button>
        </NavbarBs.Collapse>
      </Container>
    </NavbarBs>
  );
};

export default Navbar;
