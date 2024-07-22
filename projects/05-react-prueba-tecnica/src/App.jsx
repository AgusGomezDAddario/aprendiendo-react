import React from 'react';
import './App.css';
import { useCatImage } from './hooks/useCatImage';
import { useCatFact } from './hooks/useCatFact';

export function App() {

    const {fact, refreshFact} = useCatFact();
    const { imageUrl } = useCatImage({fact});

    const handleClick = async () => {
        refreshFact();
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <button onClick={handleClick}>Obtener nuevo fact</button>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={imageUrl} alt={`Imagen de gato, obtenida al usar la primera palabra de ${fact}`} />}
        </main>
    )
}
