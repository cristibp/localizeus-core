import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntity} from './translation-key.reducer';

export interface ITranslationKeyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const TranslationKeyDetail = (props: ITranslationKeyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const {translationKeyEntity} = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate
            contentKey="localizeusApp.translationKey.detail.title">TranslationKey</Translate> [<b>{translationKeyEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="localizeusApp.translationKey.name">Name</Translate>
            </span>
          </dt>
          <dd>{translationKeyEntity.name}</dd>
          <dt>
            <span id="fallbackValue">
              <Translate contentKey="localizeusApp.translationKey.fallbackValue">Fallback Value</Translate>
            </span>
          </dt>
          <dd>{translationKeyEntity.fallbackValue}</dd>
          <dt>
            <Translate contentKey="localizeusApp.translationKey.project">Project</Translate>
          </dt>
          <dd>{translationKeyEntity.projectId ? translationKeyEntity.projectId : ''}</dd>
        </dl>
        <Button tag={Link} to="/translation-key" replace color="info">
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/translation-key/${translationKeyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({translationKey}: IRootState) => ({
  translationKeyEntity: translationKey.entity,
});

const mapDispatchToProps = {getEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TranslationKeyDetail);
