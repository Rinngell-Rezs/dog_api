import React from 'react'
import DogCard from '../components/dogcard/dogcard';
import { Link } from 'react-router-dom';

function Home() {
    const [breeds, setBreeds] = React.useState<string[]>([]);
    const [breed, setBreed] = React.useState<string>('');
    const [subbreeds, setSubbreeds] = React.useState<string[]>([]);

    React.useEffect(() => {
        localStorage.setItem('breed', '');
        localStorage.setItem('subbreed', '');
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => {
                const breedNames = Object.keys(data.message);
                setBreeds(breedNames);
            })
            .catch(error => console.error('Error fetching breed list:', error));
    }, []);

    function handleBreedChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setBreed(event.target.value);
    }

    React.useEffect(() => {
        if (breed === '') {
            setSubbreeds([]);
            return;
        }
        fetch(`https://dog.ceo/api/breed/${breed}/list`)
            .then(response => response.json())
            .then(data => {
                const subbreedNames = data.message;
                setSubbreeds(subbreedNames);
            })
            .catch(error => console.error('Error fetching subbreed list:', error));
    }, [breed]);




    return (
        <div style={{ height: 'max-content' }}>
            <h1>Seleccione nombre de raza:</h1>
            <select onChange={handleBreedChange}>
                <option value="">-- Seleccione una raza --</option>
                {breeds.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                ))}
            </select>
            {subbreeds.length > 0 && (
                <div>
                    <h2>Subrazas disponibles para {breed}:</h2>
                    <div style={{ gridTemplateColumns: 'auto auto auto', display: 'grid', justifyContent: 'center' }}>
                        {subbreeds.map((subbreed) => (
                            <Link to={`/detail/${breed}/${subbreed}`} key={subbreed} style={{ margin: '1vh' }} onClick={
                                () => {
                                    localStorage.setItem("breed", breed);
                                    localStorage.setItem("subbreed", subbreed)
                                }}>
                                <DogCard key={subbreed} subbreed={subbreed} breed={breed} />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {subbreeds.length === 0 && breed !== '' && (
                <div>
                    <h2>No hay subrazas disponibles para {breed}.</h2>
                    <div style={{ gridTemplateColumns: '1fr', display: 'grid', justifyContent: 'center' }}>
                        <Link to={`/detail/${breed}`} style={{ margin: '1vh' }} onClick={
                            () => {
                                localStorage.setItem("breed", breed);
                                localStorage.setItem("subbreed", '')
                            }}>
                            <DogCard subbreed={''} breed={breed} />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home
