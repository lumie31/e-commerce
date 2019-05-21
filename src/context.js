import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct
  };

  componentDidMount() {
    this.setProducts();
  }

  getItem = id => {
    return this.state.products.find(item => item.id === id);
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {
        detailProduct: product
      };
    });
  };

  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product]
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  modalOpen = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return {
        modalProduct: product,
        modalOpen: true
      };
    });
  };

  modalClose = () => {
    this.setState(() => {
      return {
        modalOpen: false
      };
    });
  };

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
      // console.log(singleItem);
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  render() {
    // console.log(this.state);
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          modalOpen: this.modalOpen,
          modalClose: this.modalClose
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
