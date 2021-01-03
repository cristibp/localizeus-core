import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-permission.reducer';
import { IUserPermission } from 'app/shared/model/user-permission.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserPermissionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserPermissionDetail = (props: IUserPermissionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { userPermissionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusApp.userPermission.detail.title">UserPermission</Translate> [<b>{userPermissionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="type">
              <Translate contentKey="localizeusApp.userPermission.type">Type</Translate>
            </span>
          </dt>
          <dd>{userPermissionEntity.type}</dd>
          <dt>
            <Translate contentKey="localizeusApp.userPermission.user">User</Translate>
          </dt>
          <dd>{userPermissionEntity.userId ? userPermissionEntity.userId : ''}</dd>
          <dt>
            <Translate contentKey="localizeusApp.userPermission.project">Project</Translate>
          </dt>
          <dd>{userPermissionEntity.projectId ? userPermissionEntity.projectId : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-permission" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-permission/${userPermissionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userPermission }: IRootState) => ({
  userPermissionEntity: userPermission.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserPermissionDetail);
