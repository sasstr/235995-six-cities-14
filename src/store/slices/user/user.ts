import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus, NameSpace, LoadingStatus } from '../../../const';
import { User, Comment, PostComment } from '../../../types/user';
import { checkAuthAction, fetchComments, loginAction, logoutAction, postComment } from '../../api-actions';

export interface UserProps {
  authorizationStatus: AuthorizationStatus;
  isLoging: LoadingStatus;
  isLogout: LoadingStatus;
  isPosting: LoadingStatus;
  userData: User | null;
  redirectToRoute: AppRoute;
  isUserDataLoading: boolean;
  isCommentsDataLoading: boolean;
  comments: Comment[] | [];
  hasLoadCommentsError: boolean;
  hasSendCommentsError: boolean;
  postComment: null | PostComment;
}

const initialState: UserProps = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isLoging: LoadingStatus.Idle,
  isLogout: LoadingStatus.Idle,
  isPosting: LoadingStatus.Idle,
  userData: null,
  redirectToRoute: AppRoute.Root,
  isUserDataLoading: false,
  isCommentsDataLoading: false,
  comments: [],
  hasLoadCommentsError: false,
  hasSendCommentsError: false,
  postComment: null,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    addUserData: (state, action: PayloadAction<User | null>) => {
      state.userData = action.payload;
    },
    redirectToRoute: (state, action: PayloadAction<AppRoute>) => {
      state.redirectToRoute = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // fetch User Data
      .addCase(checkAuthAction.pending, (state) => {
        state.isUserDataLoading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isUserDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isUserDataLoading = false;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      // Login
      .addCase(loginAction.pending, (state) => {
        state.isLoging = LoadingStatus.Loading;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isLoging = LoadingStatus.Success;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isLoging = LoadingStatus.Error;
      })
      // logout
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      // fetchComments
      .addCase(fetchComments.pending, (state) => {
        state.isCommentsDataLoading = true;
        state.hasLoadCommentsError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[] | []>) => {
        state.comments = action.payload;
        state.isCommentsDataLoading = false;
        state.hasLoadCommentsError = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isCommentsDataLoading = false;
        state.hasLoadCommentsError = true;
      })
      // postComment
      .addCase(postComment.pending, (state) => {
        state.isPosting = LoadingStatus.Loading;
        state.hasSendCommentsError = false;
      })
      .addCase(postComment.fulfilled, (state, action: PayloadAction<PostComment | null>) => {
        state.postComment = action.payload;
        state.hasSendCommentsError = false;
        state.isPosting = LoadingStatus.Success;
      })
      .addCase(postComment.rejected, (state) => {
        state.hasSendCommentsError = true;
        state.isPosting = LoadingStatus.Error;
      });
  }
});

export const { setAuthorizationStatus, addUserData, redirectToRoute } = userSlice.actions;
