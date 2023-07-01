import { Timestamp } from "firebase/firestore";
import React, { createContext, useContext, useReducer } from "react";
import postReducer from "./PostReducer";

export interface PostType {
  id: string;
  communityName: string;
  title: string;
  body: string;
  imageURL?: string;
  videoURL?: string;
  creatorId: string;
  creatorName: string;
  createdAt: Timestamp;
  numberOfComments: number;
  upVotes: number;
}
export type PostStateType = {
  allPosts: PostType[];
  activePost?: PostType | null;
};
type PostContextProviderType = {
  children: JSX.Element;
};

const initialState = {
  allPosts: [],
  activePost: null,
};

const PostContext = createContext<{
  state: PostStateType;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

export const PostContextProvider: React.FC<PostContextProviderType> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const ctx = useContext(PostContext);
  return ctx;
};
