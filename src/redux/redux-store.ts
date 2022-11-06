import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import sidebarReducer from "./sidebar-reducer";
import {ActionsTypes, RootStateType} from "./store";

export type StoreReduxType = {
    getState: () => RootStateType
    subscribe: (observer:
                    () => void) => void
    dispatch: (action: ActionsTypes) => void
}


let rootReduser = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    sidebar: sidebarReducer
})

// state All application
export type AppStateType = ReturnType<typeof rootReduser>;

let store = createStore(rootReduser);
window.store = store

export default store;
