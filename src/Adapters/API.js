const API_ENDPOINT = "http://165.22.123.91:3001/api/v1/";
const USERS_ENDPOINT = API_ENDPOINT + "users";
const LOGIN_ENDPOINT = API_ENDPOINT + "login";
const VALIDATE_ENDPOINT = API_ENDPOINT + "validate";
const GITHUBAUTH_ENDPOINT = API_ENDPOINT + "githubAuth";
const PROJECTS_ENDPOINT = API_ENDPOINT + "projects";
const COMMENTS_ENDPOINT = API_ENDPOINT + "project_comments";
const ME_ENDPOINT = API_ENDPOINT + "me";
const COMMENTLIKE_ENDPOINT = API_ENDPOINT + "comment_likes";
const USERLIKE_ENDPOINT = API_ENDPOINT + "like";
const SEARCH_ENDPOINT = API_ENDPOINT + "search";
const COLLABORATORS_ENDPOINT = API_ENDPOINT + "collaborators";
const MESSAGES_ENDPOINT = API_ENDPOINT + "project_messages";

const jsonify = resp => {
  return resp.json().then(data => {
    if (data.errors) throw data.errors;
    else return data;
  });
};

const auth = () => ({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
});

const configObj = (method, body, auth = false) => {
  return auth
    ? {
        method,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(body)
      }
    : {
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
  fetch(VALIDATE_ENDPOINT, auth())
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

const getProjects = () => fetch(PROJECTS_ENDPOINT, auth()).then(jsonify);
const getProject = id => fetch(PROJECTS_ENDPOINT + "/" + id).then(jsonify);
const editProject = id =>
  fetch(PROJECTS_ENDPOINT + "/" + id + "/edit", auth()).then(jsonify);
const updateProject = project =>
  fetch(
    PROJECTS_ENDPOINT + "/" + project.id,
    configObj("PATCH", project, auth())
  ).then(jsonify);

const updateUser = user =>
  fetch(
    USERS_ENDPOINT + "/" + user.id,
    configObj("PATCH", { user }, auth())
  ).then(jsonify);

const getUsers = () => fetch(USERS_ENDPOINT).then(jsonify);
const getUser = id => fetch(USERS_ENDPOINT + "/" + id).then(jsonify);

const postComment = (content, project_id) =>
  fetch(
    COMMENTS_ENDPOINT,
    configObj("POST", { comment: { content, project_id } }, true)
  ).then(jsonify);

const getDashboard = () => fetch(ME_ENDPOINT, auth()).then(jsonify);

const updateLike = id =>
  fetch(PROJECTS_ENDPOINT + "/" + id + "/like", auth()).then(jsonify);

const updateCommentLike = comment_id =>
  fetch(COMMENTLIKE_ENDPOINT, configObj("POST", { comment_id }, true)).then(
    jsonify
  );

const updateUserLike = like_id =>
  fetch(USERLIKE_ENDPOINT, configObj("POST", { like_id }, true)).then(jsonify);

const newProject = newProject =>
  fetch(
    PROJECTS_ENDPOINT,
    configObj("POST", { project: newProject }, true)
  ).then(jsonify);

const search = search =>
  fetch(SEARCH_ENDPOINT, configObj("POST", { search })).then(jsonify);

const joinProject = id =>
  fetch(COLLABORATORS_ENDPOINT, configObj("POST", { id }, true)).then(jsonify);

const createProjectRepo = (id, projectDetails) =>
  fetch(
    PROJECTS_ENDPOINT + "/" + id + "/repo",
    configObj("PATCH", { projectDetails }, true)
  ).then(jsonify);

const getRepos = page =>
  fetch(
    USERS_ENDPOINT + "/repos",
    configObj("POST", { page: page }, true)
  ).then(jsonify);

const getMessages = id =>
  fetch(MESSAGES_ENDPOINT + "/" + id, auth()).then(jsonify);

const createMessage = (content, id) =>
  fetch(
    MESSAGES_ENDPOINT,
    configObj("POST", { message: { content, project_id: id } }, true)
  ).then(jsonify);

export default {
  signup,
  login,
  validate,
  githubAuth,
  getProjects,
  getProject,
  getUsers,
  getUser,
  postComment,
  getDashboard,
  updateLike,
  updateCommentLike,
  updateUserLike,
  newProject,
  search,
  joinProject,
  editProject,
  updateProject,
  createProjectRepo,
  getRepos,
  getMessages,
  createMessage,
  updateUser
};
