import React, { useEffect, useState } from "react";
import { Segment,Dimmer, Loader } from "semantic-ui-react";
import API from "../Adapters/API";

const ReposList = () => {
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(true);
  const getRepos = () => {
    setReposLoading(true);
    API.getRepos().then(repos => {
      setRepos(repos);
      setReposLoading(false);
    });
  };
  useEffect(getRepos, []);
  return (
    <Segment placeholder className="reposList">
      {reposLoading ? (
        <Dimmer active>
          <Loader></Loader>
        </Dimmer>
      ) : (
        <div className="reposList">
          {repos.length
            ? repos.map(repo => <h1>{repo}</h1>)
            : "No repos found!"}
        </div>
      )}
    </Segment>
  );
};

export default ReposList;
