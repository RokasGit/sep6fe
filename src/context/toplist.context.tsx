import { createContext, useState, ReactNode } from 'react';
import { Movie } from '../types/movie';

interface ToplistContextType {
    movies: Movie[];
    setMovies: (movies: Movie[]) => void;
    removeMovie: (movie: Movie) => void;
}

export const ToplistContext = createContext<ToplistContextType>({
    movies: [],
    setMovies: () => {},
    removeMovie: () => {},
});

interface ToplistProviderProps {
    children: ReactNode;
}

export const ToplistProvider = ({ children }: ToplistProviderProps) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    
    const removeMovie = (movie: Movie) => {
        setMovies(prevMovies => prevMovies.filter(m => movie.imdbID !== m.imdbID));
    }

    return (
        <ToplistContext.Provider value={{ movies, setMovies, removeMovie}}>
            {children}
        </ToplistContext.Provider>
    );
};