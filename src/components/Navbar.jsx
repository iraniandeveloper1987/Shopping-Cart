import React, { useEffect, useState } from "react";
import {
  Navbar as NavbarBs,
  Button,
  Container,
  Badge,
  Modal,
} from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { state, dispatch } = useCart();
  const [showCart, setShowCart] = useState(false);
  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  return (
    <>
      <NavbarBs className="border-bottom  border-secondary  ">
        <Container>
          <NavbarBs.Text>
            <NavbarBs.Brand className="text-white fs-1  fw-bolder ">
              MYShopping
            </NavbarBs.Brand>
          </NavbarBs.Text>

          <NavbarBs.Collapse className=" justify-content-end  ">
            <Button
              variant="btn btn-outline-success"
              className="text-white"
              onClick={handleShow}
            >
              <BsCart className="mx-1 fs-2 fw-bold pb-2 "></BsCart>
              <span className="fs-5 fw-bold ">
                <Badge className="bg-success ">
                  {state.totalCount > 0 ? state.totalCount : 0}
                </Badge>
              </span>
            </Button>
          </NavbarBs.Collapse>
        </Container>
      </NavbarBs>
      <Modal
        show={showCart}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton centered className="text-dark">
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark text-center ">
          Your cart is Empty!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleClose}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
