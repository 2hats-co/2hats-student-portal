import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import DownloadIcon from '@material-ui/icons/ArrowDownward';

import { Document, Page } from 'react-pdf';
import EduExpCard from './EduExpCard';

const styles = theme => ({
  subheading: {
    marginTop: 40,
    marginBottom: 10,
    fontWeight: 700,
    '&:first-of-type': {
      marginTop: 8,
    },
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  downloadChip: {
    margin: '0 auto 10px',
  },
  downloadChiplabel: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  pdfDocument: {
    width: 'calc(100vw - 20px - 28px - 28px)',
    maxWidth: 650,
  },
  pdfPage: {
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    marginBottom: 8,
  },
});

class submissionDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { numPages: 0 };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { submission, classes } = this.props;
    const { numPages } = this.state;

    const pages = [];
    for (let i = 0; i < numPages; i++) {
      pages.push(
        <Page
          pageNumber={i + 1}
          key={i}
          width={
            window.innerWidth > 920 ? 650 : window.innerWidth - 20 - 28 * 2
          }
          className={classes.pdfPage}
        />
      );
    }

    return (
      <React.Fragment>
        <Typography className={classes.subheading} variant="subtitle1">
          Bio:
        </Typography>
        <Typography variant="body2">
          {submission.submissionContent.bio}
        </Typography>

        <Typography className={classes.subheading} variant="subtitle1">
          Skills:
        </Typography>
        {submission.submissionContent.skills.map(x => (
          <Chip color="primary" label={x} key={x} className={classes.chip} />
        ))}

        {submission.submissionContent.process === 'build' && (
          <div>
            <Typography className={classes.subheading} variant="subtitle1">
              education
            </Typography>
            {submission.submissionContent.education.map(x => (
              <EduExpCard
                title={x.degree}
                label={x.major}
                description={x.description}
                startDate={x.startDate}
                endDate={x.endDate}
              />
            ))}
            <Typography className={classes.subheading} variant="subtitle1">
              experince
            </Typography>
            {submission.submissionContent.experience.map(x => (
              <EduExpCard
                title={`${x.title} - ${x.type}`}
                label={x.organisation}
                description={x.description}
                startDate={x.startDate}
                endDate={x.endDate}
              />
            ))}
          </div>
        )}

        <Typography className={classes.subheading} variant="subtitle1">
          {submission.submissionContent.process === 'upload'
            ? 'Resume'
            : 'profile'}
          :
        </Typography>
        {submission.submissionContent.process === 'upload' && (
          <React.Fragment>
            <Chip
              key={submission.submissionContent.resumeFile.fullPath}
              //label={resumeFile.name.length > 30 ? resumeFile.name.substr(0,29) + "…" : resumeFile.name}
              label={submission.submissionContent.resumeFile.name}
              onClick={() => {
                window.open(
                  submission.submissionContent.resumeFile.downloadURL,
                  '_blank'
                );
              }}
              className={classes.downloadChip}
              avatar={
                <DownloadIcon
                  style={{ transform: 'scale(0.8)', marginRight: -12 }}
                />
              }
              style={{ maxWidth: '100%' }}
              classes={{ label: classes.downloadChiplabel }}
            />

            <Document
              onLoadSuccess={this.onDocumentLoadSuccess}
              file={submission.submissionContent.resumeFile.downloadURL}
              className={classes.pdfDocument}
            >
              {pages}
            </Document>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(submissionDetails);
