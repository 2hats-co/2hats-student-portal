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
      case ALL_STEPS.careerInterests:return !careerInterests || careerInterests.value.length === 0;
      case ALL_STEPS.bio:return !bio|| bio.length === 0;
      case ALL_STEPS.skills:return !skills|| skills.length === 0;
      case ALL_STEPS.uploadResume:return !resumeFile || resumeFile.downloadURL.length === 0;
      case ALL_STEPS.education:return !education || education.length === 0 ;
      case ALL_STEPS.experience:return !experience || experience.length === 0 ;
      case ALL_STEPS.currentUniversity:return !currentUniversity || currentUniversity.length === 0;
      case ALL_STEPS.other:return !workingRights|| workingRights.length === 0 // || phoneNumber.length !== 10;
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
export function firstUnfinishedStep(profile){
  if(profile){
    let lastStep = 0
      STEP_LABELS[profile.process].forEach((step,key) => {
        if(checkComplition(step,profile)&& lastStep===0){
          lastStep = key
        }
      })
  return lastStep
  }
}
  
export const ALL_STEPS = {
    careerInterests: "Career Interests",
    skills:"Relevant Skills",
    bio:"Personal Bio",
    education:"Tertiary Education",
    experience:"Practical Experience",
    other: "Work Availability",
    uploadResume:"Upload Resume",
    currentUniversity: "Current University",
}
export const STEP_LABELS ={
    upload:[
        ALL_STEPS.careerInterests,
        ALL_STEPS.skills,
        ALL_STEPS.currentUniversity,
        ALL_STEPS.uploadResume,
        ALL_STEPS.other
      ],
      build:[
        ALL_STEPS.careerInterests,
        ALL_STEPS.skills,
        ALL_STEPS.bio,
        ALL_STEPS.education,
        ALL_STEPS.experience,
        ALL_STEPS.other
      ]
}
