import { useState, useEffect } from 'react';

const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com/cat/says/';
const CAT_ENDPOINT_IMAGE_PARAMS = '?size=10&color=red';

export function useCatImage({fact}) {
    const [imageUrl, setImageUrl] = useState();

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

    return {imageUrl};
}