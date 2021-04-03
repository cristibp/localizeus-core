import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getProjects} from 'app/entities/project/project.reducer';
import {createEntity, getEntity, reset, updateEntity} from './translation-key.reducer';

export interface ITranslationKeyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const TranslationKeyUpdate = (props: ITranslationKeyUpdateProps) => {
  const [projectId, setProjectId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {translationKeyEntity, projects, loading, updating} = props;

  const handleClose = () => {
    props.history.push('/translation-key' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProjects();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...translationKeyEntity,
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
          <h2 id="localizeusApp.translationKey.home.createOrEditLabel">
            <Translate contentKey="localizeusApp.translationKey.home.createOrEditLabel">Create or edit a
              TranslationKey</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : translationKeyEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="translation-key-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="translation-key-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="translation-key-name">
                  <Translate contentKey="localizeusApp.translationKey.name">Name</Translate>
                </Label>
                <AvField id="translation-key-name" type="text" name="name"/>
              </AvGroup>
              <AvGroup>
                <Label id="fallbackValueLabel" for="translation-key-fallbackValue">
                  <Translate contentKey="localizeusApp.translationKey.fallbackValue">Fallback Value</Translate>
                </Label>
                <AvField id="translation-key-fallbackValue" type="text" name="fallbackValue"/>
              </AvGroup>
              <AvGroup>
                <Label for="translation-key-project">
                  <Translate contentKey="localizeusApp.translationKey.project">Project</Translate>
                </Label>
                <AvInput id="translation-key-project" type="select" className="form-control" name="projectId">
                  <option value="" key="0"/>
                  {projects
                    ? projects.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/translation-key" replace color="info">
                <FontAwesomeIcon icon="arrow-left"/>
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save"/>
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
  projects: storeState.project.entities,
  translationKeyEntity: storeState.translationKey.entity,
  loading: storeState.translationKey.loading,
  updating: storeState.translationKey.updating,
  updateSuccess: storeState.translationKey.updateSuccess,
});

const mapDispatchToProps = {
  getProjects,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TranslationKeyUpdate);
