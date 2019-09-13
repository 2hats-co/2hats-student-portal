import * as Yup from 'yup';
import moment from 'moment';

import {
  WORK_CULTURE_SLIDER_MIN,
  WORK_CULTURE_SLIDER_MAX,
  WORK_CULTURE_SLIDER_LABELS,
} from '@bit/twohats.common.constants';

import { MobileNumberFieldSchema } from 'components/FormikFields/MobileNumberField';

export const WorkCultureSlidersSchema: { [key: string]: Yup.NumberSchema } = {};
Object.keys(WORK_CULTURE_SLIDER_LABELS).forEach(
  x =>
    (WorkCultureSlidersSchema[x] = Yup.number()
      .min(WORK_CULTURE_SLIDER_MIN)
      .max(WORK_CULTURE_SLIDER_MAX)
      .required('Required'))
);

export const ProfileFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .ensure()
    .trim()
    .required('Required'),
  lastName: Yup.string()
    .ensure()
    .trim()
    .required('Required'),

  currentUniversity: Yup.string().required('Required'),
  currentDegree: Yup.string().required('Required'),
  workRestriction: Yup.string()
    .oneOf(['restricted', 'unrestricted'], 'Invalid value')
    .required('Required'),

  jobAvailabilityStartDate: Yup.date()
    .min(
      moment()
        .startOf('month')
        .toDate(),
      'Must be at least this month'
    )
    .required('Required'),
  availableDays: Yup.number()
    .min(1, 'Must be at least 1 day/week')
    .max(5, 'Must be at most 5 days/week')
    .required('Required'),

  mobileNumber: MobileNumberFieldSchema,

  bio: Yup.string()
    .ensure()
    .trim()
    .required('Required'),

  workCultureSliders: Yup.object()
    .shape(WorkCultureSlidersSchema)
    .required('Required'),

  resume: Yup.object()
    .shape({
      name: Yup.string().required(),
      url: Yup.string()
        .url()
        .required('Waiting for upload to finish…'),
    })
    .required('Required'),
  portfolioFile: Yup.object().shape({
    name: Yup.string(),
    url: Yup.string(),
  }),
  portfolioExternal: Yup.string().url('Must be a valid URL'),
});
