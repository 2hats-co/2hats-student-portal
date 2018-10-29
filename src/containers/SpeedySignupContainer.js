import React,{Component} from 'react'
import LogoInCard from '../components/LogoInCard';
import CurrentUniversity from '../components/InputFields/CurrentUniversity';
import withStyles from '@material-ui/core/styles/withStyles';

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
import { withRouter } from "react-router-dom";
import { CLOUD_FUNCTIONS } from '../utilities/CloudFunctions';
import {warmUp} from '../utilities/Authentication/warmUp'
import {speedyAuth} from '../utilities/Authentication/speedySignup'
const styles = theme => ({
    root: {
        height: '100vh',
    },
    webForm:{
        width:350,
        minHeight:350,
        marginLeft:50,
        marginRight:50,
    },
    mobileForm:{
        width:280,
    },
    button:{
        width:180,
        marginTop:0,
        marginBottom:50,
    },
    loading:{
        position:'relative',
        bottom:-39
    },
    mobileButton:{
        width:180,
        marginTop:20,
        marginBottom:50,
        margin:'auto',
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
            currentUniversity:'',
            industry:'',
            view:SPEEDY_SIGNUP.form,
            isPublic:true,
            isLoading:false
        }
        this.createUser = this.createUser.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.goHome = this.goHome.bind(this)
        this.goTo = this.goTo.bind(this)
        this.errorBar = this.errorBar.bind(this)
    }
    componentWillMount(){
        warmUp(CLOUD_FUNCTIONS.SPEEDY_SIGNUP)
        // if(this.props.history.location.hash ==='#UTS'){
        //     this.setState({isPublic:false})
        // }
        // window.Intercom('update',{
        //     'hide_default_launcher': true
        // })
    }
    goTo(route){
       this.props.history.replace(route) 
    }
    handleReset(){
        this.setState({
            firstName:'',
            lastName:'',
            email:'',
            currentUniversity:'',
            industry:'',
            view:SPEEDY_SIGNUP.form,
            isLoading: false,
            snackBar: null,
        })
    }
    
    createUser(){
        const { firstName, lastName, email, currentUniversity, industry } = this.state
        const userInfo = {
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            currentUniversity: currentUniversity,
            industry: industry,
        };

        this.setState({ isLoading: true });
        speedyAuth(userInfo,this.goTo,this.errorBar)

        // cloudFunction(CLOUD_FUNCTIONS.SPEEDY_SIGNUP, userInfo
        //     ,(result) => {
        //         this.setState({ isLoading: false })
        //         this.setState({ view: SPEEDY_SIGNUP.success })
        //         console.log("Call speedySignup success: ", result);
        //     }
        //     ,(error) => {
        //         console.log("Call speedySignup error: ", error);
        //     });
    }
    handleChange = (name,value) => {
       this.setState({[name]:value})
    };

    goHome(){
        window.open('https://2hats.com.au','_self')
    }
    errorBar(e){
        this.setState({snackBar:{message:e.message,variant:'error'},isLoading:false,link:'signin'})
    }
    renderForm(){
        const {classes,theme} = this.props
        const isMobile = theme.responsive.isMobile
        const {firstName,lastName,email,currentUniversity,industry,isLoading} = this.state
        return(<Grid className={isMobile? classes.mobileForm:classes.webForm} container  direction='column'>
                <Grid className={classes.header} item>
                <Typography variant={isMobile?'subheading':'title'} style={isMobile?{textAlign:'center'}:{}}>Welcome to 2hats!</Typography>
                <Typography variant={isMobile?'body1':'subheading'} style={isMobile?{textAlign:'center'}:{}}>Sign up to get paid placements and kickstart your professional career</Typography>
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
            <Grid container>
            <Typography variant='title' style={isMobile?{textAlign:'center'}:{}}>Congratulations, you’re almost there!</Typography>
            <Typography variant='body1' style={isMobile?{textAlign:'center'}:{}}>We’ve sent you an email to finish the sign up process.</Typography> 
            <Typography variant='body1' style={isMobile?{textAlign:'center'}:{}}>When you’re ready, submit your information to access job opporunties.</Typography>
            </Grid>
            </Grid>
            {isMobile &&<Grid item style={{marginTop:20}}>
                    <img src={celebratingMan}/>
                </Grid>}
            <Button className={isMobile?classes.mobileButton:classes.button} 
            variant='flat'
            onClick={isPublic? this.goHome:this.handleReset}>{isPublic? `Visit Website`:`Reset Form`}</Button>
            </Grid>
        )
    }
     render(){
         const {view,isLoading,snackBar} = this.state
         const {theme,classes} = this.props
         const isMobile = theme.responsive.isMobile
         return(
            <Grid container className={classes.root} alignItems="center" justify="center">
                <Grid item>
             <LogoInCard width={isMobile?320:680} height="auto" isLoading={isLoading} logoClass={isMobile?'centeredLogo':'miniLogo'}
             snackBar={snackBar} 
            >
                <Grid container direction={isMobile?'column':'row'} alignItems='center'>
                {view === SPEEDY_SIGNUP.form? this.renderForm():this.renderCongrats()}
                {!isMobile &&
                <Grid item>
                    <img className={classes.img} src={view === SPEEDY_SIGNUP.success? celebratingMan:girlWithLaptop}/>
                </Grid>}
                </Grid>
             </LogoInCard>
             </Grid>
            </Grid>
         )
     }
}
export default  withRouter(withStyles(styles,{ withTheme: true })(SpeedySignupContainer))
