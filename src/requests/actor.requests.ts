import { Actor } from '../types/actor';

const API_URL = 'http://localhost:3000/bestmovies/v1/actors';

export const getActorByName = async (name: string): Promise<Actor[]> => {
  return await fetch(`${API_URL}/${name}`)
    .then((response) => response.json())
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw Error(err);
    });
};