const productList = [
  {
    id: "1",
    title: "Product 1",
    price: 99,
    image: "/images/product1.jpg",
  },
  {
    id: "2",
    title: "Product 2",
    price: 60,
    image: "/images/product2.jpg",
  },
  {
    id: "3",
    title: "Product 3",
    price: 180,
    image: "/images/product3.jpg",
  },
  {
    id: "4",
    title: "Product 4",
    price: 140,
    image: "/images/product4.jpg",
  },
];

const getProductData = (id) => {
  const product = productList.find((item) => {
    return item.id === id;
  });
  return product;
};

export { productList, getProductData };
