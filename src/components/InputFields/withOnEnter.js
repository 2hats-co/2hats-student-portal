import React,{Component} from 'react'
export const withOnEnter = (WrappedComponent) => {
  class WithOnEnter extends Component {
    
    handleKeyPress = (e) => {
        if(this.props.primaryAction){
        if (e.key === 'Enter') {
            this.props.primaryAction()
          }
        }
      }
      render(){
          return(
            <WrappedComponent {...this.props}
            handleKeyPress={this.handleKeyPress}
            />
          )
      }
  }
  return WithOnEnter
}