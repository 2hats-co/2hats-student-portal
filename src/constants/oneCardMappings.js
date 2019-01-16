import React from 'react';

import Typography from '@material-ui/core/Typography';

import JobsIcon from '@material-ui/icons/BusinessCenterRounded';
import AssessmentsIcon from '@material-ui/icons/AssignmentRounded';
import CoursesIcon from '@material-ui/icons/SchoolRounded';

export const course = data => ({
  title: data.title,
  secondaryText: data.description,
  primaryAction: 'Get started',
  route: `/courseRedirect?id=${data.id}`,

  newTab: true,
  indicator: <CoursesIcon />,
  tertiaryText: [`${data.duration} hours`, ...data.skillsAssociated],

  video: data.videoUrl,
});

export const assessment = data => ({
  title: data.title,
  secondaryText: data.description,
  primaryAction: 'Get started',
  route: `#${data.id}`,

  indicator: <AssessmentsIcon />,
  tertiaryText: [
    `${data.duration} minutes`,
    `Skill: ${data.skillAssociated}`,
    ...data.links,
  ],

  image: data.image,
});

export const job = data => ({
  title: data.title,
  secondaryText: (
    <>
      <Typography variant="subtitle2">About the role</Typography>
      <Typography variant="body2">{data.roleDescription}</Typography>
      <Typography variant="subtitle2">About the company</Typography>
      <Typography variant="body2">{data.companyDescription}</Typography>
    </>
  ),
  primaryAction: 'Get started',
  route: `#${data.id}`,

  indicator: <JobsIcon />,
  tertiaryText: [
    `Closing ${data.closingDate}`,
    `Industry: ${data.industry}`,
    `Pay: ${data.pay}`,
    ...data.skillsRequired,
  ],

  image: data.image,
});
