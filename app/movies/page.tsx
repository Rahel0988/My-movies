"use client";
import { GET } from '../api/route';
import { useState, useEffect } from 'react';

const mockMovies = [{
    id: 1,
    title: 'Title one',
    movie_gener: 'Category 1'
}, {
    id: 2,
    title: 'Title two',
    movie_genre: 'Category 2'
}];

interface Movie {
    id: string;
    fields: {
        title: string;
        movie_genre: string;
        main_characters_actors: string;
    }
}

function Movies() {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [movies, setMovies] = useState<Movie[] | null>(null);

    useEffect(() => {
        fetch('/movies/api')
        .then(response => response.json())
        .then(data => {
            setMovies(data);
        })
        .catch(() => {
            setIsError(true);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, []);

    return (
        <main className="mt-6">
           
            <h1 className="text-cyan-500 font-bold text-2xl" >My movies List</h1>
            {/* {isError && <p>Error!</p>} */}
            {isError ? <p>Error!</p> : null}
            {isLoading && <p>Loading...</p>}
            <div>
                {movies && movies.map((elem) => {
                    return (
                        <div className='mt-5 px-5' key={elem.id}>{elem.fields.title} ({elem.fields.movie_genre})
                        <h2 className="mt-2 text-gray-700 text-xl font-semibold">Stars on the movie</h2> ({elem.fields.main_characters_actors})</div>
                    )
                })}
            </div>
        </main>
    );
}

export default Movies;