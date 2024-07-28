import { products as initialProducts} from "./mocks/products.json"
import { useState } from 'react'
import { Products } from "./components/Products"
import React from 'react'
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { useFilters } from "./hooks/useFilters"

function App() {
  const [products] = useState(initialProducts)
  const {filters, filterProducts} = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
    <Header />
    <Products products={filteredProducts} />
    <Footer filters={filters} />
    </>
  )
}

export default App
