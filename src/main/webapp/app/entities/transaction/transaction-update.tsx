import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IServiceSubscription } from 'app/shared/model/service-subscription.model';
import { getEntities as getServiceSubscriptions } from 'app/entities/service-subscription/service-subscription.reducer';
import { getEntity, updateEntity, createEntity, reset } from './transaction.reducer';
import { ITransaction } from 'app/shared/model/transaction.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionUpdate = (props: ITransactionUpdateProps) => {
  const [serviceSubscriptionId, setServiceSubscriptionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { transactionEntity, serviceSubscriptions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/transaction' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getServiceSubscriptions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...transactionEntity,
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
          <h2 id="localizeusApp.transaction.home.createOrEditLabel">
            <Translate contentKey="localizeusApp.transaction.home.createOrEditLabel">Create or edit a Transaction</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : transactionEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="transaction-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="transaction-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="amountInCentsLabel" for="transaction-amountInCents">
                  <Translate contentKey="localizeusApp.transaction.amountInCents">Amount In Cents</Translate>
                </Label>
                <AvField id="transaction-amountInCents" type="string" className="form-control" name="amountInCents" />
              </AvGroup>
              <AvGroup>
                <Label id="dateLabel" for="transaction-date">
                  <Translate contentKey="localizeusApp.transaction.date">Date</Translate>
                </Label>
                <AvField id="transaction-date" type="date" className="form-control" name="date" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="transaction-status">
                  <Translate contentKey="localizeusApp.transaction.status">Status</Translate>
                </Label>
                <AvField id="transaction-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="transaction-type">
                  <Translate contentKey="localizeusApp.transaction.type">Type</Translate>
                </Label>
                <AvInput
                  id="transaction-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && transactionEntity.type) || 'IN'}
                >
                  <option value="IN">{translate('localizeusApp.TransactionType.IN')}</option>
                  <option value="OUT">{translate('localizeusApp.TransactionType.OUT')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="transaction-serviceSubscription">
                  <Translate contentKey="localizeusApp.transaction.serviceSubscription">Service Subscription</Translate>
                </Label>
                <AvInput id="transaction-serviceSubscription" type="select" className="form-control" name="serviceSubscriptionId">
                  <option value="" key="0" />
                  {serviceSubscriptions
                    ? serviceSubscriptions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/transaction" replace color="info">
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
  serviceSubscriptions: storeState.serviceSubscription.entities,
  transactionEntity: storeState.transaction.entity,
  loading: storeState.transaction.loading,
  updating: storeState.transaction.updating,
  updateSuccess: storeState.transaction.updateSuccess,
});

const mapDispatchToProps = {
  getServiceSubscriptions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionUpdate);
