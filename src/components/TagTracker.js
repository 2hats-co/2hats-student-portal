import React,{Component} from 'react'
import { withRouter } from "react-router-dom";
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
class TagTracker extends Component {


    componentDidMount(){
        const {location} = this.props.history
        const tracker = location.hash;
        if(tracker){
            cloudFunction(CLOUD_FUNCTIONS.TAG_TRACKER, {type:'Links',name:tracker.replace('#','')} ,(o)=>{console.log(o)}, (e)=>{console.log(e)})
        }
    }
    render(){

        return(<div/>)
    }

}
export default withRouter(TagTracker)