import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {deleteEntity, getEntity} from './translation-key.reducer';

export interface ITranslationKeyDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const TranslationKeyDeleteDialog = (props: ITranslationKeyDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/translation-key' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.translationKeyEntity.id);
  };

  const {translationKeyEntity} = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="localizeusApp.translationKey.delete.question">
        <Translate contentKey="localizeusApp.translationKey.delete.question"
                   interpolate={{id: translationKeyEntity.id}}>
          Are you sure you want to delete this TranslationKey?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban"/>
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-translationKey" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash"/>
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({translationKey}: IRootState) => ({
  translationKeyEntity: translationKey.entity,
  updateSuccess: translationKey.updateSuccess,
});

const mapDispatchToProps = {getEntity, deleteEntity};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TranslationKeyDeleteDialog);
