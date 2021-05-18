export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

export interface IUpdateUserDTO {
  id: string;
  avatar?: string;
}
