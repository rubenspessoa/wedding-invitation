import AuthService from '../Services/AuthService';

export const checkJwtUser = (usernameFromUrl: string, unauthorizedCallback: () => void) => {
  const usernameFromJwt = AuthService.getLoggedInUsername();

  if (usernameFromJwt && usernameFromUrl !== '') {
    if (usernameFromJwt !== usernameFromUrl) {
      unauthorizedCallback();
    }
  } else {
    unauthorizedCallback();
  }
};
