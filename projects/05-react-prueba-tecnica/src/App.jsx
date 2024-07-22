import React, { useEffect, useState } from 'react';
import './App.css';

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com/cat/says/';
const CAT_ENDPOINT_IMAGE_PARAMS = '?size=10&color=red';

export function App (){
    const [fact, setFact] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [factError, setFactError] = useState();

    // Primer efecto para obtener un random fact
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                if (!res.ok) {
                    setFactError('Error al obtener el fact')
                }
                 return res.json()
            })
            .then(data => {
                const {fact} = data;
                setFact(fact);
            })
    }, []);

    // Segundo efecto para obtener la imagen del gato cada vez que cambia el fact
    useEffect(() => {
        if (!fact) return
        const firstWord = fact.split(' ')[0];

                fetch(`${CAT_ENDPOINT_IMAGE_URL}${firstWord}${CAT_ENDPOINT_IMAGE_PARAMS}`)
                    // .then(res => res.json())
                    .then(response => {
                        const { url } = response
                        console.log(url)
                        setImageUrl(url)
                    })
    }, [fact]);


    return(
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>} 
            {imageUrl && <img src={imageUrl} alt={`Imagen de gato, obtenida al usar la primera palabra de ${fact}`} />} 
        </main>
    )
}
