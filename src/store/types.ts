import { RegistrationFormProps } from "../screens/Register/store/types";
import { PostInfoScreenProps } from '../screens/Post/store/types';
import { PostListScreenProps } from "../screens/PostList/store/types";


export interface StateProps {
  registration_screen: RegistrationFormProps;
  postList_screen: PostListScreenProps;
  postInfo_screen: PostInfoScreenProps;
}