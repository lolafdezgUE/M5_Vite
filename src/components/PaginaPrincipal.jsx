import ListadoPeliculas from "./ListadoPeliculas";

export default function PaginaPrincipal() {
    return (
        <>
            <header>
                <h1 className="titulo">Movies world</h1>
                <h2 className="subtitulo">Todo sobre tus películas favoritas</h2>
            </header>
            <ListadoPeliculas />
        </>
    );
}