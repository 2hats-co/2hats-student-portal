import FIELDS from './fields';
import * as yup from 'yup';

import { UNIVERSITIES } from '../universityList';

const speedySignupFields = initialData => {
  if (!initialData) initialData = {};

  return [
    {
      type: FIELDS.textField,
      name: 'firstName',
      label: 'First Name',
      value: '',
      validation: yup.string().required('Required'),
      width: 6,
      autoFocus: true,
    },
    {
      type: FIELDS.textField,
      name: 'lastName',
      label: 'Last Name',
      value: '',
      validation: yup.string().required('Required'),
      width: 6,
    },
    {
      type: FIELDS.textField,
      name: 'email',
      label: 'Email',
      value: '',
      validation: yup
        .string()
        .email('Must be a valid email')
        .required('Required'),
    },
    {
      type: FIELDS.autocompleteFreeText,
      name: 'currentUniversity',
      label: 'Current University',
      value: initialData['currentUniversity'],
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
      label: 'Current Degree',
      value: '',
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.textField,
      name: 'mobileNumber',
      label: 'Mobile Number',
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
    {
      type: FIELDS.radio,
      name: 'interest',
      label: 'Interest',
      value: null,
      horiz: true,
      options: [
        { value: 'course', label: 'Courses' },
        { value: 'job', label: 'Jobs' },
        { value: 'assessments', label: 'Skill Tasks' },
      ],
      validation: yup
        .string(['course', 'job'], 'Not a valid interest')
        .required('Required'),
    },
  ];
};

export default speedySignupFields;
