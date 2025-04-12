import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../css/style.css';

export default function DetallePelicula() {
    const { id } = useParams();

    const [pelicula, setPelicula] = useState(null);
    const [publico, setPublico] = useState('');

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDdlNmRlOGJlMjZlYmIxODBjNGE2NjQ2M2M4ZGIwYSIsIm5iZiI6MTc0NDEzOTU2Mi44ODUsInN1YiI6IjY3ZjU3NTJhZGRmOTE5NDM4N2RhMGJlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bkAzVlppSwptqwLQlqSiB3ON7BxyczgrO6HDAvZqwpY'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options)
            .then(res => res.json())
            .then(res => {
                setPelicula(res);
                if (res.adult) {
                    setPublico("Esta película es solo para adultos");
                } else {
                    setPublico("Esta película es para todos los públicos");
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    if (!pelicula) return <p>Cargando...</p>;

    return (
        <>
            <header>
                <h1 className="titulo">Movies World</h1>
                <h2 className="subtitulo">Todo sobre tus películas favoritas</h2>
            </header>
            <button className="boton-regresar" onClick={() => window.history.back()}>Regresar</button>
            <div className='detalle-pelicula'>
                <img
                    src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                    alt={pelicula.title}
                />
                <div className="infoPelicula">
                    <h3>{pelicula.title}</h3>
                    <p>{pelicula.overview}</p>
                    <p><strong>Fecha de lanzamiento:</strong> {pelicula.release_date}</p>
                    <p><strong>Calificación:</strong> {pelicula.vote_average}</p>
                    <p><strong>Lenguaje original:</strong> {pelicula.original_language}</p>
                    <p><strong>Duración:</strong> {pelicula.runtime} minutos</p>
                    <p><strong>Géneros:</strong> {pelicula.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Público:</strong> {publico}</p>
                </div>
            </div>
        </>
    );
}
