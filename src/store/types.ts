import { RegistrationFormProps } from "../screens/Register/store/types";
import { PostInfoScreenProps } from '../screens/Post/store/types';
import { PostListScreenProps } from "../screens/PostList/store/types";
import { LoginFormProps } from "../screens/Login/store/types";

export interface UserSession {
  isLoggedIn: boolean;
  user?: {
    email: string;
    username: string;
    firstName: string;
  },
  isLoading: boolean;
}

export interface AppErrors {
  status: number | null;
}

export interface StateProps {
  registration_screen: RegistrationFormProps;
  postList_screen: PostListScreenProps;
  postInfo_screen: PostInfoScreenProps;
  login_screen: LoginFormProps;
  user_session: UserSession;
  app_errors: AppErrors;
}