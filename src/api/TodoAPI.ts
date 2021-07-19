import { CardT } from "./../types/types";
import db from "../config/config";
const todoappRef = db.ref("todoapp-ae180-default-rtdb");

export interface CardResultT {
  [key: string]: CardT;
}

export async function asyncAddCard(item: CardT) {
  const newCardRef = todoappRef.push();
  await newCardRef.set(item);

  const respon = await todoappRef.once("value");

  return respon.val();
}

export async function asyncEditCard({
  id,
  content,
}: {
  id: string;
  content: string;
}) {
  await db.ref(`todoapp-ae180-default-rtdb/${id}`).update({ content });
  const respon = await todoappRef.once("value");

  return respon.val();
}

export async function asyncCompleteCard(id: string) {
  await db.ref(`todoapp-ae180-default-rtdb/${id}`).once("value", (snapshot) => {
    if (snapshot.val()) {
      snapshot.ref.update({ complete: !snapshot.val().complete });
    }
  });
  const respon = await todoappRef.once("value");

  return respon.val();
}

export async function asyncDeleteCard(id: string) {
  await db.ref(`todoapp-ae180-default-rtdb/${id}`).remove();
  const respon = await todoappRef.once("value");

  return respon.val();
}
