import React from "react";
import { withRouter } from "react-router-dom";
import LogoInCard from "../components/LogoInCard";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

import { auth,db } from "../store";
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
import * as routes from '../constants/routes'
import { COLLECTIONS } from "../constants/firestore";
class SmartLinkContainer extends React.Component{
	state={isLoading:true,errorMessage:''}


	componentDidMount(){
		this.handleKey()
	}
	handleKey(){
		const {history} = this.props
		const queryStr = history.location.search;
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
							//routing to target page
							if(route === routes.CREATE_PASSWORD ||route === routes.RESET_PASSWORD ){
								const firstName = authUser.user.displayName.split(" ")[[0]];
								history.replace(route + `?firstName=${firstName}?smartKey=${slKey}`);
							}else if(route === routes.VALIDATE_EMAIL){
							db.collection(COLLECTIONS.users).doc(authUser.user.uid).update({emailVerified:true})
							history.replace(route);
							}else{
							history.replace(route);
							}
						});
					},
					(error) => {
						// Getting the Error details.
						console.log("Call smartLink error: ", error.message);
						this.setState({errorMessage:error.message,isLoading:false})
					});
			}
		}
	}

	}
	render(){
		
		const {isLoading,errorMessage} = this.state

	return (
		<Grid container style={{height:'100vh'}} alignItems="center" justify="center">
                <Grid item>
		<LogoInCard isLoading={isLoading} height={330}>
			<Typography variant='title' style={{ paddingTop:50,width: '100%', textAlign: 'center' }}>{isLoading?'Hold on to your hat 🤠':errorMessage}</Typography>
		</LogoInCard>
		</Grid>
		</Grid>
	);


	}
	
}

export default withRouter(SmartLinkContainer);
