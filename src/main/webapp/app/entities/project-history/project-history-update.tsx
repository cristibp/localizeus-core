import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ITranslationKey } from 'app/shared/model/translation-key.model';
import { getEntities as getTranslationKeys } from 'app/entities/translation-key/translation-key.reducer';
import { ITranslation } from 'app/shared/model/translation.model';
import { getEntities as getTranslations } from 'app/entities/translation/translation.reducer';
import { getEntity, updateEntity, createEntity, reset } from './project-history.reducer';
import { IProjectHistory } from 'app/shared/model/project-history.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProjectHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProjectHistoryUpdate = (props: IProjectHistoryUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [translationKeyId, setTranslationKeyId] = useState('0');
  const [translationId, setTranslationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { projectHistoryEntity, users, translationKeys, translations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/project-history');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getTranslationKeys();
    props.getTranslations();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...projectHistoryEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="localizeusApp.projectHistory.home.createOrEditLabel">
            <Translate contentKey="localizeusApp.projectHistory.home.createOrEditLabel">Create or edit a ProjectHistory</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : projectHistoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="project-history-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="project-history-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="actionLabel" for="project-history-action">
                  <Translate contentKey="localizeusApp.projectHistory.action">Action</Translate>
                </Label>
                <AvInput
                  id="project-history-action"
                  type="select"
                  className="form-control"
                  name="action"
                  value={(!isNew && projectHistoryEntity.action) || 'ADD'}
                >
                  <option value="ADD">{translate('localizeusApp.ProjectActions.ADD')}</option>
                  <option value="DELETE">{translate('localizeusApp.ProjectActions.DELETE')}</option>
                  <option value="UPDATE">{translate('localizeusApp.ProjectActions.UPDATE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="oldValueLabel" for="project-history-oldValue">
                  <Translate contentKey="localizeusApp.projectHistory.oldValue">Old Value</Translate>
                </Label>
                <AvField id="project-history-oldValue" type="text" name="oldValue" />
              </AvGroup>
              <AvGroup>
                <Label id="newValueLabel" for="project-history-newValue">
                  <Translate contentKey="localizeusApp.projectHistory.newValue">New Value</Translate>
                </Label>
                <AvField id="project-history-newValue" type="text" name="newValue" />
              </AvGroup>
              <AvGroup>
                <Label for="project-history-user">
                  <Translate contentKey="localizeusApp.projectHistory.user">User</Translate>
                </Label>
                <AvInput id="project-history-user" type="select" className="form-control" name="userId">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="project-history-translationKey">
                  <Translate contentKey="localizeusApp.projectHistory.translationKey">Translation Key</Translate>
                </Label>
                <AvInput id="project-history-translationKey" type="select" className="form-control" name="translationKeyId">
                  <option value="" key="0" />
                  {translationKeys
                    ? translationKeys.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="project-history-translation">
                  <Translate contentKey="localizeusApp.projectHistory.translation">Translation</Translate>
                </Label>
                <AvInput id="project-history-translation" type="select" className="form-control" name="translationId">
                  <option value="" key="0" />
                  {translations
                    ? translations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/project-history" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  translationKeys: storeState.translationKey.entities,
  translations: storeState.translation.entities,
  projectHistoryEntity: storeState.projectHistory.entity,
  loading: storeState.projectHistory.loading,
  updating: storeState.projectHistory.updating,
  updateSuccess: storeState.projectHistory.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getTranslationKeys,
  getTranslations,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHistoryUpdate);
