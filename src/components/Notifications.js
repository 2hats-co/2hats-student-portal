import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import NotificationIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Forum';
import NoteIcon from '@material-ui/icons/AlternateEmail';

// import ScrollyRolly from './ScrollyRolly';
// import useCollection from '../hooks/useCollection';
// import { COLLECTIONS } from '../constants/firestore';
import * as ROUTES from '../constants/routes';
// import { markAsRead } from '../utilities/notifications';

import moment from 'moment';
import { momentLocales } from '../constants/momentLocales';

const styles = theme => ({
  loader: {
    color: 'rgba(255,255,255,.87)',
    padding: theme.spacing.unit * 1.5,
  },
  badge: {
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },
  paperRoot: {
    borderRadius: theme.shape.roundBorderRadius,
    width: 360,
    outline: 'none',
    maxHeight: `calc(100vh - ${theme.spacing.unit * 3}px)`,
    position: 'absolute',
    bottom: theme.spacing.unit * 1.5,
    left: theme.spacing.unit * 9,
    overflowY: 'auto',
  },
  listItemTextRoot: { paddingRight: 0 },
  timestamp: {
    color: theme.palette.text.secondary,
  },
  listItemSecondary: {
    lineClamp: 2,
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',
  },
  unread: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
});

const getIcon = type => {
  switch (type) {
    case 'message':
      return <MessageIcon />;
    case 'note':
      return <NoteIcon />;
    case 'reminder':
      return <NotificationIcon />;

    default:
      return '?';
  }
};

