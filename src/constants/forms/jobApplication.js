import FIELDS from './fields';
import * as yup from 'yup';

const jobApplicationFields = initialData => {
  if (!initialData) initialData = {};
  return [
    {
      type: FIELDS.slider,
      name: 'moneys',
      label: 'Moneys',
      units: 'dollarydoos',
      value: initialData['moneys'],
      min: 5,
      max: 100,
      step: 5,
      validation: yup
        .number()
        .min(5)
        .max(100)
        .required('moneys is required'),
    },
  ];
};

export default jobApplicationFields;
