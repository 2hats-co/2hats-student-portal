import React from 'react';
import MultiLineTextField from './MultiLineTextField';
import { getPrompts } from '../../constants/resumeBuilderPrompts';
function PersonalBio(props) {
  const { changeHandler, industry, bio, hideTitle } = props;
  return (
    <MultiLineTextField
      hideTitle={hideTitle}
      title="personal bio"
      hint="Your bio should briefly mention what you study, your key achievements, skills, and your career aspirations."
      placeholder={`${getPrompts(industry).bio}`}
      value={bio}
      name="bio"
      characterLimit={400}
      changeHandler={changeHandler}
    />
  );
}

export default PersonalBio;
