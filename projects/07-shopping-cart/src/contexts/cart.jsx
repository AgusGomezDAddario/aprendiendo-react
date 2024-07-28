import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = product => {
    const productInCart = cart.findIndex(item => item.id === product.id);

    // Si el producto ya está en el carrito, se suma la cantidad
    if (productInCart >= 0) {
        const newCart = structuredClone(cart);
        newCart[productInCart].quantity += 1;
        return setCart(newCart);
    } 

    // Si el producto no está en el carrito, se agrega
    setCart(prevState => [...prevState, { ...product, quantity: 1 }]);
  }

  const removeFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id));
  }

  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ 
        cart, 
        addToCart, 
        clearCart,
        removeFromCart
        }}>
        {children}
    </CartContext.Provider>
  )
}