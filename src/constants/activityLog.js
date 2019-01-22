import { globalReplace } from '../utilities';

const ACTIVITY_LOG_TYPES = [
  'course-started',
  'learn-world-certificate',
  'course-completed',

  'assessment-started',
  'assessment-submitted',
  'assessment-passed',
  'assessment-failed',

  'job-applied',

  'event-booked',

  'ac-booked',
  'ac-completed',

  'book-ac',

  'system',
];

export const ACTIVITY_LOG_LABELS = ACTIVITY_LOG_TYPES.reduce((a, v) => {
  let label = globalReplace(v, '-', ' ')
    .replace('learn world', 'LearnWorld')
    .replace('ac', 'assessment centre');
  label = label.charAt(0).toUpperCase() + label.slice(1);

  return { ...a, [v]: label, system: '' };
}, {});

export default ACTIVITY_LOG_TYPES;
