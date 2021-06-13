export interface IUserReponseDTO {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  driver_license: string;
  avatar_url(): string | null;
}
