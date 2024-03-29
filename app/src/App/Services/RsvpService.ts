import AuthService from './AuthService';
import { NullableRsvp, Rsvp } from '../Models/Rsvp.model';
import axios from 'axios';

const API_URL = 'https://vanessaerubens.com/api/rsvp';

class RsvpService {
  async get(name: string): Promise<NullableRsvp> {
    const authenticatedUser = AuthService.getCurrentAuthenticatedUser();
    if (authenticatedUser) {
      return axios
        .get<Rsvp>(`${API_URL}/${name}`, {
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

  async update(rsvp: Rsvp): Promise<NullableRsvp> {
    const authenticatedUser = AuthService.getCurrentAuthenticatedUser();
    if (authenticatedUser) {
      return axios
        .put<Rsvp>(
          `${API_URL}/${rsvp._id}`,
          {
            name: rsvp.name,
            isGoing: rsvp.isGoing,
            isStayingAtHotel: rsvp.isStayingAtHotel,
            havePlusOne: rsvp.havePlusOne,
            plusOneIsStayingAtHotel: rsvp.plusOneIsStayingAtHotel,
            foodAllergies: rsvp.foodAllergies,
          },
          {
            headers: {
              Authorization: `Bearer ${authenticatedUser.jwt}`,
            },
          },
        )
        .then((response) => {
          alert('Resposta enviada com sucesso.');
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return undefined;
        });
    }

    return undefined;
  }

  async post(
    name: string,
    isGoing: boolean,
    isStayingAtHotel: boolean,
    havePlusOne: boolean,
    plusOneIsStayingAtHotel: boolean,
    foodAllergies: string,
  ): Promise<NullableRsvp> {
    const authenticatedUser = AuthService.getCurrentAuthenticatedUser();
    if (authenticatedUser) {
      axios
        .post<Rsvp>(
          API_URL,
          {
            name,
            isGoing,
            isStayingAtHotel,
            havePlusOne,
            plusOneIsStayingAtHotel,
            foodAllergies,
          },
          {
            headers: {
              Authorization: `Bearer ${authenticatedUser.jwt}`,
            },
          },
        )
        .then((response) => {
          alert('Resposta enviada com sucesso.');
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return undefined;
        });
    }

    return undefined;
  }
}

export default new RsvpService();
