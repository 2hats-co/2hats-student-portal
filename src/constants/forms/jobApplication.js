import FIELDS from './fields';
import * as yup from 'yup';

import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

const jobApplicationFields = initialData => {
  if (!initialData) initialData = {};

  const userContext = useContext(UserContext);
  const ts = new Date().getTime();
  return [
    {
      type: FIELDS.slider,
      name: 'pay',
      label: 'Your preferred pay',
      units: 'dollarydoos',
      value: initialData['pay'] || 100,
      calcValueLabel: val =>
        `$${((val / 100) * initialData['pay-calcVal']).toFixed(2)} (${val}%)`,
      sliderThumbLabel: '%',
      min: 50,
      max: 150,
      step: 10,
      validation: yup
        .number()
        .min(50)
        .max(150)
        .required('Pay is required'),
    },
    {
      type: FIELDS.autocomplete,
      name: 'workRestriction',
      label: 'Work restriction',
      value: initialData['workRestriction'] && {
        value: initialData['workRestriction'],
        label:
          initialData['workRestriction'] === 'unrestricted'
            ? 'Unrestricted (full working rights in Australia)'
            : 'Restricted (up to 40 hours per fortnight',
      },
      suggestions: [
        {
          value: 'unrestricted',
          label: 'Unrestricted (full working rights in Australia)',
        },
        {
          value: 'restricted',
          label: 'Restricted (up to 40 hours per fortnight)',
        },
      ],
      validation: yup.string().required('Pay units is required'),
    },
    {
      type: FIELDS.dropzone,
      name: 'resume',
      label: 'Resume',
      value: initialData['resume'],
      mimeTypes: 'application/pdf',
      path: `submissions/${userContext.user.id}/${ts}/`,
      validation: yup.object().shape({
        name: yup.string().required(),
        url: yup
          .string()
          .url('Invalid URL')
          .required(),
      }),
    },
  ];
};

export default jobApplicationFields;
