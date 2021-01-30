import './home.scss';

import React, {useEffect} from 'react';
import {Translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {Alert, Col, Row} from 'reactstrap';
import {getEntities as getProjects} from "app/entities/project/project.reducer";
import {Redirect} from "react-router-dom";
import ProjectsSummary from "app/modules/home/projects-summary";

export interface IHomeProp extends StateProps, DispatchProps {
}

export const Home = (props: IHomeProp) => {
  const {account} = props;
  const projects = props.projects;
  if (!props.isAuthenticated) {
    const { login } ={ login: { pathname: '/login' } };
    return <Redirect to={login} />;
  }
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
            <ProjectsSummary projects = {projects} />
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

