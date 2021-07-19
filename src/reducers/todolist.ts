import { TodoStateT, ActionT } from "./../types/types";

export default function todolist(
  state: TodoStateT = { status: "idle", data: [], idEdit: "" },
  action: ActionT
) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        status: "success",
        data: action.payload.data,
      };

    case "SET_ID_EDIT":
      return {
        ...state,
        data: state.data.reverse(),
        idEdit: action.payload.id,
      };

    case "EDIT_ITEM":
      return {
        ...state,
        data: action.payload.data,
        idEdit: "",
      };

    case "COMPLETE_ITEM":
      return {
        ...state,
        data: action.payload.data,
      };

    case "DELETE_ITEM":
      return {
        ...state,
        data: action.payload.data,
      };

    default:
      return state;
  }
}
