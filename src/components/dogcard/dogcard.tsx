import React from 'react'

function DogCard({ subbreed, breed }: { subbreed: string; breed: string }) {

    const [subbreedImage, setSubbreedImage] = React.useState<string>('');

    React.useEffect(() => {
        if (subbreed === '') {
            // Fetch image for breed only
            fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
                .then(response => response.json())
                .then(data => {
                    setSubbreedImage(data.message);
                })
                .catch(error => console.error('Error fetching breed image:', error));
            return;
        } else {

            fetch(`https://dog.ceo/api/breed/${breed}/${subbreed}/images/random`)
                .then(response => response.json())
                .then(data => {
                    setSubbreedImage(data.message);
                })
                .catch(error => console.error('Error fetching subbreed image:', error));
        }
    }, [breed, subbreed]);

    return (
        <div key={subbreed} style={{ marginTop: '2vh' }}>
            {subbreedImage ? (
                <img src={subbreedImage} alt={`${subbreed} ${breed}`} style={{ height: '20vh', borderRadius: '8px' }} />
            ) : (
                <p>Cargando imagen...</p>
            )}
            <h3>{subbreed === '' ? breed : `${subbreed} ${breed}`}</h3>
        </div>
    )
}
export default DogCard
