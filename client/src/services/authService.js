import https from "./https";
import { method } from "lodash";
const url = "/user";

class AuthService {
  static async isExisting(req = {}) {
    return await https({
      url: `${url}/exists/${req.email}`,
    })
      .then((res) => res)
      .catch((err) => err);
  }

  static async login(req = {}) {
    return await https({
      url: `${url}/login`,
      data: req.body,
      method: "post",
    })
      .then((res) => res.data)
      .catch((err) => err.response.data);
  }

  static async signUp(req = {}) {
    return await https({
      url: `${url}/signUp`,
      data: req.body,
      method: "post",
    })
      .then((res) => res.data)
      .catch((err) => err.response);
  }
  static async confirm(req = {}) {
    return await https({
      url: `${url}/confirmEmail`,
      data: req.body,
      method: "post",
    })
      .then((res) => res.data)
      .catch((err) => err.response);
  }
  static async forgotPassword(req = {}) {
    return await https({
      url: `${url}/forgotPassword`,
      method: "post",
      data: req.body,
    })
      .then((res) => res.data)
      .catch((err) => err.message);
  }
  static async getUser() {
    return await https({
      url: `${url}/`,
    })
      .then((res) => res.data)
      .catch((err) => err.message);
  }
  static async reset(req = {}) {
    return await https({
      url: `${url}/resetPassword/${req.id}`,
      method: "post",
      data: req.body,
    })
      .then((res) => res.data)
      .catch((err) => err.message);
  }
}

export default AuthService;
