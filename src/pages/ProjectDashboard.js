import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import UsersContainer from "../Containers/UsersContainer";
import {
  Dimmer,
  Loader,
  Grid,
  Icon,
  Button,
  Dropdown,
  Form,
  Modal,
  Segment,
  Divider
} from "semantic-ui-react";
import CommentsContainer from "../Containers/CommentsContainer";

const options = [
  { key: "Planning", text: "Planning", value: "Planning" },
  { key: "In Progress", text: "In Progress", value: "In Progress" },
  { key: "Completed", text: "Completed", value: "Completed" }
];

const ProjectPage = ({
  match: {
    params: { id }
  },
  user_id,
  history
}) => {
  const [project, setProject] = useState({});
  const [projectEdit, setProjectEdit] = useState({});
  const [collabarators, setCollabarators] = useState([]);
  const [comments, setComments] = useState([]);
  const [projectLikes, setProjectLikes] = useState([]);
  const [projectDetails, setProjectDetails] = useState({ title: "" });
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [technologyEdit, setTechnologyEdit] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  const [timeframeEdit, setTimeframeEdit] = useState(false);
  const init = () => {
    API.editProject(id)
      .then(projectObj => {
        setProjectFromResp(projectObj);
      })
      .catch(errorsArray => {
        alert(errorsArray[0]);
        history.goBack();
      });
  };
  useEffect(init, []);

  const setProjectFromResp = projectObj => {
    setProject(projectObj.project);
    setProjectEdit(projectObj.project);
    setCollabarators(projectObj.collaborators);
    setComments(projectObj.comments);
    setProjectLikes(projectObj.project.project_likes);
    setProjectDetails({ title: projectObj.project.title });
    startMessages(projectObj.messages);
  };
  const startMessages = messages => {
    setMessages(messages);
    setInterval(() => {
      API.getMessages(id).then(newMessages =>
        newMessages === messages ? null : setMessages(newMessages.messages)
      );
    }, 1000);
  };

  const iconHandler = e => {
    e.preventDefault();
    API.updateLike(id).then(({ user_like, liked }) =>
      liked
        ? setProjectLikes(projectLikes.filter(like => like.id !== user_like.id))
        : setProjectLikes([...projectLikes, user_like])
    );
  };

  const update = () => {
    API.updateProject(projectEdit)
      .then(projectObj => setProjectFromResp(projectObj))
      .catch(errors => setProjectEdit(project));
  };

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return project ? (
    <Grid
      onClick={() => {
        setTitleEdit(false);
        setTechnologyEdit(false);
        setDescEdit(false);
        setTimeframeEdit(false);
      }}
    >
      <Grid.Row>
        <Grid.Column>
          <Modal
            trigger={
              <Button primary onClick={handleOpen}>
                Open Chat
              </Button>
            }
            open={modalOpen}
            onClose={handleClose}
          >
            <Segment textAlign="center" style={{ height: "40%" }}>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  API.createMessage(content, id).then(newMessage =>
                    setMessages([...messages, newMessage.message])
                  );
                  setContent("");
                }}
              >
                <Form.Input
                  required
                  fluid
                  name="content"
                  value={content}
                  label={project.title + "'s chat"}
                  placeholder="Write Message Here"
                  onChange={(e, { value }) => setContent(value)}
                />
              </Form>
              <Divider />
              {messages.length ? (
                <div style={{ height: "20vh", overflowY: "scroll" }}>
                  {messages.map(message => (
                    <div>
                      {message.user.username}: {message.content}
                    </div>
                  ))}
                </div>
              ) : (
                "No Chat Messages"
              )}
              <Divider />

              <Button color="green" onClick={handleClose} inverted>
                <Icon name="checkmark" /> Close Chat
              </Button>
            </Segment>
          </Modal>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Form
            onSubmit={e => {
              e.preventDefault();
              update();
            }}
          >
            <Dropdown
              value={projectEdit.status}
              selection
              options={options}
              onChange={(e, { value }) => {
                setProjectEdit({ ...project, status: value });
              }}
            ></Dropdown>
            <Button primary type="submit">
              Change Status
            </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          {user_id ? (
            !!projectLikes.find(like => like.user_id === user_id) ? (
              <Icon
                onClick={iconHandler}
                className="star"
                color="yellow"
                name="star"
              ></Icon>
            ) : (
              <Icon
                onClick={iconHandler}
                className="star"
                name="star outline"
              ></Icon>
            )
          ) : (
            <Icon
              className="star"
              color="yellow"
              onClick={e => {
                e.preventDefault();
                alert("You must be signed in to use this!");
              }}
              name="star outline"
            />
          )}
          {projectLikes.length}
          {titleEdit ? (
            <Form
              onSubmit={() => {
                setTitleEdit(false);
                update();
              }}
            >
              <Form.Input
                onClick={e => e.stopPropagation()}
                style={{ width: "auto" }}
                required
                value={projectEdit.title}
                onChange={(e, { value }) =>
                  setProjectEdit({ ...project, title: value })
                }
              ></Form.Input>
            </Form>
          ) : (
            <h1
              className="clickable"
              onClick={e => {
                e.stopPropagation();
                setTitleEdit(true);
              }}
            >
              {project.title}
            </h1>
          )}
          {technologyEdit ? (
            <Form
              onSubmit={() => {
                setTechnologyEdit(false);
                update();
              }}
            >
              <Form.Input
                style={{ width: "auto" }}
                onClick={e => e.stopPropagation()}
                required
                value={projectEdit.technologies_used}
                onChange={(e, { value }) =>
                  setProjectEdit({ ...project, technologies_used: value })
                }
              ></Form.Input>
            </Form>
          ) : (
            <h3
              className="clickable"
              onClick={e => {
                e.stopPropagation();
                setTechnologyEdit(true);
              }}
            >
              Made with {project.technologies_used}
            </h3>
          )}
          {descEdit ? (
            <Form
              onSubmit={() => {
                setDescEdit(false);
                update();
              }}
            >
              <Form.Input
                onClick={e => e.stopPropagation()}
                style={{ width: "auto" }}
                required
                value={projectEdit.description}
                onChange={(e, { value }) =>
                  setProjectEdit({ ...project, description: value })
                }
              ></Form.Input>
            </Form>
          ) : (
            <p
              className="clickable"
              onClick={e => {
                e.stopPropagation();
                setDescEdit(true);
              }}
            >
              {project.description}
            </p>
          )}
          {project.github_link ? (
            <Button primary href={project.github_link}>
              View On Github!
            </Button>
          ) : (
            <Form
              onSubmit={e => {
                e.preventDefault();
                API.createProjectRepo(id, projectDetails).then(projectObj =>
                  setProjectEdit(projectObj.project)
                );
              }}
            >
              <label>Create Github Repo</label>
              <Form.Input
                required
                label="Title"
                value={projectDetails.title}
                onChange={(e, { value }) => setProjectDetails({ title: value })}
              />
              <Button primary type="submit">
                New Repo
              </Button>
            </Form>
          )}
          <Button disabled>
            {collabarators.length}/{project.collaborator_size_limit}
          </Button>

          {timeframeEdit ? (
            <Form
              onSubmit={() => {
                setTimeframeEdit(false);
                update();
              }}
            >
              <Form.Input
                style={{ width: "auto" }}
                onClick={e => e.stopPropagation()}
                required
                type="number"
                value={projectEdit.timeframe}
                onChange={(e, { value }) =>
                  setProjectEdit({ ...project, timeframe: value })
                }
              ></Form.Input>
            </Form>
          ) : (
            <h3
              className="clickable"
              onClick={e => {
                e.stopPropagation();
                setTimeframeEdit(true);
              }}
            >
              Timeframe - {project.timeframe} weeks
            </h3>
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <UsersContainer
            users={collabarators}
            user_id={user_id}
            history={history}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <CommentsContainer
            comments={comments}
            project_id={id}
            setComments={setComments}
            user_id={user_id}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
};

export default ProjectPage;
