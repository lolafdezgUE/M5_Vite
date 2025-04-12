import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/style.css';
import Pelicula from './Pelicula'; 

export default function Buscador() {
    const [busqueda, setBusqueda] = useState(""); 
    const [peliculasEncontradas, setPeliculasEncontradas] = useState([]); 
    const navigate = useNavigate();


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDdlNmRlOGJlMjZlYmIxODBjNGE2NjQ2M2M4ZGIwYSIsIm5iZiI6MTc0NDEzOTU2Mi44ODUsInN1YiI6IjY3ZjU3NTJhZGRmOTE5NDM4N2RhMGJlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bkAzVlppSwptqwLQlqSiB3ON7BxyczgrO6HDAvZqwpY'
        }
    };

    useEffect(() => {
        if (busqueda.length > 0) {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${busqueda}&language=es-ES&page=1`, options)
                .then(res => res.json())
                .then(res => {
                    setPeliculasEncontradas(res.results);
                })
                .catch(err => console.error(err));
        } else {
            setPeliculasEncontradas([]); 
        }
    }, [busqueda]); 

    const handleInputChange = (e) => {
        setBusqueda(e.target.value); 
    };

    const handleRegresar = () => {
        navigate('/'); 
    };

    return (
        <>
           <header>
                <h1 className="titulo">Movies world</h1>
                <h2 className="subtitulo">Todo sobre tus películas favoritas</h2>
            </header>
            <button className="boton-regresar" onClick={handleRegresar}>
                Regresar
            </button>
            <div className="buscador">
                <input
                    type="text"
                    placeholder="Buscar película..."
                    value={busqueda}
                    onChange={handleInputChange}
                />
            </div>

            {peliculasEncontradas.length > 0 ? (
                <div className="listado-peliculas">
                    {peliculasEncontradas.map((pelicula) => (
                        <Pelicula key={pelicula.id} pelicula={pelicula} />
                    ))}
                </div>
            ) : (
                <p>No se encontraron resultados.</p>
            )}
        </>
    );
}
