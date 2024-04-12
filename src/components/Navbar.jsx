import React, { useEffect, useState } from "react";
import {
  Navbar as NavbarBs,
  Button,
  Container,
  Badge,
  Modal,
} from "react-bootstrap";
import productService from "../services/ProductsData";
import { BsCart } from "react-icons/bs";

import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { state, dispatch } = useCart();
  const [showCart, setShowCart] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);
  const handelAddToCard = (productId) => {
    dispatch({ type: "Add_To_Cart", payload: productId });
  };
  const handelRemoveFromCard = (productId) => {
    dispatch({ type: "Remove_from_Cart", payload: productId });
  };

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
          {state.cartItems.length === 0 ? (
            <span>Your cart is Empty!</span>
          ) : (
            state.cartItems.map((item) => {
              const product = state.allProducts.find((p) => p.id === item.id);
              return (
                <div hey={item.id} className="my-3 w-100 ">
                  <span>{`($ ${Math.floor(product.price)} )`} </span>
                  <img
                    src={product.image}
                    alt="productImage"
                    className=" px-3"
                    style={{ width: 100, height: 100 }}
                  />

                  <Button
                    variant="success"
                    className="px-3"
                    onClick={() => handelAddToCard(item.id)}
                  >
                    +
                  </Button>
                  <span className="px-3 fs-4 fw-bold ">{item.quantity}</span>
                  <Button
                    variant="danger"
                    className="px-3"
                    onClick={() => handelRemoveFromCard(item.id)}
                  >
                    -
                  </Button>
                </div>
              );
            })
          )}
        </Modal.Body>
        <Modal.Footer>
          <span className="text-dark mx-auto ">
            {" "}
            Total : $ {Math.floor(state.totalPrice)}
          </span>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success">Checkout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
