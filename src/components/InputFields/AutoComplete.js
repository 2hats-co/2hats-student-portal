import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputWrapper from './InputWrapper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  noOptionsMessage: {
    fontSize: 16,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 12,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 12,
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return (
    <div ref={inputRef} style={{ height: 30, marginTop: -1 }} {...props} />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 400 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

// eslint-disable-next-line no-extend-native
Array.prototype.findReg = function(match) {
  var reg = new RegExp(match, 'i');
  return this.filter(function(item) {
    return typeof item === 'string' && item.match(reg);
  });
};
function optionsGenerator(list, input) {
  if (input === '') {
    return list.slice(0, 20).map(x => {
      return { label: x };
    });
  } else {
    let filteredList = list.findReg(input);
    if (filteredList.length === 0) {
      return [{ label: input }];
    } else {
      return filteredList.slice(0, 20).map(x => {
        return { label: x };
      });
    }
  }
}
class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      single: null,
      value: '',
      freeText: '',
      shrink: false,
    };
    this.ValueContainer = this.ValueContainer.bind(this);
    this.Control = this.Control.bind(this);
  }
  SingleValue(props) {
    return (
      <Typography
        variant="body2"
        {...props.innerProps}
        style={{ fontSize: '12px !important' }}
      >
        {props.children}
      </Typography>
    );
  }
  ValueContainer(props) {
    return (
      <div className={props.selectProps.classes.valueContainer}>
        {props.children}
      </div>
    );
  }
  Control(props) {
    return (
      <TextField
        fullWidth
        label={this.props.hasLabel && this.props.label}
        onFocus={() => {
          this.setState({ shrink: true });
          if (this.props.focusedField) {
            this.props.changeHandler('focusedField', this.props.name);
          }
        }}
        onChange={e => {
          this.setState({ freeText: e.target.value });
        }}
        InputLabelProps={{
          shrink: this.state.shrink || this.props.value !== '',
        }}
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            ref: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
      />
    );
  }
  handleChange = name => value => {
    this.props.changeHandler(
      name,
      value && value.label.includes('\u2063')
        ? value.label.split('\u2063')[0]
        : value.label
    );
  };
  render() {
    const { classes, list, value, hasLabel, name, hint, title } = this.props;

    const options = optionsGenerator(list, this.state.freeText);

    const components = {
      Option,
      Control: this.Control,
      NoOptionsMessage,
      Placeholder,
      SingleValue: this.SingleValue,
      ValueContainer: this.ValueContainer,
    };
    return (
      <div className={classes.root} style={{ marginTop: -20 }}>
        <InputWrapper
          title={!hasLabel ? title : ''}
          hint={!hasLabel ? hint : ''}
        >
          <Select
            className={classes.root}
            allowCreate
            classes={classes}
            options={options.map(x => {
              return { label: x.label };
            })}
            components={components}
            value={{
              label:
                value && value.includes('\u2063')
                  ? value.split('\u2063')[0]
                  : value,
            }}
            onChange={this.handleChange(name)}
            placeholder=""
          />
        </InputWrapper>
      </div>
    );
  }
}
AutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(AutoComplete);
