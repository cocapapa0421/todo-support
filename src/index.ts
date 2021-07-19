import "./scss/styles.scss";
import Todo from "./components/Todo/Todo";
import db from "./config/config";

function witData<T extends { new (...args: any): any }>(Component: T) {
  class TodoWithData {
    constructor(private selector: string) {
      this.init();
    }

    private init() {
      db.ref("helps").on("value", (snapshot) => {
        if (snapshot.val()) {
          new Component(this.selector, {
            status: "idle",
            data: Object.entries(snapshot.val()),
            idEdit: "",
          });
        } else {
          new Component(this.selector, {
            status: "idle",
            data: [],
            idEdit: "",
          });
        }
      });
    }
  }

  return TodoWithData;
}

const TodoWithData = witData(Todo);
new TodoWithData("#app");
