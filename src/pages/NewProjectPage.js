import React, { useState, useEffect } from "react";
import {
  Form,
  Dropdown,
  Card,
  Segment,
  Pagination,
  Button,
  Loader,
  Dimmer
} from "semantic-ui-react";
import API from "../Adapters/API";

const options = [
  { key: "Planning", text: "Planning", value: "Planning" },
  { key: "In Progress", text: "In Progress", value: "In Progress" },
  { key: "Completed", text: "Completed", value: "Completed" }
];

const NewProjectPage = ({ history }) => {
  const [newProject, setNewProject] = useState({
    title: "",
    technologies_used: "",
    description: "",
    collaborator_size_limit: "",
    status: "Planning",
    github_link: ""
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const [repos, setRepos] = useState({
    page: "1",
    repos: [],
    pages: "1"
  });

  const fetchRepos = (page = 1) => {
    setLoading(true);
    API.getRepos(page).then(reposObj => {
      setRepos(reposObj);
      setLoading(false);
    });
  };

  useEffect(fetchRepos, []);

  const handleChange = (e, { name, value }) => {
    setNewProject({ ...newProject, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    API.newProject(newProject)
      .then(projectObj => history.push("/Projects/" + projectObj.project.id))
      .catch(errors => setErrors(errors));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Segment>
          <h4>Your Github Repos</h4>
          <Segment style={{ height: "20vh", overflowY: "auto" }}>
            {loading ? (
              <Dimmer active>
                <Loader>Loading</Loader>
              </Dimmer>
            ) : (
              <Card.Group centered>
                {repos.repos.map(repo => (
                  <Card
                    onClick={() =>
                      setNewProject({
                        planning: newProject.planning,
                        title: repo.title,
                        description: repo.description || "",
                        technologies_used: repo.technologies_used,
                        collaborator_size_limit:
                          newProject.collaborator_size_limit,
                        github_link: repo.github_link
                      })
                    }
                  >
                    <Card.Content>{repo.title}</Card.Content>
                  </Card>
                ))}
              </Card.Group>
            )}
          </Segment>

          <Segment style={{ overflowX: "scroll" }}>
            <Pagination
              defaultActivePage={repos.page}
              totalPages={repos.page_length}
              boundaryRange={0}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              pointing
              secondary
              onPageChange={(e, { activePage }) => fetchRepos(activePage)}
            ></Pagination>
          </Segment>
        </Segment>
      </div>

      {errors.length ? (
        <Segment>
          <h3>Errors!</h3>
          {errors.map(error => (
            <h4>{error}</h4>
          ))}
        </Segment>
      ) : (
        ""
      )}
      <Form.Input
        required
        fluid
        name="title"
        value={newProject.title}
        label="Project Title"
        placeholder="Title"
        onChange={handleChange}
      />
      <Form.Input
        fluid
        name="technologies_used"
        required
        label="Project Technologies"
        placeholder="For example: java, ruby on rails, websockets, etc"
        value={newProject.technologies_used}
        onChange={handleChange}
      />
      <Form.TextArea
        label={"Project Description: " + newProject.description.length + "/300"}
        required
        placeholder="Description"
        name="description"
        value={newProject.description}
        onChange={(e, attr) =>
          attr.value.length <= 300 ? handleChange(e, attr) : null
        }
      />
      <Form.Input
        required
        label="Max Collaborators"
        type="number"
        placeholder="Number of collaborators"
        name="collaborator_size_limit"
        value={newProject.collaborator_size_limit}
        onChange={handleChange}
      />
      <Form.Input
        required
        label="Timeframe"
        placeholder="Number of weeks of work estimated"
        type="number"
        name="timeframe"
        value={newProject.timeframe}
        onChange={handleChange}
      />
      <Form.Field>
        <label>Status</label>
        <Dropdown
          required
          name="status"
          value={newProject.status}
          selection
          options={options}
          onChange={handleChange}
        ></Dropdown>
      </Form.Field>
      <Form.Field>
        <label>Github Url</label>
        <Form.Input
          disabled
          fluid
          name="github_link"
          placeholder="Github Link"
          value={newProject.github_link}
        ></Form.Input>
        <Button
          primary
          onClick={() => setNewProject({ ...newProject, github_link: "" })}
        >
          Clear Github URL
        </Button>
      </Form.Field>
      <Form.Button primary>Submit</Form.Button>
    </Form>
  );
};

export default NewProjectPage;
