import React,{Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import LinkedinIcon from '../../assets/images/social/linkedin.svg'
import {LINKEDIN_CID} from '../../config/auth'

const styles = theme => ({
    root: {
      paddingLeft: 50,
      paddingRight: 50,
      height: 500
    },
    socialButton: {
      margin: 5,
      width: 250,
      height: 40,
      color: '#fff',
      backgroundColor: '#0077B5' 
    },
    socialIcon: {
      marginRight: 17
    },
  });
class LinkedinButton extends Component{
    constructor(props){
        super(props)
        this.handleLinkedInAuth = this.handleLinkedInAuth.bind(this)
    }
    componentWillMount(){
        this.initializeLinkedin(LINKEDIN_CID);
    }
    initializeLinkedin = clientId => {
        ; ((d, s, id) => {
          const element = d.getElementsByTagName(s)[0]
          const ljs = element
          let js = element
          if (d.getElementById(id)) {return }
          js = d.createElement(s)
          js.id = id
          js.src = `//platform.linkedin.com/in.js`
          js.text = `api_key: ${clientId}`
          ljs.parentNode.insertBefore(js, ljs)
        })(document, 'script', 'linkedin-jssdk')
      }
      handleLinkedInAuth = () => {
        const fields = ":(id,email-address,headline,summary,first-name,last-name,num-connections,picture-urls::(original))";
        window.IN.API.Raw(`/people/~${fields}`).result(async r => {
          console.log('linked in response -->', r);
      })
    }
    authorize = e => {
        window.IN.User.authorize(this.handleLinkedInAuth, '')
      }    
    render(){
      const {classes} = this.props
        return(
            <Button key={`linkedin-button`} variant='flat'
          onClick={this.authorize}
          className={classes.socialButton}>
          <div className={classes.socialIcon} >
            <img alt={'linkedinLogo'} src={LinkedinIcon} />
          </div> Authenticate with Linkedin
        </Button>
        )
    }

}
export default withStyles(styles)(LinkedinButton)