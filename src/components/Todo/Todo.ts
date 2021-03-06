import "./Todo.scss";
import Form from "../Form/Form";
import ListCard from "../ListCard/ListCard";
import store from "../../configureStore";
import {
  actionAddCard,
  actionSetIdEdit,
  actionEditCard,
  actionCompleteCard,
  actionDeleteCard,
} from "../../actions/actionTodo";

class Todo {
  private els: HTMLElement;
  private inputTextElement!: HTMLInputElement;

  constructor(selector: string, todoInitialData: any) {
    this.els = document.querySelector(selector) as HTMLElement;

    const state = store.getState();
    const supportStaff = JSON.parse(localStorage.getItem("wilSupportStaff")!);

    store.setState({ ...state, todolist: todoInitialData, supportStaff });
    store.subscribe(this.update.bind(this));
    this.update();
  }

  private handleDOM() {
    const {
      todolist: { idEdit },
    } = store.getState();

    const todoElement = document.querySelector(".todo") as HTMLElement;
    const formElement = todoElement.querySelector("#form") as HTMLFormElement;

    const editElements = Array.from(
      todoElement.querySelectorAll(".edit")
    ) as HTMLButtonElement[];
    const completeElements = Array.from(
      todoElement.querySelectorAll(".complete")
    ) as HTMLButtonElement[];
    const deleteElements = Array.from(
      todoElement.querySelectorAll(".delete")
    ) as HTMLButtonElement[];

    this.inputTextElement = todoElement.querySelector(
      "#formInputText"
    ) as HTMLInputElement;

    formElement.addEventListener(
      "submit",
      idEdit ? this.handleEditCard.bind(this) : this.handleAddCard.bind(this)
    );

    editElements.forEach((element) =>
      element.addEventListener("click", this.handleSetIdEditCard.bind(this))
    );
    completeElements.forEach((element) =>
      element.addEventListener("click", this.handleCompleteCard.bind(this))
    );
    deleteElements.forEach((element) =>
      element.addEventListener("click", this.handleDeleteCard.bind(this))
    );

    const supportElements = Array.from(
      todoElement.querySelectorAll(".support")
    ) as HTMLButtonElement[];

    supportElements.forEach((element) =>
      element.addEventListener("click", this.handleSupport.bind(this))
    );
  }

  private handleAddCard(event: Event) {
    event.preventDefault();
    const { value: content } = this.inputTextElement;
    actionAddCard(content);
  }

  private handleSetIdEditCard(event: Event) {
    const id = this.getAttribute(event);
    actionSetIdEdit(id);
    this.inputTextElement.focus();
  }

  private handleEditCard(event: Event) {
    event.preventDefault();
    const { value: content } = this.inputTextElement;
    const {
      todolist: { idEdit: id },
    } = store.getState();
    actionEditCard({ id, content });
  }

  private handleCompleteCard(event: MouseEvent) {
    const id = this.getAttribute(event);
    actionCompleteCard(id);
  }

  private handleDeleteCard(event: MouseEvent) {
    const id = this.getAttribute(event);
    actionDeleteCard(id);
  }

  private getAttribute(event: Event, dataAttribute = "data-id") {
    const element = event.currentTarget as HTMLElement;
    return element.getAttribute(dataAttribute)!;
  }

  private handleSupport(event: MouseEvent) {
    event.preventDefault();
    const element = event.currentTarget as HTMLLinkElement;
    const url = element.href;
    const wdWidth = element.getAttribute("data-width");
    const wdHeight = element.getAttribute("data-heigh");

    console.log(wdWidth, wdHeight);
    window.open(url, "", `width =${wdWidth}, height =${wdHeight}`);
  }

  private renderTodo() {
    const {
      todolist: { idEdit, data: list },
    } = store.getState();

    const html = `
      <div class="todo">
        ${Form(idEdit)}
        <div class="todo__head grid">
          <div class="todo__head-status">Status</div>
          <div class="todo__head-content">Task Name</div>
          <div class="todo__head-actions">Actions</div>
        </div>
        ${ListCard(list)}
      </div>
    `;

    this.els.innerHTML = html;
  }

  private update() {
    this.renderTodo();
    this.handleDOM();
  }
}

export default Todo;
