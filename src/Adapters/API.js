const API_ENDPOINT = "http://localhost:3001/api/v1/";
const USERS_ENDPOINT = API_ENDPOINT + "users";
const LOGIN_ENDPOINT = API_ENDPOINT + "login";
const VALIDATE_ENDPOINT = API_ENDPOINT + "validate";
const GITHUBAUTH_ENDPOINT = API_ENDPOINT + "githubAuth";
const PROJECTS_ENDPOINT = API_ENDPOINT + "projects";

const jsonify = resp => {
  return resp.json().then(data => {
    if (data.errors) throw data.errors;
    else return data;
  });
};

const configObj = (method, body) => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  };
};

const handleUserResp = data => {
  localStorage.setItem("token", data.jwt);
  return data.user;
};

const login = userDetails =>
  fetch(LOGIN_ENDPOINT, configObj("POST", { user: userDetails }))
    .then(jsonify)
    .then(handleUserResp);

const signup = userDetails =>
  fetch(USERS_ENDPOINT, configObj("POST", { user: userDetails }))
    .then(jsonify)
    .then(handleUserResp);

const validate = () =>
  fetch(VALIDATE_ENDPOINT, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  })
    .then(jsonify)
    .then(handleUserResp);

const githubAuth = access_token =>
  fetch(GITHUBAUTH_ENDPOINT, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      Github: access_token
    }
  })
    .then(jsonify)
    .then(handleUserResp);

const getProjects = () => fetch(PROJECTS_ENDPOINT).then(jsonify);
const getProject = id => fetch(PROJECTS_ENDPOINT + "/" + id).then(jsonify);
const getUsers = () => fetch(USERS_ENDPOINT).then(jsonify);
const getUser = id => fetch(USERS_ENDPOINT + "/" + id).then(jsonify);

export default {
  signup,
  login,
  validate,
  githubAuth,
  getProjects,
  getProject,
  getUsers,
  getUser
};
