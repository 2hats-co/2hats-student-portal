import React from 'react'
import MultiLineTextField from './MultiLineTextField'
import {getPrompts} from '../../constants/resumeBuilderPrompts'
function PersonalBio(props){
    const {changeHandler,industry,bio,hideTitle} = props
    return(
        <MultiLineTextField
        title={!hideTitle?"personal bio":''}
        hint="This bio should focus on your key achievement and what value you can bring to the position-providing companies."
        placeholder={`${getPrompts(industry).bio}`}
        value={bio}
        name='bio'
        characterLimit={400}
        changeHandler={changeHandler}
      />
    )
}

export default PersonalBio