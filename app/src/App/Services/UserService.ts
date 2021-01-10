import AuthService from './AuthService';
import { NullableUser, User } from '../Models/User.model';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

class UserService {
  async get(username: string): Promise<NullableUser> {
    const authenticatedUser = AuthService.getCurrentAuthenticatedUser();
    if (authenticatedUser) {
      return axios
        .get<User>(`${API_URL}/${username}`, {
          headers: {
            Authorization: `Bearer ${authenticatedUser.jwt}`,
          },
        })
        .then((response) => response.data)
        .catch((error) => {
          console.log(error);
          return undefined;
        });
    }
    return undefined;
  }
}

export default new UserService();
