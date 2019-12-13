import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import API from "../Adapters/API";

const NewProjectPage = () => {
  const [newProject, setNewProject] = useState({
    title: "",
    technologies_used: "",
    description: "",
    collaborator_size_limit: "",
    status: "planning"
  });

  const handleChange = (e, { name, value }) => {
    setNewProject({ ...newProject, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    API.newProject(newProject).then(console.log);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        required
        fluid
        name="title"
        value={newProject.title}
        label="Project Title"
        placeholder="title"
        onChange={handleChange}
      />
      <Form.Input
        fluid
        name="technologies_used"
        required
        label="Project Technologies"
        placeholder="for example: java, ruby on rails, websockets, etc"
        value={newProject.technologies_used}
        onChange={handleChange}
      />
      <Form.TextArea
        label="Project Desc"
        required
        placeholder="Description"
        name="description"
        value={newProject.description}
        onChange={handleChange}
      />
      <Form.Input
        required
        label="Max Collabarators"
        type="number"
        name="collaborator_size_limit"
        value={newProject.collaborator_size_limit}
        onChange={handleChange}
      />
      <Form.Input
        required
        label="Status"
        name="status"
        value={newProject.status}
        onChange={handleChange}
      />
      <Form.Button>Submit</Form.Button>
    </Form>
  );
};

export default NewProjectPage;
