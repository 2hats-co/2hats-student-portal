import * as Yup from 'yup';
import moment from 'moment';

import {
  WORK_CULTURE_SLIDER_MIN,
  WORK_CULTURE_SLIDER_MAX,
  WORK_CULTURE_SLIDER_LABELS,
} from '@bit/twohats.common.constants';

const WorkCultureSlidersSchema: { [key: string]: Yup.NumberSchema } = {};
Object.keys(WORK_CULTURE_SLIDER_LABELS).forEach(
  x =>
    (WorkCultureSlidersSchema[x] = Yup.number()
      .min(WORK_CULTURE_SLIDER_MIN)
      .max(WORK_CULTURE_SLIDER_MAX)
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
  coverLetter: Yup.string().required('Required'),
  workRestriction: Yup.string()
    .oneOf(['restricted', 'unrestricted'])
    .required('Required'),
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

export const jobApplicationFormDisplayLabels: { [key: string]: string } = {
  jobAvailabilityStartDate: 'When I can start',
  coverLetter: 'About me',
  workRestriction: 'Work condition',
  pay: 'My preferred salary',
  workCultureSliders: 'My workplace culture',
  resume: 'Resume',
  portfolioFile: 'Portfolio (file)',
  portfolioExternal: 'Link to your portfolio',
};
