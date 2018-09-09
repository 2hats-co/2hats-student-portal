import React from 'react';
import DropDown from "../InputFields/DropDown";

class WorkingRights extends React.Component{
    handleChange(name,value){
        this.props.changeHandler(name,value)
        this.props.changeHandler('workRestricted',(!value.includes('Unrestricted')))
    }
    render(){
        const {value,hasLabel,maxWidth} = this.props
        return(
            <div style={{paddingTop:20}}>
                <DropDown
                hasLabel={hasLabel}
                maxWidth ={maxWidth}
                title={"Work Condition"}
                label={"Work Condition"}
                name="workingRights"
                value={value}
                changeHandler={this.handleChange.bind(this)}
                list={["Unrestricted - full working rights in Australia", "Restricted - up to 40 hours per fortnight"]}
                hint={"We accept candidates with both restricted and unrestricted working rights. Your answer will not impact your submission."}
                />
            </div>
        )
    }
}

export default WorkingRights
