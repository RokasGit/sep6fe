import { createContext, useState, ReactNode } from 'react';
import { Movie } from '../types/movie';

interface WatchlistContextType {
    movies: Movie[];
    setMovies: (movies: Movie[]) => void;
    removeMovie: (movie: Movie) => void;
}

export const WatchlistContext = createContext<WatchlistContextType>({
    movies: [],
    setMovies: () => {},
    removeMovie: () => {},
});

interface WatchlistProviderProps {
    children: ReactNode;
}

export const WatchlistProvider = ({ children }: WatchlistProviderProps) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    
    const removeMovie = (movie: Movie) => {
        setMovies(prevMovies => prevMovies.filter(m => movie.imdbID !== m.imdbID));
    }

    return (
        <WatchlistContext.Provider value={{ movies, setMovies, removeMovie}}>
            {children}
        </WatchlistContext.Provider>
    );
};