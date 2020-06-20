import React, { Component } from "react";
import axios from "axios";
import Organization from "./components/Organization";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
  },
});

const TITLE = "React GraphQL GitHub Client";

const GET_ORGANIZATION = `
	{
		organization(login: "the-road-to-learn-react") {
			name
			url
		}
	}
`;

class App extends Component {
  state = {
    path: "the-road-to-learn-react/the-road-to-learn-react",
    organization: null,
    errors: null,
  };

  componentDidMount() {
    this.onFetchFromGithub();
  }

  onChange = (event) => {
    this.setState({
      path: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
  };

  onFetchFromGithub = () => {
    axiosGitHubGraphQL.post("", { query: GET_ORGANIZATION }).then((result) => {
      this.setState(() => ({
        organization: result.data.data.organization,
        errors: result.data.errors,
      }));
    });
  };

  render() {
    const { path, organization, errors } = this.state;
    return (
      <div>
        <h1>{TITLE}</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show open issues for https://github.com/</label>
          <input
            type="text"
            id="url"
            onChange={this.onChange}
            value={path}
            style={{ width: "300px" }}
          />
          <button type="submit">Search</button>
        </form>
        <hr />
        {organization ? (
          <Organization organization={organization} errors={errors} />
        ) : (
          <p>No information yet...</p>
        )}
      </div>
    );
  }
}

export default App;
