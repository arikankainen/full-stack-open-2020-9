import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { SickLeaveEntry, OccupationalHealthCareFormValues } from "../types";
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: OccupationalHealthCareFormValues) => void;
  onCancel: () => void;
}

const AddOccupationalHealthCareForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  const isValidDate = (date: string): boolean => {
    return (/^(1|2)[0-9]{3}-[0-9]{2}-[0-9]{2}$/i.test(date));
  };

  return (
    <Formik
      initialValues={{
        date: '',
        specialist: '',
        type: 'OccupationalHealthcare',
        diagnosisCodes: [],
        description: '',
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required to have length of 3 characters';
        const dateFormatError = 'Invalid date format';
        const errors: { [field: string]: string | SickLeaveEntry } = {};

        const sickLeave = {
          startDate: '',
          endDate: ''
        };
      
        if (!values.date || !isValidDate(values.date)) {
          errors.date = dateFormatError;
        }
        if (!values.specialist || values.specialist.length < 3) {
          errors.specialist = requiredError;
        }
        if (!values.description || values.description.length < 3) {
          errors.description = requiredError;
        }
        if (!values.employerName || values.employerName.length < 3) {
          errors.employerName = requiredError;
        }
        
        if (values.sickLeave && values.sickLeave.startDate.length > 0 && !isValidDate(values.sickLeave.startDate)) {
          sickLeave.startDate = dateFormatError;
        } else {
          sickLeave.startDate = '';
        }
        
        if (values.sickLeave && values.sickLeave.endDate.length > 0 && !isValidDate(values.sickLeave.endDate)) {
          sickLeave.endDate = dateFormatError;
        } else {
          sickLeave.endDate = '';
        }

        if (values.sickLeave?.startDate && !values.sickLeave?.endDate) {
          sickLeave.endDate = 'End Date cannot be empty if Start Date is defined';
        } else if (!values.sickLeave?.startDate && values.sickLeave?.endDate) {
          sickLeave.startDate = 'Start Date cannot be empty if End Date is defined';
        }
        
        if (sickLeave.startDate || sickLeave.endDate) {
          errors.sickLeave = sickLeave;
        }
        
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />    
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalHealthCareForm;