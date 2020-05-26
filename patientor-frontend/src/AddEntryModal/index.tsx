import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthCheckForm from './AddHealthCheckForm';
import AddOccupationalHealthCareForm from './AddOccupationalHealthCareForm';
import { EntryFormValues } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  entryType: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, entryType }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {
        entryType === 'HealthCheck'
          && <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
      }
      {
        entryType === 'OccupationalHealthcare'
          && <AddOccupationalHealthCareForm onSubmit={onSubmit} onCancel={onClose} />
      }
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
