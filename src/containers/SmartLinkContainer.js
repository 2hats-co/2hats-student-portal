import React from "react";
import { withRouter } from "react-router-dom";
import LogoInCard from "../components/LogoInCard";
import { Typography } from "@material-ui/core";

import { auth,db } from "../store";
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
import * as routes from '../constants/routes'
import { COLLECTIONS } from "../constants/firestore";
function SmartLinkContainer(props) {
	const queryStr = props.history.location.search;

	if (queryStr) {
		const slKeyName = "?slKey=";

		if (queryStr.indexOf(slKeyName) !== -1) {
			const slKey = queryStr.slice(slKeyName.length, queryStr.length);

			if (slKey !== "") {
				const request = {
					slKey: slKey
				};

				cloudFunction(CLOUD_FUNCTIONS.SMART_LINK, request,
					(result) => {
						// Sign in user with custom token.
						auth.signInWithCustomToken(result.data.token).then(authUser => {
							// Redirect page based on the route.
							const route = result.data.route;
							const firstName = authUser.user.displayName.split(" ")[[0]];
							//routing to target page
							if(route === routes.CREATE_PASSWORD ||route === routes.RESET_PASSWORD ){
							props.history.replace(route + `?firstName=${firstName}`);
							}else if(route === routes.VALIDATE_EMAIL){
							db.collection(COLLECTIONS.users).doc(authUser.user.uid).update({emailVerified:true})
							props.history.replace(route);
							}else{
							props.history.replace(route);
							}
						});
					},
					(error) => {
						// Getting the Error details.
						console.log("Call smartLink error: ", error.message);
					});
			}
		}
	}

	return (
		<LogoInCard isLoading={true}>
			<Typography variant='title' style={{ width: '100%', textAlign: 'center' }}>Please hold as we redirect you</Typography>
		</LogoInCard>
	);
}

export default withRouter(SmartLinkContainer);
