import React from 'react'

class ChangeAdaper extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange
    }
handleChange = name => event => {
    const value =event.target.value
        if (!value){
        this.props.changeHandler(name,' ')
        }
        this.props.changeHandler(name,value.trim())
};
    componentDidUpdate(prevProps, prevState){
    if(prevState !== this.state){
    this.props.changeHandler(this.props.name,this.state.inputValue)
    }
}
    render() {
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { changeHandler: this.handleChange }));
    return <div style={{width:'100%'}}>{childrenWithProps}</div>
  }
}
export default ChangeAdaper