const DUMMY_NOTIFICATIONS = [
  {
    body:
      "Hi there Gloria. Apologies for my delayed reply. Please find attached an example of a completed profile from Zara @ Upaged.\nLet me know if you have any questions. Otherwise I will circle back with you next week and see how you're going.\n\nKind regards\nMaddy\n            136 KB\n          \n                Download",
    createdAt: {
      seconds: 1547983171,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'message',
    },
    showSubscribers: [
      '105593432000342352515',
      '111627907165498119460',
      '111148430739057241571',
      '108339087990646412306',
    ],
    subscribers: [
      '105593432000342352515',
      '111627907165498119460',
      '111148430739057241571',
      '108339087990646412306',
    ],
    title: 'Madeleine Chiffey',
    unreadSubscribers: ['111627907165498119460'],
    id: 'nI0cphLPlwAMqK5lGNl6',
  },
  {
    body:
      'Hi Glora, thank you for your connection I look forward to networking possible ideas with you in the near future if you are ok with me asking for your input for anything that may arise 🙂 thank you again for your connection. I’m so happy to make your acquaintance 😀.\nZak',
    createdAt: {
      seconds: 1547903875,
      nanoseconds: 815000000,
    },
    data: {
      conversationId: '33ML2xqC8hzcvwSFINVY',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'Zrakonius Storm',
    unreadSubscribers: ['111627907165498119460', '118315975799505685916'],
    id: 'NZxBuYqV7Oc3TfxgiCry',
  },
  {
    body: 'Hi Gloria, what’s a superintern? Sounds interesting.',
    createdAt: {
      seconds: 1547889656,
      nanoseconds: 443000000,
    },
    data: {
      conversationId: 'SWDkkXEh4jNfvlbPOqNk',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'Adam Wise',
    unreadSubscribers: ['111627907165498119460', '118315975799505685916'],
    id: 'Wfx9phosNJmu7doQYJMJ',
  },
  {
    body: 'l',
    createdAt: {
      seconds: 1547886558,
      nanoseconds: 964000000,
    },
    data: {
      conversationId: 'N6IJyhofsU3bMTlW166x',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'shams mosowi',
    unreadSubscribers: ['111627907165498119460', '118315975799505685916'],
    id: 'ZQO25DQEKLX3jsCMICnh',
  },
  {
    body: 'k',
    createdAt: {
      seconds: 1547886519,
      nanoseconds: 381000000,
    },
    data: {
      conversationId: 'N6IJyhofsU3bMTlW166x',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'shams mosowi',
    unreadSubscribers: ['111627907165498119460', '118315975799505685916'],
    id: '8NIqRQg7hloNFvMtqFpx',
  },
  {
    body: 'Hi Gloria, thank you for reaching out, but I’m not interested.',
    createdAt: {
      seconds: 1547849720,
      nanoseconds: 231000000,
    },
    data: {
      conversationId: 'aIJW1vBMYe6bTYCrJUUe',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'James Chee',
    unreadSubscribers: ['111627907165498119460'],
    id: 'T4pGg6YgEWM9GmJKFBHO',
  },
  {
    body:
      "P.S. I'd remove Appster from your pitch, I'm sure you are watching the news of late. S",
    createdAt: {
      seconds: 1547848881,
      nanoseconds: 608000000,
    },
    data: {
      conversationId: 'i4HcJwolWMm6CGgGxM3E',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'Shane Reid',
    unreadSubscribers: ['111627907165498119460'],
    id: 'lwBZUA5cID9p4pM5lz0X',
  },
  {
    body:
      'Hi Gloria, \n\nThank you for reaching out, but I am not interested at the moment. \nAnd I guess using Appster as a reference may not be a great idea ;)\nhttps://www.smh.com.au/business/companies/sad-face-emoji-signs-off-mass-job-loss-message-at-fallen-tech-darling-20190115-p50rhw.html\n\nCheers,\nDusan',
    createdAt: {
      seconds: 1547808946,
      nanoseconds: 387000000,
    },
    data: {
      conversationId: 'AY3F3nm2LHYrV34Yt11l',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: '',
    unreadSubscribers: ['111627907165498119460'],
    id: 'cKaopYjZt6K5Q1ABqie5',
  },
  {
    body:
      'Great thank you\n\nmso-fareast-font-family:"Times New Roman";mso-bidi-font-family:Arial;                                                                                                                                                                                                                                                                                                                                                     color:#007496" Sarah Cummings                                                                                                                                                                                                                                                                                                                                                                                             font-family:"Verdana",sans-serif;mso-fareast-font-family:"Times New Roman";                                                                                                                                                                                                                                                                                                                                               mso-bidi-font-family:"Times New Roman""                                                                                                                                                                                                                                                                                                                                                                                   mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:Arial;                                                                                                                                                                                                                                                                                                                                                     color:#7F7F7F;mso-themecolor:text1;mso-themetint:128" Co-founder and Chief Evangelist                                                                                                                                                                                                                                                                                                                                     font-family:"Verdana",sans-serif;mso-fareast-font-family:"Times New Roman";                                                                                                                                                                                                                                                                                                                                               mso-bidi-font-family:"Times New Roman";color:#7F7F7F;mso-themecolor:text1;                                                                                                                                                                                                                                                                                                                                                mso-themetint:128" M                                                                                                                                                                                                                                                                                                                                                                                                      mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";                                                                                                                                                                                                                                                                                                                                         color:#7F7F7F;mso-themecolor:text1;mso-themetint:128" +61 412 669 880 E text1;mso-themetint:128" sarah@teachted.com.au [sarah@teachted.com.au] W mso-themecolor:text1;mso-themetint:128" teachted.com.au [http://www.tedgoestohospital.com.au/]                                                                                                                                                                           "Times New Roman";mso-bidi-font-family:Arial;color:#1D1D1B"                                                                                                                                                                                                                                                                                                                                                               height:60.55pt"mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman";   [https://www.facebook.com/teachted/]                                                                                                                                                                                                                                                                                   mso-no-proof:yes"                                                                   "Times New Roman";mso-bidi-font-family:"Times New Roman"" [https://www.linkedin.com/company/teachted]                                                                                                                                                                                                                                 mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:"Times New Roman""   "Times New Roman";mso-bidi-font-family:"Times New Roman"" [https://www.instagram.com/teachted/]                                                                                                                                                                                                                                       "Times New Roman";mso-bidi-font-family:"Times New Roman";color:#743E2A" [https://www.youtube.com/watch?v=fSx8Mbx9V1Q&feature=youtu.be]                                                                                                                                                                                                                                                                                    mso-bidi-font-family:"Times New Roman""                                                                                                                                                                                                                                                                                                                                                                                   height:1.15pt"                                                                                                                                                                                                                                                                                                                                                                                                            mso-fareast-font-family:"Times New Roman";color:#8A8A8A" DISCLAIMER: This e-mail and any attachments is for the intended recipient only and may contain legally privileged or confidential information. If you are not the intended recipient, copying or distributing this e-mail is prohibited. If you received this e-mail in error, please reply indicating so and delete all copies from your computer. Teach Ted.   "Helvetica",sans-serif;mso-fareast-font-family:"Times New Roman";mso-bidi-font-family:                                                                                                                                                                                                                                                                                                                                    "Times New Roman""                                                                                                                                                                                                                                                                                                                                                                                                        On Fri, Jan 18, 2019 at 4:43pm, Gloria Li < gloria@2hats.com.au [gloria@2hats.com.au] > wrote:\nHi Sarah,\nThanks for the specs, let me have a chat with my talent coordinator and get back to you early next week.\nHave a great weekend                                                                                                                                                                                                                                                                                                                                                                                                            Gloria Li                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Co-founder                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      m: 0420 289 818                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 e: gloria@2hats.com.au [kelvin@2hats.com.au] | w: www.2hats.com.au [http://www.2hats.com.au/]                                                                                                                                                                                                                                                                                                                                                                                                                   [https://www.linkedin.com/company/2hats/] [https://www.facebook.com/2hats.com.au]                  2hats accepts no liability for the content of this email, or for the consequences of any actions taken on the basis of the information provided, unless that information is subsequently confirmed in writing. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.                                                                                                      On Fri, Jan 18, 2019 at 3:01 PM < sarah@teachted.com.au [sarah@teachted.com.au] > wrote:\nHi Gloria,\n\n\nHere is the spec for AR on our book. Let me know if you have any questions at this stage. Thanks for looking at it.\n\n\n\nCheers\n\nSarah\n\n\n\nSarah Cummings                                                                                                                                                                                                                                                                                                                                                   Co-founder and CEO                                                                                                                                                                                                                                                                                                                                               M +61 412 669 880 E sarah@teachted.com.au [sarah@teachted.com.au] W teachted.com.au [http://www.tedgoestohospital.com.au/]                                                                                                                                                                                                                                       [https://www.facebook.com/teachted/] [https://www.linkedin.com/company/teachted] [https://www.instagram.com/teachted/] [https://www.youtube.com/watch?v=fSx8Mbx9V1Q&feature=youtu.be]                                                                                                                                                                            DISCLAIMER: This e-mail and any attachments is for the intended recipient only and may contain legally privileged or confidential information. If you are not the intended recipient, copying or distributing this e-mail is prohibited. If you received this e-mail in error, please reply indicating so and delete all copies from your computer. Teach Ted.',
    createdAt: {
      seconds: 1547806414,
      nanoseconds: 769000000,
    },
    data: {
      conversationId: 'BW9MIFMbZfI4f3nSI27E',
      type: 'message',
    },
    showSubscribers: [
      '105593432000342352515',
      '111627907165498119460',
      '111148430739057241571',
      '108339087990646412306',
    ],
    subscribers: [
      '105593432000342352515',
      '111627907165498119460',
      '111148430739057241571',
      '108339087990646412306',
    ],
    title: 'Sarah Cummings',
    unreadSubscribers: ['111627907165498119460'],
    id: 'OZBfPPr8zosuHBbGra4r',
  },
  {
    body: 'And what is with your charge?',
    createdAt: {
      seconds: 1547801632,
      nanoseconds: 673000000,
    },
    data: {
      conversationId: 'AmX3iI8UpOUgUIAznJ6J',
      type: 'message',
    },
    showSubscribers: [
      '105593432000342352515',
      '107545905600478815414',
      '108339087990646412306',
      '109752848695140211005',
      '111148430739057241571',
      '111627907165498119460',
      '118315975799505685916',
    ],
    subscribers: [
      '105593432000342352515',
      '107545905600478815414',
      '108339087990646412306',
      '109752848695140211005',
      '111148430739057241571',
      '111627907165498119460',
      '118315975799505685916',
    ],
    title: 'thomas gosewinkel',
    unreadSubscribers: [
      '107545905600478815414',
      '109752848695140211005',
      '111627907165498119460',
    ],
    id: 'LAjYTFhG4kshd5ywEBdR',
  },
  {
    body:
      'Not sure if right fit (yet)... But interested on the pitch. Coffee sounds good. Where in Sydney are you based?',
    createdAt: {
      seconds: 1547800573,
      nanoseconds: 717000000,
    },
    data: {
      conversationId: 'i4HcJwolWMm6CGgGxM3E',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'Shane Reid',
    unreadSubscribers: ['111627907165498119460'],
    id: 'qroIIOIl8PR5oWszTUIn',
  },
  {
    body:
      'Hi Gloria, \nSo basically you help muti sizes of organization in recruiting their staffs? Currently Im seeking a new job and i wonder how you can help me out. If you approached me because I founded a Soul-farmers, sorry im not staffing for it no more. \nThanks',
    createdAt: {
      seconds: 1547796577,
      nanoseconds: 583000000,
    },
    data: {
      conversationId: 'Jejj9nqyo7uDd1h5sfjV',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'Yoona Cho',
    unreadSubscribers: ['111627907165498119460'],
    id: 'YVoROZNGzBUBwik2KU5O',
  },
  {
    body: 'Hi, feel free to email, pirra@allerton.com.au',
    createdAt: {
      seconds: 1547791407,
      nanoseconds: 617000000,
    },
    data: {
      conversationId: 'z6vQftnA8dsUddUKIH6T',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'Pirra Griffiths',
    unreadSubscribers: ['111627907165498119460'],
    id: 'klfUlhC7WYSfUJy7dkR9',
  },
  {
    body: 'Hi Gloria I see you are a fellow Leonard user ;)',
    createdAt: {
      seconds: 1547791354,
      nanoseconds: 937000000,
    },
    data: {
      conversationId: 'Ds7TkyoF6T7t8T3q2JCC',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'Jordan Minhinnick',
    unreadSubscribers: ['111627907165498119460'],
    id: '0XbnIzfXmMHN0b9qcGX8',
  },
  {
    body: 'Sounds great! When you free',
    createdAt: {
      seconds: 1547790310,
      nanoseconds: 135000000,
    },
    data: {
      conversationId: 'AmcL4o73jNeXv2d5cYKN',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'lisa hollinshead',
    unreadSubscribers: ['111627907165498119460'],
    id: 'yGhsZLqPwS93zAhF5wFb',
  },
  {
    body:
      'Hi Gloria,\n\n\nHere is the spec for AR on our book. Let me know if you have any questions\nat this stage. Thanks for looking at it. \n\n \n\nCheers\n\nSarah\n\n \n\n\nSarah Cummings \nCo-founder and CEO\nM +61 412 669 880   E  <mailto:sarah@teachted.com.au> sarah@teachted.com.au\nW  <http://www.tedgoestohospital.com.au/> teachted.com.au\n\n\n\n\n\n\n\n <https://www.facebook.com/teachted/>\n<https://www.linkedin.com/company/teachted>\n<https://www.instagram.com/teachted/>\n<https://www.youtube.com/watch?v=fSx8Mbx9V1Q&feature=youtu.be> \n\n\nDISCLAIMER: This e-mail and any attachments is for the intended recipient\nonly and may contain legally privileged or confidential information. If you\nare not the intended recipient, copying or distributing this e-mail is\nprohibited. If you received this e-mail in error, please reply indicating so\nand delete all copies from your computer. Teach Ted.\n\n \n\n \n\n',
    createdAt: {
      seconds: 1547784192,
      nanoseconds: 446000000,
    },
    data: {
      conversationId: 'BW9MIFMbZfI4f3nSI27E',
      type: 'message',
    },
    showSubscribers: [
      '105593432000342352515',
      '111627907165498119460',
      '111148430739057241571',
      '108339087990646412306',
    ],
    subscribers: [
      '105593432000342352515',
      '111627907165498119460',
      '111148430739057241571',
      '108339087990646412306',
    ],
    title: 'Sarah Cummings',
    unreadSubscribers: ['111627907165498119460'],
    id: 'Auewb57JNt8BR6Fnw2Mm',
  },
  {
    body: 'j',
    createdAt: {
      seconds: 1547780129,
      nanoseconds: 801000000,
    },
    data: {
      conversationId: 'N6IJyhofsU3bMTlW166x',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'shams mosowi',
    unreadSubscribers: ['111627907165498119460'],
    id: 'hNYzTvUdid1rs6cAa1YX',
  },
  {
    body: 'a',
    createdAt: {
      seconds: 1547779858,
      nanoseconds: 393000000,
    },
    data: {
      conversationId: 'N6IJyhofsU3bMTlW166x',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'shams mosowi',
    unreadSubscribers: ['111627907165498119460'],
    id: 'X1ecYrLDMbywcQvHnSYM',
  },
  {
    body: 'f',
    createdAt: {
      seconds: 1547779858,
      nanoseconds: 14000000,
    },
    data: {
      conversationId: 'N6IJyhofsU3bMTlW166x',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'shams mosowi',
    unreadSubscribers: ['111627907165498119460'],
    id: 'o7TyJIVkbXkD0VcR6pHv',
  },
  {
    body: 'c',
    createdAt: {
      seconds: 1547779854,
      nanoseconds: 836000000,
    },
    data: {
      conversationId: 'N6IJyhofsU3bMTlW166x',
      type: 'message',
    },
    showSubscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    subscribers: [
      '111627907165498119460',
      '105593432000342352515',
      '108339087990646412306',
      '111148430739057241571',
      '118315975799505685916',
    ],
    title: 'shams mosowi',
    unreadSubscribers: ['111627907165498119460'],
    id: 'TaBoI5t5DgU80Rqmbk8s',
  },
];

function Notifications(props) {
  const { classes, showDialog, setShowDialog, history, uid } = props;

  moment.updateLocale('en', momentLocales);

  const [slideIn, setSlideIn] = useState(true);
  // const [unreadNotificationsState] = useCollection({
  //   path: COLLECTIONS.notifications,
  //   sort: { field: 'createdAt', direction: 'desc' },
  //   filters: [
  //     {
  //       field: 'unreadSubscribers',
  //       operator: 'array-contains',
  //       value: uid,
  //     },
  //   ],
  // });
  // const unreadNotifications = unreadNotificationsState.documents
  //   ? unreadNotificationsState.documents.length
  //   : 0;

  // const [notificationsState, notificationsDispatch] = useCollection({
  //   path: COLLECTIONS.notifications,
  //   sort: { field: 'createdAt', direction: 'desc' },
  //   filters: [
  //     {
  //       field: 'subscribers',
  //       operator: 'array-contains',
  //       value: uid,
  //     },
  //   ],
  // });
  // const notifications = notificationsState.documents;

  const handleClose = () => {
    setSlideIn(false);
    setTimeout(() => {
      setShowDialog(false);
    }, 100);
  };

  // useEffect(
  //   () => {
  //     if (!showDialog) setSlideIn(true);
  //     else markAsRead(uid, notifications);
  //   },
  //   [showDialog]
  // );

  const handleClick = data => {
    if (data.conversationId) {
      // history.push(`${ROUTES.conversations}?id=${data.conversationId}`);
      handleClose();
    }
  };

  const x = DUMMY_NOTIFICATIONS;

  // if (notificationsState.loading)
  //   return <CircularProgress className={classes.loader} size={24} />;

  if (showDialog)
    return (
      <Modal open={showDialog} onClose={handleClose} disableAutoFocus>
        <Slide in={slideIn} direction="up">
          <Paper elevation={24} classes={{ root: classes.paperRoot }}>
            {/* <ScrollyRolly
                dataState={notificationsState}
                dataDispatch={notificationsDispatch}
              > */}
            {x.map(x => (
              <ListItem
                key={x.id}
                button
                onClick={() => {
                  handleClick(x.data);
                }}
              >
                <Avatar>{getIcon(x.data.type)}</Avatar>
                <ListItemText
                  primary={
                    <Grid container justify="space-between" alignItems="center">
                      <Typography variant="subtitle1">{x.title}</Typography>
                      <Typography variant="body2" className={classes.timestamp}>
                        {moment.unix(x.createdAt.seconds).fromNow()}
                      </Typography>
                    </Grid>
                  }
                  secondary={x.body}
                  classes={{
                    root: classes.listItemTextRoot,
                    secondary: classes.listItemSecondary,
                  }}
                />
              </ListItem>
            ))}
            {/* </ScrollyRolly> */}
          </Paper>
        </Slide>
      </Modal>
    );
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  uid: PropTypes.string.isRequired,
};

export default withRouter(withStyles(styles)(Notifications));
