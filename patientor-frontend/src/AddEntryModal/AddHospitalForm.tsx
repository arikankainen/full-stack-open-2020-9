import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { DischargeEntry, HospitalFormValues } from "../types";
import { useStateValue } from '../state';

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
}

const AddHospitalForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  const isValidDate = (date: string): boolean => {
    return (/^(1|2)[0-9]{3}-[0-9]{2}-[0-9]{2}$/i.test(date));
  };

  return (
    <Formik
      initialValues={{
        date: '',
        specialist: '',
        type: 'Hospital',
        diagnosisCodes: [],
        description: '',
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required to have length of 3 characters';
        const dateFormatError = 'Invalid date format';
        const errors: { [field: string]: string | DischargeEntry } = {};

        const discharge = {
          date: '',
          criteria: ''
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
        
        if (values.discharge && values.discharge.date.length > 0 && !isValidDate(values.discharge.date)) {
          discharge.date = dateFormatError;
        } else {
          discharge.date = '';
        }
        
        if (!values.discharge || values.discharge.criteria.length < 3) {
          discharge.criteria = requiredError;
        } else {
          discharge.criteria = '';
        }

        if (discharge.date || discharge.criteria) {
          errors.discharge = discharge;
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
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="Discharge Criteria"
              name="discharge.criteria"
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

export default AddHospitalForm;