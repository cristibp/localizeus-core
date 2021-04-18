import './home.scss';

import React, {useEffect} from 'react';
import {Translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {Alert, Col, Row} from 'reactstrap';
import {getEntities as getProjects} from "app/entities/project/project.reducer";
import {Redirect} from "react-router-dom";
import ProjectsSummary from "app/entities/project/projects-summary";

export interface IHomeProp extends StateProps, DispatchProps {
}

export const Home = (props: IHomeProp) => {
  if (!props.isAuthenticated) {
    const {login} = {login: {pathname: '/login'}};
    return <Redirect to={login}/>;
  }
  const {account} = props;
  const projects = props.projects;
  useEffect(() => {
    props.getProjects();
  }, []);

  return (
    <Row>
      <Col md="9">
        {account && account.login ? (
          <div>
            <Translate contentKey="home.title"/>
            <br/>
            <br/>
            <ProjectsSummary projects={projects}/>
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

