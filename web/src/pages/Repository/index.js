import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import Tabs from '../../components/Tabs';

import { Loading, Owner, IssueList } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repo: PropTypes.string,
      }),
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      repository: {},
      issues: {
        all: [],
        open: [],
        closed: [],
      },
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repo);

    const [repository, allIssues, openIssues, closedIssues] = await Promise.all(
      [
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'all',
            per_page: 5,
          },
        }),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: 'closed',
            per_page: 5,
          },
        }),
      ]
    );

    this.setState({
      repository: repository.data,
      issues: {
        all: allIssues,
        open: openIssues,
        closed: closedIssues,
      },
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Tabs>
          <Tabs.Tab label="All">
            <IssueList>
              {issues.all.data.map(issue => (
                <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                    <strong>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {issue.title}
                      </a>
                      {issue.labels.map(label => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))}
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))}
            </IssueList>
          </Tabs.Tab>

          <Tabs.Tab label="Open">
            <IssueList>
              {issues.open.data.map(issue => (
                <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                    <strong>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {issue.title}
                      </a>
                      {issue.labels.map(label => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))}
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))}
            </IssueList>
          </Tabs.Tab>

          <Tabs.Tab label="Closed">
            <IssueList>
              {issues.closed.data.map(issue => (
                <li key={String(issue.id)}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                    <strong>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {issue.title}
                      </a>
                      {issue.labels.map(label => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))}
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </li>
              ))}
            </IssueList>
          </Tabs.Tab>
        </Tabs>
      </Container>
    );
  }
}
