import * as Yup from 'yup';
import moment from 'moment';

import {
  WORK_CULTURE_SLIDER_VALUES,
  WORK_CULTURE_SLIDER_LABELS,
  WorkCultureSliderField,
} from '@bit/twohats.common.constants';

const WorkCultureSlidersSchema: WorkCultureSliderField = {};
Object.keys(WORK_CULTURE_SLIDER_LABELS).forEach(
  x =>
    (WorkCultureSlidersSchema[x] = Yup.number()
      .min(WORK_CULTURE_SLIDER_VALUES[0])
      .max(WORK_CULTURE_SLIDER_VALUES[WORK_CULTURE_SLIDER_VALUES.length - 1])
      .required('Required'))
);

export const JobApplicationSchema = Yup.object().shape({
  jobAvailabilityStartDate: Yup.date()
    .min(
      moment()
        .startOf('month')
        .toDate()
    )
    .required('Required'),
  workRestriction: Yup.string()
    .oneOf(['restricted', 'unrestricted'])
    .required('Required'),
  coverLetter: Yup.string().required('Required'),
  pay: Yup.number()
    .min(100)
    .max(150)
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
