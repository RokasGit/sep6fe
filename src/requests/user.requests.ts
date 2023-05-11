import { User } from "../types/user";

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
}
