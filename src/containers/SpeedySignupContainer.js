import React,{Component} from 'react'
import LogoInCard from '../components/LogoInCard';
import CurrentUniversity from '../components/InputFields/CurrentUniversity';
import { withStyles, withTheme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Email from '../components/InputFields/Email'
import Disclaimer from '../components/Authentication/Disclaimer'
import Name from '../components/InputFields/Name'
import Button from '@material-ui/core/Button';

import ChangeAdpter from '../components/InputFields/ChangeAdapter'
import girlWithLaptop from '../assets/images/graphics/girlWithLaptop.png'
import celebratingMan from '../assets/images/graphics/congratsMan.svg'
import Industy from '../components/InputFields/Industry';


import {SPEEDY_SIGNUP} from '../constants/views'

import request from 'superagent'
import { withRouter } from "react-router-dom";
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';

const styles = theme => ({
    root: {
      paddingLeft: 50,
      paddingRight: 50,
      height: 500
    },
    webForm:{
        width:350,
        minHeight:350
    },
    mobileForm:{
        width:250,
       // marginLeft:50
    },
    button:{
        width:180,
        marginTop:20
    },
    loading:{
        position:'relative',
        bottom:-39
    },
    mobileButton:{
        width:180,
        marginTop:20,
        margin:'auto'
    },img:{
        marginRight:20,
        marginBottom:50
    },header:{
        marginBottom:10
    },
    
  });
class SpeedySignupContainer extends Component {
    constructor(props){
        super(props)
        this.state ={
            firstName:'',
            lastName:'',
            email:'',
            currentUniversity:'University of Technology Sydney',
            industry:'',
            view:SPEEDY_SIGNUP.form,
            isPublic:true,
            isLoading:false
        }
        this.createUser = this.createUser.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.goHome = this.goHome.bind(this)
    }
    componentWillMount(){
        if(this.props.history.location.hash ==='#UTS'){
            this.setState({isPublic:false})
        }
        window.Intercom('update',{
            'hide_default_launcher': true
        })
    }
    handleReset(){
        this.setState({
            firstName:'',
            lastName:'',
            email:'',
            currentUniversity:'University of Technology Sydney',
            industry:'',
            view:SPEEDY_SIGNUP.form,
            isLoading: false
        })
    }
    
    createUser(){
        const { firstName, lastName, email, currentUniversity, industry } = this.state
        const userInfo = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            currentUniversity: currentUniversity,
            industry: industry
        };

        this.setState({ isLoading: true });
        cloudFunction(CLOUD_FUNCTIONS.SPEEDY_SIGNUP, userInfo
            ,(result) => {
                this.setState({ isLoading: false })
                this.setState({ view: SPEEDY_SIGNUP.success })
                console.log("Call speedySignup success: ", result);
            }
            ,(error) => {
                console.log("Call speedySignup error: ", error);
            });
    }
    handleChange = (name,value) => {
       this.setState({[name]:value})
    };

    goHome(){
        window.open('https://2hats.com.au','_self')
    }
    
    renderForm(){
        const {classes,theme} = this.props
        const isMobile = theme.responsive.isMobile
        const {firstName,lastName,email,currentUniversity,industry,isLoading} = this.state
        return(<Grid className={isMobile? classes.mobileForm:classes.webForm} container  direction='column'>
                <Grid className={classes.header} item>
                <Typography variant={isMobile?'subheading':'title'} style={isMobile?{textAlign:'center'}:{}}>Welcome to the UTS Career Fair!</Typography>
                <Typography variant={isMobile?'body1':'subheading'} style={isMobile?{textAlign:'center'}:{}}>Sign up below to get ahead on your professional career</Typography>
                   </Grid>
                    <ChangeAdpter changeHandler={this.handleChange}>
                        <Name firstName={firstName} lastName={lastName}/>
                    </ChangeAdpter>
                    <ChangeAdpter changeHandler={this.handleChange}>
                        <Email key="emailField" value={email} changeHandler={this.handleChange} />
                    </ChangeAdpter>
                    <CurrentUniversity hasLabel 
               value={currentUniversity} 
               changeHandler={this.handleChange}/>
               <Industy hasLabel value={industry} changeHandler={this.handleChange}/>
               
               <Disclaimer/>
                <Button className={isMobile?classes.mobileButton:classes.button}
                disabled={isLoading} 
                variant='flat' onClick={this.createUser}>Sign up!</Button>
            </Grid>
            )
    }
    renderCongrats(){
        const {classes,theme} = this.props
        const {isMobile} = theme.responsive
        const {isPublic} = this.state
        return(
            <Grid className={isMobile? classes.mobileForm:classes.webForm} container direction='column' alignItems={isMobile?'center':'flex-start'} justify='space-between'>
            {!isMobile&& <Grid item/>}
            <Grid item>
            <Grid container style={{height:100}} justify='space-between'>
            <Typography variant='title' style={isMobile?{textAlign:'center'}:{}}>Congratulations, You’re Almost There!</Typography>
            <Typography variant='body1' style={isMobile?{textAlign:'center'}:{}}>We’ve sent you an email to finish the sign up process.</Typography> 
            <Typography variant='body1' style={isMobile?{textAlign:'center'}:{}}>When you’re ready, submit your information to access job opporunties.</Typography>
            </Grid>
            </Grid>
            {isMobile &&<Grid item>
                    <img src={celebratingMan}/>
                </Grid>}
            <Button className={isMobile?classes.mobileButton:classes.button} 
            variant='flat'
            onClick={isPublic? this.goHome:this.handleReset}>{isPublic? `Visit Website`:`Reset Form`}</Button>
            </Grid>
        )
    }
     render(){
         const {view,isLoading} = this.state
         const {theme,classes} = this.props
         const isMobile = theme.responsive.isMobile
         return(
             <LogoInCard width={isMobile?290:755} height={520} isLoading={isLoading}>
            
                <Grid container direction={isMobile?'column':'row'} alignItems='center' justify='space-around'>
                {view === SPEEDY_SIGNUP.form? this.renderForm():this.renderCongrats()}
                {!isMobile &&
                <Grid item>
                    <img className={classes.img} src={view === SPEEDY_SIGNUP.success? celebratingMan:girlWithLaptop}/>
                </Grid>}
                </Grid>
             </LogoInCard>
         )
     }
}
export default  withRouter(withStyles(styles,{ withTheme: true })(SpeedySignupContainer))