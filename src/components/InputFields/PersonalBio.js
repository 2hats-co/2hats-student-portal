import React from 'react'
import MultiLineTextField from './MultiLineTextField'
import {getPrompts} from '../../constants/resumeBuilderPrompts'
function PersonalBio(props){
    const {changeHandler,industry,bio} = props
    return(
        <MultiLineTextField
        title="Personal Bio"
        hint="This bio should focus on your key achievement and what value you can bring to the position-providing companies."
        placeholder={`For example: ${getPrompts(industry).bio}`}
        value={bio}
        name='bio'
        characterLimit={400}
        changeHandler={changeHandler}
      />
    )

}
export default PersonalBio