export const PROCESS_TYPES ={
    build: 'build',
    upload:'upload'
}

export function checkComplition(currentStep,profile){
    const{careerInterests,
      skills,
      bio,
      workingRights,currentUniversity,resumeFile,
      education,experience} = profile
    switch (currentStep) {
      case ALL_STEPS.careerInterests:return !careerInterests || careerInterests.length === 0;
      case ALL_STEPS.bio:return !bio|| !skills ||(skills.length === 0 || bio.length === 0);
      case ALL_STEPS.uploadResume:return !resumeFile || resumeFile.downloadURL.length === 0;
      case ALL_STEPS.education:return !education || education.length === 0 ;
      case ALL_STEPS.experience:return !experience || experience.length === 0 ;
      case ALL_STEPS.profileDetails:return !currentUniversity || !skills|| (currentUniversity.length === 0 ||skills.length === 0);
      case ALL_STEPS.other:return  !workingRights|| workingRights.length === 0 // || phoneNumber.length !== 10;
      default:return false;
    }
  }
export function isComplete(profile){
  if(profile){
      return STEP_LABELS[profile.process].map(step => {
        return !checkComplition(step,profile)
      }).reduce((r,x)=>{
       return r*x
      })
    
  }else{return false}
}
  
export const ALL_STEPS = {
    careerInterests: "Career Interests",
    bio:"Bio & Relevant Skills",
    education:"Tertiary Education",
    experience:"Practical Experience",
    other: "Work Availability",
    uploadResume:"Upload Resume",
    profileDetails: "Profile Details",
}
export const STEP_LABELS ={
    upload:[
        ALL_STEPS.careerInterests,
        ALL_STEPS.profileDetails,
        ALL_STEPS.uploadResume,
        ALL_STEPS.other
      ],
      build:[
        ALL_STEPS.careerInterests,
        ALL_STEPS.bio,
        ALL_STEPS.education,
        ALL_STEPS.experience,
        ALL_STEPS.other
      ]
}
