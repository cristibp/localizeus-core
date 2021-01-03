import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transaction.reducer';
import { ITransaction } from 'app/shared/model/transaction.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionDetail = (props: ITransactionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { transactionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="localizeusApp.transaction.detail.title">Transaction</Translate> [<b>{transactionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="amountInCents">
              <Translate contentKey="localizeusApp.transaction.amountInCents">Amount In Cents</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.amountInCents}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="localizeusApp.transaction.date">Date</Translate>
            </span>
          </dt>
          <dd>
            {transactionEntity.date ? <TextFormat value={transactionEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="localizeusApp.transaction.status">Status</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.status}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="localizeusApp.transaction.type">Type</Translate>
            </span>
          </dt>
          <dd>{transactionEntity.type}</dd>
          <dt>
            <Translate contentKey="localizeusApp.transaction.serviceSubscription">Service Subscription</Translate>
          </dt>
          <dd>{transactionEntity.serviceSubscriptionId ? transactionEntity.serviceSubscriptionId : ''}</dd>
        </dl>
        <Button tag={Link} to="/transaction" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/transaction/${transactionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ transaction }: IRootState) => ({
  transactionEntity: transaction.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);
