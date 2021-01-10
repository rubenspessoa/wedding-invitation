import { Auth, NullableAuth } from '../Models/Auth.model';
import { Jwt } from '../Models/Jwt.model';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = 'http://vanessaerubens.com/api/auth/login/';
const USER_KEY = 'user';

class AuthService {
  async login(username: string, password: string) {
    return axios
      .post<Auth>(API_URL, {
        username,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem(USER_KEY, JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    localStorage.removeItem(USER_KEY);
  }

  getCurrentAuthenticatedUser(): NullableAuth {
    const user = localStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user) as Auth;
    }

    return undefined;
  }

  getLoggedInUsername(): string | undefined {
    const authenticatedUser = this.getCurrentAuthenticatedUser();

    if (authenticatedUser) {
      const decodedJwt = jwt_decode<Jwt>(authenticatedUser.jwt);
      return decodedJwt.username;
    }

    return undefined;
  }
}

export default new AuthService();
