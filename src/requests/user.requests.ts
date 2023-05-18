import { User } from "../types/user";
import { Toplist } from "../types/toplist";
import { Watchlist } from "../types/watchlist";

const API_URL = "http://localhost:3000/bestmovies/v1/users";

export default class UserRequests {
  static async registerUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    try {
      const user = {
        username: username,
        email: email,
        password: password,
      };
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      }

      return data;
    } catch (error: any) {
      throw Error(error.message);
    }
  }

  static async loginUser(email: string, password: string): Promise<User> {
    try {
      const user = {
        email: email,
        password: password,
      };
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      }

      return data;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
  static async getUserProfile(
    id: number
  ): Promise<{ user: User; toplist: Toplist; watchlist: Watchlist }> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      }

      return data;
    } catch (error: any) {
      throw Error(error.message);
    }
  }
}
