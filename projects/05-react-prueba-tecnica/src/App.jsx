import React, { useEffect, useState } from 'react';
import './App.css';
import { getRandomFact } from './services/facts';
import { useCatImage } from './hooks/useCatImage';

const useCatFact = () => {
    const [fact, setFact] = useState();

    const refreshFact = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }

    useEffect(refreshFact, []);

    return { fact, refreshFact}
}


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
