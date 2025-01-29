import { User } from "./user.interface";

export interface State {
  userState: UserState;
}

export interface UserState {
  data: User;
  loged: boolean;
}