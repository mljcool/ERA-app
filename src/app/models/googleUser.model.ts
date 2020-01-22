export interface GoogleUser {
  id: string;
  serverAuthCode: string;
  email: string;
  familyName: string;
  givenName: string;
  imageUrl: string;
  name: string;
  authentication: {
    accessToken: string;
    idToken: string;
  };
  isLogin?: boolean;
}
