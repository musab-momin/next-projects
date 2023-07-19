import { PostStateType } from "./PostContext";

const postReducer = (state: PostStateType, action: any) => {
  if (action.type === "ADDPOSTS") {
    const postArr = action.payload;
    return { ...state, allPosts: postArr };
  }

  if (action.type === "UPDATE_POST") {
    const updatedPosts = state.allPosts.map((post) => {
      if (post.id === action.payload.id) {
        post = action.payload;
      }
      return post;
    });
    return { ...state, allPosts: updatedPosts };
  }

  return state;
};

export default postReducer;
