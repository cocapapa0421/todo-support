import { Type } from "../types/types";
import store from "../configureStore";
import {
  asyncAddCard,
  asyncEditCard,
  asyncCompleteCard,
  asyncDeleteCard,
} from "../api/TodoAPI";

export async function actionAddCard(content: Type) {
  if (!content) {
    return;
  }

  const newItem = {
    content,
    complete: false,
    createdAt: Date.now().toString(),
    accessToken: "",
  };

  const data = await asyncAddCard(newItem);

  store.dispatch({
    type: "ADD_ITEM",
    payload: { data: Object.entries(data) },
  });
}

export function actionSetIdEdit(id: string) {
  if (!id) {
    return;
  }

  store.dispatch({
    type: "SET_ID_EDIT",
    payload: { id },
  });
}

export async function actionEditCard({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  if (!id || !content) {
    return;
  }
  const data = await asyncEditCard({ id, content });
  store.dispatch({
    type: "EDIT_ITEM",
    payload: { data: Object.entries(data) },
  });
}

export async function actionCompleteCard(id: string) {
  if (!id) {
    return;
  }

  const data = await asyncCompleteCard(id);

  store.dispatch({
    type: "COMPLETE_ITEM",
    payload: { data: Object.entries(data) },
  });
}

export async function actionDeleteCard(id: string) {
  if (!id) {
    return;
  }

  const data = await asyncDeleteCard(id);

  store.dispatch({
    type: "DELETE_ITEM",
    payload: { data: Object.entries(data || {}) },
  });
}
