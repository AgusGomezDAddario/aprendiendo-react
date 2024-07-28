import "./Filters.css";
import { useState, useId } from "react";
import { useFilters } from "../hooks/useFilters";

export function Filters({}) {

    const {setFilters} = useFilters();
    const [minPrice, setMinPrice] = useState(0);
    const minPriceFilterID = useId();
    const categoryFilterID = useId();

    const handleChangeMinPrice = (event) => {
        setMinPrice(event.target.value);
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))}

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterID}>
                    Precio
                </label>
                <input type="range" id={minPriceFilterID} min="0" max="1000" onChange={handleChangeMinPrice}/>
                <span>${minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterID}>Categoría</label>
                <select id={categoryFilterID} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="beauty">Beauty</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="furniture">Furniture</option>
                    <option value="groceries">Groceries</option>
                </select>
            </div>

        </section>
    )
}