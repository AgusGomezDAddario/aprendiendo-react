import { products as initialProducts} from "./mocks/products.json"
import { useState } from 'react'
import { Products } from "./components/Products"
import React from 'react'
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { useFilters } from "./hooks/useFilters"
import { Cart } from "./components/Cart"
import { CartProvider } from "./contexts/cart"

function App() {
  const [products] = useState(initialProducts)
  const {filters, filterProducts} = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      <Footer filters={filters} />
    </CartProvider>
  )
}


export default App
