import https from "./https";
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
}

export default AuthService;
