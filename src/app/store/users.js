import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import userService from '../services/user.service';
import history from '../utils/history';
import randomInt from '../utils/randomInt';

const initialState = localStorageService.getAccessToken()
   ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoader: false
     }
   : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoader: false
     };
const usersSlice = createSlice({
   name: 'users',
   initialState,
   reducers: {
      usersRequested: (state) => {
         state.isLoading = true;
      },
      usersReceived: (state, action) => {
         state.entities = action.payload;
         state.dataLoader = true;
         state.isLoading = false;
      },
      usersRequestFailed: (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      },
      authRequestedSucces: (state, action) => {
         state.auth = action.payload;
         state.isLoggedIn = true;
      },
      authRequestedFail: (state, action) => {
         state.error = action.payload;
      },
      userCreated: (state, action) => {
         if (!Array.isArray(state.entities)) {
            state.entities = [];
         }
         state.entities.push(action.payload);
      },
      userLoggedOut: (state) => {
         state.entities = null;
         state.isLoggedIn = false;
         state.auth = null;
         state.dataLoader = false;
      },
      userUpdateSucces: (state, action) => {
         state.entities[
            state.entities.findIndex((u) => (u._id = action.payload._id))
         ] = action.payload;
      }
   }
});
const { reducer: usersReducer, actions } = usersSlice;
const {
   usersRequested,
   usersReceived,
   usersRequestFailed,
   authRequestedSucces,
   authRequestedFail,
   userCreated,
   userLoggedOut,
   userUpdateSucces
} = actions;

export const loadUsersList = () => async (dispatch) => {
   dispatch(usersRequested());
   try {
      const { content } = await userService.get();
      dispatch(usersReceived(content));
   } catch (error) {
      dispatch(usersRequestFailed(error.message));
   }
};
export const updateUser = (payload) => async (dispatch) => {
   dispatch(userUpdateRequested());
   try {
      const { content } = await userService.update(payload);
      dispatch(userUpdateSucces(content));
      history.push(`/users/${content._id}`);
   } catch (error) {
      dispatch(userUpdateFailed(error.message));
   }
};
const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('users/userCreateRequested');
const createUserFailed = createAction('users/createUserFailed');
const userUpdateFailed = createAction('users/userUpdateFailed');
const userUpdateRequested = createAction('users/userUpdateRequested');

export const login =
   ({ payload, redirect }) =>
   async (dispatch) => {
      const { email, password } = payload;
      dispatch(authRequested());
      try {
         const data = await authService.login(email, password);
         dispatch(authRequestedSucces({ userId: data.localId }));
         localStorageService.setTokens(data);
         history.push(redirect);
      } catch (error) {
         dispatch(authRequestedFail(error.message));
      }
   };

export const signUp =
   ({ email, password, ...rest }) =>
   async (dispatch) => {
      dispatch(authRequested());
      try {
         const data = await authService.register({ email, password });
         localStorageService.setTokens(data);
         dispatch(authRequestedSucces({ userId: data.localId }));
         dispatch(
            createUser({
               _id: data.localId,
               email,
               rate: randomInt(1, 5),
               completedMeetings: randomInt(0, 200),
               image: `https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() + 1
               )
                  .toString(36)
                  .substring(7)}.svg`,
               ...rest
            })
         );
      } catch (error) {
         dispatch(authRequestedFail(error.message));
      }
   };
export const logOut = () => (dispatch) => {
   localStorageService.removeAuthData();
   dispatch(userLoggedOut());
   history.push('/');
};
function createUser(payload) {
   return async function (dispatch) {
      dispatch(userCreateRequested());
      try {
         const { content } = await userService.create(payload);
         dispatch(userCreated(content));
         history.push('/users');
      } catch (error) {
         dispatch(createUserFailed(error.message));
      }
   };
}
export const getUsersList = () => (state) => state.users.entities;

export const getUserById = (id) => (state) => {
   if (state.users.entities) {
      return state.users.entities.find((user) => user._id === id);
   }
};
export const getCurrentUserData = () => (state) => {
   return state.users.entities
      ? state.users.entities.find(
           (user) => user._id === state.users.auth.userId
        )
      : null;
};
export const getIsLoggedIn = () => (state) => {
   return state.users.isLoggedIn;
};
export const getUsersLoadingStatus = () => (state) => {
   return state.user.isLoading;
};
export const getDataStatus = () => (state) => {
   return state.users.dataLoader;
};
export const getCurrentUserId = () => (state) => {
   return state.users.auth.userId;
};

export default usersReducer;
