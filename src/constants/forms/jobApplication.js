import FIELDS from './fields';
import * as yup from 'yup';

const transformValue = (value, arr) =>
  value ? arr.filter(x => x.value === value)[0] : null;

const START_WEEKS = [
  { value: 0, label: 'Immediately' },
  { value: 1, label: 'in 1 week' },
  { value: 2, label: 'in 2 weeks' },
  { value: 3, label: 'in 3 weeks' },
  { value: 4, label: 'in 4+ weeks' },
];

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

const jobApplicationFields = (initialData, user) => {
  if (!initialData) initialData = {};

  const ts = new Date().getTime();

  return [
    {
      type: FIELDS.checkbox,
      name: 'confirmCommitment',
      label: 'I can commit to the work days above',
      value: !!initialData['confirmCommitment'],
      validation: yup
        .boolean()
        .test('if-true', 'You must commit to the work days above', val => !!val)
        .required('You must commit to the work days above'),
    },
    {
      type: FIELDS.checkbox,
      name: 'confirmTfn',
      label: 'I have a TFN or ABN',
      value: !!initialData['confirmTfn'],
      validation: yup
        .boolean()
        .test('if-true', 'You must have a TFN or ABN', val => !!val)
        .required('You must have a TFN or ABN'),
    },
    {
      type: FIELDS.autocomplete,
      name: 'startWeek',
      label: 'When can you start?',
      value: transformValue(initialData['startWeek'], START_WEEKS),
      suggestions: START_WEEKS,
      validation: yup
        .object({
          value: yup.number().required('Start date is required'),
          label: yup.string(),
        })
        .required('Start date is required'),
    },
    {
      type: FIELDS.slider,
      name: 'pay',
      label: 'Your preferred pay',
      units: 'dollarydoos',
      value: initialData['pay'] || 100,
      calcValueLabel: val =>
        `$${((val / 100) * initialData['pay-calcVal']).toFixed(2)}/${
          initialData['pay-units']
        } (${val}%)`,
      sliderThumbLabel: '%',
      min: 80,
      max: 120,
      step: 5,
      validation: yup
        .number()
        .min(80)
        .max(120)
        .required('Pay is required'),
    },
    {
      type: FIELDS.textFieldMultiline,
      name: 'coverLetter',
      label: 'Describe why you are a good fit',
      value: initialData['coverLetter'],
      validation: yup.string().required('Required'),
    },
    {
      type: FIELDS.autocomplete,
      name: 'workRestriction',
      label: 'Work restriction',
      value: transformValue(initialData['workRestriction'], WORK_RESTRICTIONS),
      suggestions: WORK_RESTRICTIONS,
      validation: yup
        .object({
          value: yup.string().required('Work restriction info is required'),
          label: yup.string(),
        })
        .required('Work restriction info is required'),
    },
    {
      type: FIELDS.dropzone,
      name: 'resume',
      label: 'Resume',
      value: initialData['resume'],
      mimeTypes: 'application/pdf',
      path: `submissions/${user.id}/${ts}/`,
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
