import React, { useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useCart } from "../context/CartContext";

const Product = ({ product }) => {
  const { state, dispatch, getQuantityById } = useCart();

  const handelAddToCard = () => {
    dispatch({ type: "Add_To_Cart", payload: product.id });
  };
  const handelRemoveFromCard = () => {
    dispatch({ type: "Remove_from_Cart", payload: product.id });
  };

  return (
    <Card className="mt-5 card-custom ">
      <Card.Body>
        <Card.Img
          variant="top"
          src={product.image}
          height="300px"
          width="300px"
          style={{ objectFit: "cover", borderRadius: 20 }}
        />
        <Card.Title align="center" className="text-light pt-4 fs-6 ">
          {product.title}
        </Card.Title>
        <Card.Text align="center" className="text-light fs-4 fw-bold  ">
          <span>{`$ ${product.price}`}</span>
        </Card.Text>
        {getQuantityById(product.id) === 0 ? (
          <Button
            variant="btn btn-success"
            className="text-white "
            onClick={handelAddToCard}
          >
            Add to cart
          </Button>
        ) : (
          <div className="d-flex gap-3 justify-content-center align-items-center ">
            <Button
              variant="btn btn-outline-success"
              className="text-white "
              onClick={handelAddToCard}
            >
              +
            </Button>
            <span className="fs-3 fw-bold text-light">
              {getQuantityById(product.id)}
            </span>
            <Button
              variant="btn btn-outline-danger"
              className="text-white"
              onClick={handelRemoveFromCard}
            >
              -
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
export default Product;
