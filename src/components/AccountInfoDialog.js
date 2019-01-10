import React from 'react';
import Dialog from './Dialog';

//Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withFirestore } from '../utilities/withFirestore';
import { COLLECTIONS } from '../constants/firestore';
import WorkingRights from './InputFields/WorkingRights';
import PhoneNumber from './InputFields/PhoneNumber';
import CurrentUniversity from './InputFields/CurrentUniversity';
import Name from './InputFields/Name';
import ChangeAdpter from './InputFields/ChangeAdapter';
import AvailableDays from './InputFields/AvailableDays';
import PromoCode from './InputFields/PromoCode';

class AccountInfoDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unChanged: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentWillMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.loadData();
    }
  }
  loadData() {
    if (this.props.user) {
      const {
        firstName,
        lastName,
        phoneNumber,
        workingRights,
        currentUniversity,
        availableDays,
        promoCode,
      } = this.props.user;
      this.handleChange('firstName', firstName);
      this.handleChange('lastName', lastName);
      this.handleChange('phoneNumber', phoneNumber);
      this.handleChange('workingRights', workingRights);
      this.handleChange('currentUniversity', currentUniversity);
      this.handleChange('availableDays', availableDays);
      this.handleChange('promoCode', promoCode);
      this.setState({ unChanged: true });
    }
  }
  handleCancel = () => {
    this.loadData();
    this.props.closeHandler();
  };
  handleUpdate() {
    let stateCopy = Object.assign(this.state, {});
    delete stateCopy.unChanged;
    this.props.onUserUpdate(stateCopy);
    this.props.onProfileUpdate(stateCopy);
    this.props.closeHandler();
  }
  handleChange(name, value) {
    if (value) {
      // console.log(name, value);
      this.setState({ [name]: value });
      this.setState({ unChanged: false });
    }
  }
  render() {
    const { open } = this.props;

    if (this.state) {
      const {
        firstName,
        lastName,
        phoneNumber,
        workingRights,
        currentUniversity,
        availableDays,
        promoCode,
      } = this.state;
      return (
        <Dialog
          activity="Edit"
          unChanged={this.state.unChanged}
          title="Account Information"
          open={open}
          addHandler={() => {
            this.handleUpdate();
          }}
          disabled={!firstName || !lastName}
          cancelHandler={() => {
            this.handleCancel();
          }}
        >
          <div style={{ minWidth: 300 }}>
            <ChangeAdpter changeHandler={this.handleChange}>
              <Name firstName={firstName} lastName={lastName} />
            </ChangeAdpter>
            <CurrentUniversity
              hasLabel
              value={currentUniversity}
              changeHandler={this.handleChange}
            />
            <div style={{ marginTop: 6 }}>
              <WorkingRights
                hasLabel
                value={workingRights}
                changeHandler={this.handleChange}
              />
            </div>
            <div style={{ marginTop: 6 }}>
              <AvailableDays
                hasLabel
                value={availableDays}
                changeHandler={this.handleChange}
              />
            </div>
            <div style={{ marginTop: 8 }}>
              <PhoneNumber
                hasLabel
                value={phoneNumber}
                changeHandler={this.handleChange}
              />
            </div>
            <div style={{ marginTop: 8 }}>
              <PromoCode
                hasLabel
                value={promoCode}
                changeHandler={this.handleChange}
              />
            </div>
          </div>
        </Dialog>
      );
    } else {
      return <div />;
    }
  }
}
const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    onUserUpdate: props => data =>
      props.firestore.update(
        { collection: COLLECTIONS.users, doc: props.uid },
        {
          ...data,
          updatedAt: props.firestore.FieldValue.serverTimestamp(),
        }
      ),
    onProfileUpdate: props => data =>
      props.firestore.update(
        { collection: COLLECTIONS.profiles, doc: props.uid },
        {
          ...data,
          updatedAt: props.firestore.FieldValue.serverTimestamp(),
        }
      ),
  })
);
export default enhance(AccountInfoDialog);
