import React, { useState, useEffect } from "react";
import { Row, Col, Spinner, Container } from "react-bootstrap";
import Product from "../components/Product";
import { productList } from "../data/Items";
import productService from "../services/ProductsData";
import { useCart } from "../context/CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { state } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const data = await productService.getProducts();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row xs={1} sm={1} md={2} lg={2} xl={4} className="g-5">
        {loading ? (
          <Col align="center">
            <Spinner
              animation="grow"
              role="status"
              align="center"
              className="justify-content-center align-items-center "
            >
              <span className="visually-hidden text-light ">Loading...</span>
            </Spinner>
            <span
              className=" text-light fs-3 
             "
            >
              Loading...
            </span>
          </Col>
        ) : (
          products.map((item) => {
            return (
              <Col align="center" key={item.id}>
                <Product product={item} />
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default Shop;
