import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import {
  CAREER_INTERESTS,
  getIndustryFromInterests,
} from '../../constants/resumeBuilderPrompts';
import TextField from '@material-ui/core/TextField';

const INTERESTS_DATA_TYPE = {
  default: 'default',
  custom: 'custom',
};
const styles = theme => ({
  root: {},
  group: {
    marginTop: 20,
  },
  groupHeader: {
    fontSize: '16px',
    color: '#000',
    //  marginBottom:5
  },
  label: {
    fontSize: '15px',
    marginRight: 0,
  },
  checkBox: {
    height: 15,
    fontSize: '15px',
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  link: {
    color: theme.palette.primary.light,
    cursor: 'pointer',
    textDecoration: 'underline',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
class CareerInterests extends React.Component {
  switchToOther() {
    this.props.changeHandler('careerInterests', {
      type: INTERESTS_DATA_TYPE.custom,
      value: [],
    });
    this.props.changeHandler('industry', 'OTHER');
  }
  switchToOptions() {
    this.props.changeHandler('careerInterests', {
      type: INTERESTS_DATA_TYPE.default,
      value: [],
    });
    // this.props.changeHandler('customInterest','')
  }

  handleChange = name => event => {
    if (event.target.checked) {
      const newInterests = this.props.preSelectedList.value.concat(name);
      this.props.changeHandler('careerInterests', {
        type: INTERESTS_DATA_TYPE.default,
        value: newInterests,
      });
      this.props.changeHandler(
        'industry',
        getIndustryFromInterests(newInterests)
      );
    } else {
      const newInterests = this.props.preSelectedList.value.filter(
        x => x !== name
      );
      this.props.changeHandler('careerInterests', {
        type: INTERESTS_DATA_TYPE.default,
        value: newInterests,
      });
      this.props.changeHandler(
        'industry',
        getIndustryFromInterests(newInterests)
      );
    }
  };
  renderCheckBox(item) {
    const { classes, preSelectedList } = this.props;
    return (
      <FormControlLabel
        className={classes.label}
        style={{ fontSize: '30px' }}
        key={item.key}
        control={
          <Checkbox
            key={item.key + 'checkbox'}
            className={classes.checkBox}
            disabled={
              this.props.preSelectedList.value.length > 2 &&
              !this.props.preSelectedList.value.includes(item.key)
            }
            checked={preSelectedList.value.includes(item.key)}
            id={`${item.key}-checkbox-${preSelectedList.value.includes(
              item.key
            )}`}
            onChange={this.handleChange(item.key)}
            value={item.label}
          />
        }
        label={item.label}
      />
    );
  }
  renderCheckBoxGroup(label, options) {
    const { classes } = this.props;
    return (
      <Grid
        key={label + 'column'}
        item
        style={{ minWidth: 190 }}
        xs={12}
        sm={6}
        md={3}
        lg={3}
      >
        <FormControl className={classes.group} key={label} component="fieldset">
          <FormLabel className={classes.groupHeader} component="legend">
            {label}
          </FormLabel>
          <FormGroup>
            {options.map(option => this.renderCheckBox(option))}
          </FormGroup>
        </FormControl>
      </Grid>
    );
  }
  render() {
    const { classes, preSelectedList, hideTitle, changeHandler } = this.props;
    if (preSelectedList.type === INTERESTS_DATA_TYPE.custom) {
      return (
        <div className={classes.root}>
          {!hideTitle && (
            <Typography variant="h6" color="primary">
              Career Interests — Custom
            </Typography>
          )}

          <TextField
            id="otherInterest"
            key="otherInterest"
            //label="your career interest"
            placeholder="Add your career interest here"
            onChange={e => {
              changeHandler('careerInterests', {
                type: INTERESTS_DATA_TYPE.custom,
                value: [e.target.value],
              });
            }}
            value={preSelectedList.value[0]}
            style={{
              marginTop: 20,
              width: '100%',
              maxWidth: 250,
              marginBottom: 5,
            }}
            margin="normal"
            color="primary"
          />
          <Typography variant="body2" className={classes.text}>
            Note: We can't guarantee that we will be able to find you a career
            placement in your specific field of interest, but we will do our
            best.
          </Typography>

          <Typography variant="body2" className={classes.text}>
            Want to check career interests from 2hats again?{' '}
            <a
              className={classes.link}
              onClick={this.switchToOptions.bind(this)}
            >
              Click here
            </a>
          </Typography>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          {!hideTitle && (
            <Typography variant="h6" color="primary">
              Career Interests — {3 - preSelectedList.value.length} remaining
            </Typography>
          )}
          <Grid container direction="row" justify="space-between">
            {CAREER_INTERESTS.map(list =>
              this.renderCheckBoxGroup(list.label, list.items)
            )}
          </Grid>
          <Typography variant="body2" className={classes.text}>
            Don't see your career interest?{' '}
            <a className={classes.link} onClick={this.switchToOther.bind(this)}>
              Click here
            </a>
          </Typography>
        </div>
      );
    }
  }
}

CareerInterests.propTypes = {
  classes: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired,
  preSelectedList: PropTypes.exact({
    type: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
  }),
};
export default withStyles(styles)(CareerInterests);
