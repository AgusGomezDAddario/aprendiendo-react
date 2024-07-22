import React, { useEffect, useState } from 'react';

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
export function App (){
    const [fact, setFact] = useState();
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => res.json())
            .then(data => {
                const {fact} = data;
                setFact(fact);

                const firstWord = fact.split(' ')[0];

                fetch(`https://cataas.com/cat/says/${firstWord}?size=20&color=red`)
                    // .then(res => res.json())
                    .then(response => {
                        const { url } = response
                        console.log(url)
                        setImageUrl(url)
                    })
            })
    }, []);

    return(
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>} 
            {imageUrl && <img src={imageUrl} alt={`Imagen de gato, obtenida al usar la primera palabra de ${fact}`} />} 
        </main>
    )
}
