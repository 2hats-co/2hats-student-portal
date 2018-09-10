import React, { Component } from "react";
//Redux
import { compose } from 'recompose';
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
import { COLLECTIONS,LISTENER } from "../constants/firestore"; 
import withAuthorisation from '../utilities/Session/withAuthorisation'
import { withStyles } from '@material-ui/core/styles';
import {remoteConsole} from '../utilities/remoteLogging'
import { Button,Grid} from "@material-ui/core";
import moment from 'moment'
const styles = theme => ({})
class RemoteLoggerContainer extends Component{
    componentWillMount(){
        remoteConsole.start()
    }
    componentWillUnmount(){
        //stopRemoteLogger()
    }
    render(){
        if(this.props.logs && this.props.logs[0].logs)
        {
           const logs = this.props.logs[0].logs
        return(
        <div>
            <Button onClick={remoteConsole.start} variant='flat'>
                Start logging
            </Button>
            <Button onClick={remoteConsole.stop} variant='flat'>
                stop logging
            </Button>
            <Button onClick={remoteConsole.clear} variant='flat'>
                clear logs
            </Button>
            <Grid container direction='row'>
                {logs.map((x)=>{
                
                    return <Grid item xs={12} key={x.id}>
                    {moment(parseInt(x.id)).fromNow()}
                    : {x.message}</Grid>
                })}
            </Grid>
        </div>
        ) 
        }else{return(<div/>)}
       

    }
}
const enhance = compose(
      // add redux store (from react context) as a prop
      withFirestore,
      // Handler functions as props
      withHandlers({
        loadData: props => listenerSettings =>
          props.firestore.setListener(listenerSettings),
      }),
      // Run functionality on component lifecycle
      lifecycle({
        // Load data when component mounts
        componentWillMount() {
          if(this.props.uid){
        
    
      const logsListenerSettings = { collection: COLLECTIONS.remoteLogs, doc:this.props.uid, subcollections: [{ collection: 'logs' }] }
      this.props.loadData(logsListenerSettings);
          }
        },
        componentDidUpdate(prevProps,prevState){
          if(prevProps.uid !== this.props.uid){
         
       
            const logsListenerSettings = { collection: COLLECTIONS.remoteLogs, doc:this.props.uid, subcollections: [{ collection: 'logs' }] }
            this.props.loadData(logsListenerSettings);
            
          }
        },
      }),
      connect(({ firestore }) => ({
         logs: firestore.ordered.remoteLogs,
      }))
      
    )
    const authCondition = (authUser) => !!authUser;
    export default enhance(
      compose(
        withAuthorisation(authCondition)(withStyles(styles)(RemoteLoggerContainer))
      ))
