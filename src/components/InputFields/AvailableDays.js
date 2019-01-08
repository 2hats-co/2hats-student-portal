import React from 'react';
import DropDown from '../InputFields/DropDown';

function AvailableDaysConverter(string) {
  const days = string;
  let number = parseInt(days);
  if (days.includes('½')) {
    number = number + 0.5;
  }
  return number;
}
class AvailableDays extends React.Component {
  handleChange(name, value) {
    this.props.changeHandler(name, value);
    this.props.changeHandler(`${name}Num`, AvailableDaysConverter(value));
  }
  render() {
    const { value, hasLabel, maxWidth } = this.props;
    return (
      <DropDown
        hasLabel={hasLabel}
        maxWidth={maxWidth}
        title="Available Days"
        label="Available Days"
        name="availableDays"
        value={value}
        changeHandler={this.handleChange.bind(this)}
        // list={["1 Day","2 Days","3 Days","4 Days","5 Days"]}
        list={[
          '1 Day',
          '1½ Days',
          '2 Days',
          '2½ Days',
          '3 Days',
          '3½ Days',
          '4 Days',
          '4½ Days',
          '5 Days',
        ]}
        hint="How many days are you available to work per week (Mon-Fri)?"
      />
    );
  }
}

export default AvailableDays;
