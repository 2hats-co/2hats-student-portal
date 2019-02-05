import FIELDS from './fields';
import * as yup from 'yup';

import { UNIVERSITIES } from '../universityList';

const transformValue = (value, arr) =>
  value ? arr.filter(x => x.value === value)[0] : null;

const WORK_RESTRICTIONS = [
  {
    value: 'unrestricted',
    label: 'Unrestricted (full working rights in Australia)',
  },
  {
    value: 'restricted',
    label: 'Restricted (up to 40 hours per fortnight)',
  },
];

const accountInfoFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.textField,
      name: 'firstName',
      label: 'First name',
      value: initialData['firstName'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'lastName',
      label: 'Last name',
      value: initialData['lastName'],
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.autocompleteFreeText,
      name: 'currentUniversity',
      label: 'Current university',
      value: initialData['currentUniversity'] && {
        label: initialData['currentUniversity'],
        value: initialData['currentUniversity'],
      },
      suggestions: UNIVERSITIES.map(x => ({
        label: x,
        value: x.split('\u2063')[0],
      })),
      validation: yup
        .object({
          value: yup.string().required('Required'),
          label: yup.string(),
        })
        .required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'currentDegree',
      label: 'Current degree',
      value: initialData['currentDegree'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.autocomplete,
      name: 'workRestriction',
      label: 'Work restriction',
      value: transformValue(initialData['workRestriction'], WORK_RESTRICTIONS),
      suggestions: WORK_RESTRICTIONS,
    },
    {
      type: FIELDS.slider,
      name: 'availableDays',
      label: 'Available days',
      units: 'days',
      value: initialData['availableDays'],
      min: 1,
      max: 5,
      step: 0.5,
      validation: yup
        .number()
        .min(1)
        .max(5)
        .required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'mobileNumber',
      label: 'Mobile number',
      value: initialData['mobileNumber'],
      validation: yup
        .string()
        .min(
          10,
          'Please enter a 10-digit Australian mobile number with no spaces'
        )
        .max(
          10,
          'Please enter a 10-digit Australian mobile number with no spaces'
        )
        .required(
          'Please enter a 10-digit Australian mobile number with no spaces'
        ),
    },
  ];
};

export default accountInfoFields;
