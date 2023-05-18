import { Actor } from '../types/actor';
import { API_URL } from '../../external/index';

const ACTOR_URL = API_URL + '/actors';

export const getActorByName = async (name: string): Promise<Actor[]> => {
  return await fetch(`${ACTOR_URL}/${name}`)
    .then((response) => response.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw Error(err);
    });
};