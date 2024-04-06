import React from "react";
import { Card, Button } from "react-bootstrap";

const Product = ({ product }) => {
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
        <Card.Title align="center" className="text-light pt-4 fs-5">
          {product.title}
        </Card.Title>
        <Card.Text align="center" className="text-light ">
          $ {product.price}
        </Card.Text>
        <Button variant="btn btn-outline-secondary" className="text-white ">
          Add to card
        </Button>
      </Card.Body>
    </Card>
  );
};
export default Product;
