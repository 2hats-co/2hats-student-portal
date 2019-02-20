import FIELDS from './fields';
import * as yup from 'yup';
import Validator from 'mailgun-validate';

import { UNIVERSITIES } from '../universityList';

const validator = new Validator('pubkey-39aac6f76384240d4c4b3a2b1afeaf02');

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
      type: FIELDS.textFieldEmail,
      name: 'email',
      label: 'Email',
      value: '',
      disallowSpace: true,
      validation: yup
        .string()
        .email('Invalid email')
        /*.test('mailgun-validate', 'Invalid Email', async email => {
          // console.log('called mailgun validator');
          const validatorPromise = await new Promise(resolve => {
            validator.validate(email, (err, response) => {
              if (err) resolve(false);
              resolve(response);
            });
          });
          // console.log('validatorResponse', validatorPromise);
          return validatorPromise.is_valid;
        })*/
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
      type: FIELDS.textFieldTel,
      name: 'mobileNumber',
      label: 'Mobile Number',
      value: initialData['mobileNumber'],
      validation: yup
        .string()
        .min(10, 'Please enter a 10-digit mobile number')
        .max(13, 'Please enter a 10-digit mobile number')
        .required('Please enter a 10-digit mobile number'),
    },
    {
      type: FIELDS.radio,
      name: 'interest',
      label: 'What are you most interested in?',
      value: null,
      options: [
        { value: 'courses', label: 'Learn crucial skills with online courses' },
        {
          value: 'assessments',
          label: 'Practice & upskill with digital tasks',
        },
        { value: 'jobs', label: 'Apply for part-time paid internships' },
      ],
      validation: yup
        .string(['courses', 'jobs', 'assessments'], 'Not a valid interest')
        .required('Required'),
    },
  ];
};

export default speedySignupFields;
