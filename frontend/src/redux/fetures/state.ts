import { IUser,IUserProfileData } from "../../interfaces/UserInterface";

const user = JSON.parse(localStorage.getItem("user") as string);

interface AccountState {
  user: IUser | null;
  guest: IUserProfileData | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export const initialState: AccountState = {
  user: user ? user : null,
  guest: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
