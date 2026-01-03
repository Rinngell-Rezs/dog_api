import React from 'react';
import { Navigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

function DogDetail() {
    const breed = localStorage.getItem('breed') || '';
    const subbreed = localStorage.getItem('subbreed') || '';
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

    function downloadImage() {
        saveAs(subbreedImage, `${subbreed === '' ? breed : `${subbreed}-${breed}`}.jpg`);
    }
    return (
        <div style={{ marginTop: '2vh' }}>
            {(breed === '') && (<Navigate to="/home" />)}
            {subbreedImage ? (
                <img src={subbreedImage} alt={`${subbreed} ${breed}`} style={{ height: '50vh', borderRadius: '8px' }} />
            ) : (
                <p>Cargando imagen...</p>
            )}
            <h2>Raza: {breed}</h2>
            {subbreed !== '' && <h3>Subraza: {subbreed}</h3>}
            <button style={{ marginBottom: '3vh' }} onClick={() => {
                downloadImage();
            }}>Descargar Imagen</button>
        </div>
    )
}


export default DogDetail;
