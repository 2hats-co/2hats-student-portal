import React from "react";
import { withRouter } from "react-router-dom";
import { auth, functions } from "../store";
import { CREATE_PASSWORD } from "../constants/routes";
import LogoInCard from "../components/LogoInCard";
import { Typography } from "@material-ui/core";

class SmartLinkContainer extends React.Component {
  componentWillMount() {
    const queryStr = this.props.history.location.search;

    if (queryStr) {
      const slKeyName = "?slKey=";

      if (queryStr.indexOf(slKeyName) !== -1) {
        const slKeyVal = queryStr.slice(slKeyName.length, queryStr.length);

        if (slKeyVal !== "") {
          this.setState({ slKey: slKeyVal });
        }
      }
    }
  }

  render() {
    const { slKey } = this.state;
    const restApiSmartLink = functions.httpsCallable("restApiSmartLink");

    restApiSmartLink({ slKey: slKey })
      .then(async result => {
        // Sign in user with custom token.
        const authUser = await auth.signInWithCustomToken(result.data.token);

        // Redirect page based on the route.
        const route = result.data.route;
        const firstName = authUser.user.displayName.split(" ")[[0]];
        this.props.history.replace(route + `?firstName=${firstName}`);
      })
      .catch(error => {
        // Getting the Error details.
        console.log("Call restApiSmartLink error: ", error);
      });

    return(<LogoInCard isLoading={true}>
      <Typography variant='title' style={{width:'100%',textAlign:'center'}}>Please hold as we redirect you</Typography>
    </LogoInCard>);
  }
}

export default withRouter(SmartLinkContainer);
