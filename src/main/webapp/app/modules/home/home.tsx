import './home.scss';

import React, {useEffect} from 'react';
import {Translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {Alert, Col, Row} from 'reactstrap';
import {getEntities as getProjects} from "app/entities/project/project.reducer";
import {Redirect} from "react-router-dom";

export interface IHomeProp extends StateProps, DispatchProps {
}

export const Home = (props: IHomeProp) => {
  const {account} = props;
  const projects = props.projects;
  if (!props.isAuthenticated) {
    const { login } ={ login: { pathname: '/login' } };
    return <Redirect to={login} />;
  }
  const renderProjectsAsAnchors = () => {
    return projects.map((project) => {
      const link = './project/' + project.id;
      return <a key={project.id} href={link}>{project.name}</a>
    })
  };
  useEffect(() => {
    props.getProjects();
  }, []);

  return (
    <Row>
      <Col md="9">
        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.title" interpolate={{username: account.login}}>
                {account.login}
              </Translate>
            </Alert>
            Pick one of your projects:
            <br/>
            {renderProjectsAsAnchors()}
          </div>
        ) : (
          <div>
          </div>
        )}

      </Col>
    </Row>
  );
};

const mapStateToProps = (storeState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  projects: storeState.project.entities
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {getProjects};
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);

