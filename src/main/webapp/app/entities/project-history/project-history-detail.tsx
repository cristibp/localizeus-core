import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project-history.reducer';
import { IProjectHistory } from 'app/shared/model/project-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjectHistoryDetail = (props: IProjectHistoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { projectHistoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusApp.projectHistory.detail.title">ProjectHistory</Translate> [<b>{projectHistoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="action">
              <Translate contentKey="localizeusApp.projectHistory.action">Action</Translate>
            </span>
          </dt>
          <dd>{projectHistoryEntity.action}</dd>
          <dt>
            <span id="oldValue">
              <Translate contentKey="localizeusApp.projectHistory.oldValue">Old Value</Translate>
            </span>
          </dt>
          <dd>{projectHistoryEntity.oldValue}</dd>
          <dt>
            <span id="newValue">
              <Translate contentKey="localizeusApp.projectHistory.newValue">New Value</Translate>
            </span>
          </dt>
          <dd>{projectHistoryEntity.newValue}</dd>
          <dt>
            <Translate contentKey="localizeusApp.projectHistory.user">User</Translate>
          </dt>
          <dd>{projectHistoryEntity.userId ? projectHistoryEntity.userId : ''}</dd>
          <dt>
            <Translate contentKey="localizeusApp.projectHistory.translationKey">Translation Key</Translate>
          </dt>
          <dd>{projectHistoryEntity.translationKeyId ? projectHistoryEntity.translationKeyId : ''}</dd>
          <dt>
            <Translate contentKey="localizeusApp.projectHistory.translation">Translation</Translate>
          </dt>
          <dd>{projectHistoryEntity.translationId ? projectHistoryEntity.translationId : ''}</dd>
        </dl>
        <Button tag={Link} to="/project-history" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/project-history/${projectHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ projectHistory }: IRootState) => ({
  projectHistoryEntity: projectHistory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHistoryDetail);
