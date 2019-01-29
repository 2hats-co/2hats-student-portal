import React, { useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '../Dialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik } from 'formik';
import * as yup from 'yup';
import remove from 'ramda/es/remove';
import map from 'ramda/es/map';
import FIELDS from '../../constants/forms/fields';
import Text from './Fields/Text';
import TextItems from './Fields/TextItems';
import Slider from './Fields/Slider';
import DateTime from './Fields/DateTime';
import Uploader from './Fields/Uploader';
import Select from './Fields/Select';
import Checkbox from './Fields/Checkbox';

const styles = theme => ({
  wrapperGrid: {
    // marginTop: theme.spacing.unit,
    overflowX: 'hidden',
    paddingBottom: theme.spacing.unit,
  },

  capitalise: {
    '&::first-letter': { textTransform: 'uppercase' },
  },

  sectionTitle: {
    marginLeft: theme.spacing.unit * 1.5,
  },
});

const reactSelectValueFormatter = x => {
  if (Array.isArray(x)) {
    if (x[0] && x[0].label && x[0].value) return x.map(y => y.value);
    else return x;
  } else if (x.label && x.value) {
    return x.value;
  } else {
    return x;
  }
};
const youtubeUrlFormatter = x => {
  if (typeof x === 'string' && x.includes('youtube.com')) {
    return x.replace('watch?v=', 'embed/').split('&')[0];
  } else {
    return x;
  }
};

/* eslint-disable no-sequences */
const initialValuesReducer = (obj, item) => (
  (obj[item.name] =
    item.value || (item.type === FIELDS.slider ? item.min : '')),
  obj
);
const validationReducer = (obj, item) => (
  item.validation ? (obj[item.name] = item.validation) : null, obj
);

function Form(props) {
  const {
    classes,
    action,
    actions,
    open,
    data,
    formTitle,
    justForm,
    formHeader,
    formFooter,
  } = props;

  let initialValues = data.reduce(initialValuesReducer, {});
  let hasNewData = true;
  useEffect(
    () => {
      if (data) {
        initialValues = data.reduce(initialValuesReducer, {});
      } else {
        initialValues = {};
      }
      hasNewData = true;
    },
    [data]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const outputValues = Object.keys(values)
          .filter(k => k.indexOf('-temp') === -1)
          .map(k => Object.assign({}, { [k]: values[k] }))
          .reduce((res, o) => Object.assign(res, o), {});

        const reactSelectFormattedValues = map(
          reactSelectValueFormatter,
          outputValues
        );
        const youtubeUrlFormatted = map(
          youtubeUrlFormatter,
          reactSelectFormattedValues
        );

        actions[action](youtubeUrlFormatted);
      }}
      validationSchema={yup.object().shape(data.reduce(validationReducer, {}))}
    >
      {formikProps => {
        const {
          values,
          handleSubmit,
          setValues,
          errors,
          touched,
        } = formikProps;
        if (hasNewData) {
          setValues({ ...values, ...initialValues });
          hasNewData = false;
        }
        const handleDeleteFromList = (list, index) => {
          const newList = remove(index, 1, values[list]);
          setValues({ ...values, [list]: newList });
        };
        const handleAddToList = (list, item) => {
          if (!values[item]) return;
          const currentList = Array.isArray(values[list]) ? values[list] : [];
          const newItem = values[item].trim();

          if (newItem.length > 0 && !currentList.includes(newItem)) {
            const newList = currentList.concat([newItem]);
            setValues({ ...values, [list]: newList, [item]: '' });
          } else {
            setValues({ ...values, [item]: '' });
          }
        };

        const validator = name =>
          errors[name] &&
          touched[name] && (
            <FormHelperText error className={classes.sectionTitle}>
              {typeof errors[name] === 'object'
                ? JSON.stringify(errors[name])
                : errors[name]}
            </FormHelperText>
          );
        const Fields = (
          <Grid
            container
            direction="row"
            spacing={8}
            className={classes.wrapperGrid}
          >
            {data.map((x, i) => {
              switch (x.type) {
                case FIELDS.textField:
                case FIELDS.textFieldNumber:
                case FIELDS.textFieldPassword:
                case FIELDS.textFieldMultiline:
                  return (
                    <Text
                      key={x.name}
                      type={x.type}
                      formikProps={formikProps}
                      label={x.label}
                      name={x.name}
                      placeholder={x.placeholder}
                      width={x.width}
                    />
                  );

                case FIELDS.chipFreeText:
                  return (
                    <TextItems
                      key={x.name}
                      label={x.label}
                      name={x.name}
                      formikProps={formikProps}
                      handleAddToList={handleAddToList}
                      handleDeleteFromList={handleDeleteFromList}
                    />
                  );

                case FIELDS.slider:
                  return (
                    <Slider
                      key={x.name}
                      name={x.name}
                      label={x.label}
                      calcValueLabel={x.calcValueLabel}
                      sliderThumbLabel={x.sliderThumbLabel}
                      min={x.min}
                      max={x.max}
                      step={x.step}
                      units={x.units}
                      formikProps={formikProps}
                      validator={validator}
                    />
                  );

                case FIELDS.autocomplete:
                case FIELDS.autocompleteMulti:
                case FIELDS.autocompleteFreeText:
                case FIELDS.autocompleteMultiFreeText:
                  return (
                    <Select
                      key={x.name}
                      placeholder={x.placeholder}
                      suggestions={x.suggestions}
                      name={x.name}
                      label={x.label}
                      type={x.type}
                      formikProps={formikProps}
                      width={x.width}
                    />
                  );

                case FIELDS.date:
                case FIELDS.dateTime:
                  return (
                    <DateTime
                      key={x.name}
                      name={x.name}
                      label={x.label}
                      type={x.type}
                      formikProps={formikProps}
                      validator={validator}
                      width={x.width}
                    />
                  );

                case FIELDS.dropzone:
                  return (
                    <Uploader
                      key={x.name}
                      formikProps={formikProps}
                      thisBind={this}
                      label={x.label}
                      name={x.name}
                      path={x.path}
                      mimeTypes={x.mimeTypes}
                      validator={validator}
                    />
                  );

                case FIELDS.checkbox:
                  return (
                    <Checkbox
                      key={x.name}
                      formikProps={formikProps}
                      label={x.label}
                      name={x.name}
                      validator={validator}
                      width={x.width}
                    />
                  );

                default:
                  return null;
              }
            })}
          </Grid>
        );
        const PrimaryButton = (
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            type="submit"
            classes={{ label: classes.capitalise }}
          >
            {action[0].toUpperCase()}
            {action.substr(1)}
          </Button>
        );
        return (
          <form onSubmit={handleSubmit}>
            {justForm ? (
              <Grid container>
                {formHeader}
                {Fields}
                {formFooter}
                {PrimaryButton}
              </Grid>
            ) : (
              <Dialog
                open={open}
                onClose={actions.close}
                activity={action}
                unChanged={false}
                title={formTitle}
                addHandler={handleSubmit}
                cancelHandler={actions.close}
              >
                {formHeader}
                {Fields}
                {formFooter}
              </Dialog>
            )}
          </form>
        );
      }}
    </Formik>
  );
}

export default withStyles(styles)(Form);
