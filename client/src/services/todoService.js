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

  async create({ req = {} }) {
    return await https({
      url: `${url}`,
      method: "post",
      data: req,
    })
      .then((res) => res)
      .catch((err) => err);
  }
  async update({ req = {} }) {
    console.log(req);
    return await https({
      url: `${url}/${req.id}`,
      method: "patch",
      data: req,
    })
      .then((res) => res)
      .catch((err) => err);
  }
  async deleteTodo({ req = {} }) {
    console.log(req);
    return await https({
      url: `${url}/${req.id}`,
      method: "delete",
    })
      .then((res) => res)
      .catch((err) => err);
  }
}

export default TodoService;
