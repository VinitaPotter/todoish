import https from "./https";
const url = "/todo";

class TodoService {
  static async getAll() {
    return await https({
      url: `${url}`,
    })
      .then((res) => res)
      .catch((err) => err);
  }

  // static create(todo) {
  //   return axios.post(url, {
  //     todo,
  //   });
  // }

  // static update(id, todo) {
  //   return axios.patch(`${url}${id}`, {
  //     todo,
  //   });
  // }

  // static deleteTodo(id) {
  //   return axios.delete(`${url}${id}`);
  // }
}

export default TodoService;
