import React from "react";
import { withRouter } from "react-router-dom";
import LogoInCard from "../components/LogoInCard";
import { Typography } from "@material-ui/core";

import { auth } from "../store";
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';

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
							props.history.replace(route + `?firstName=${firstName}`);
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
