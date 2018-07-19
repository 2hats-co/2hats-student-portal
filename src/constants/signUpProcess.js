export const PROCESS_TYPES ={
    build: 'build',
    upload:'upload'
}

export const ALL_STEPS = {
    interests: "Career Interests",
    bio:"Bio & Relevant Skills",
    education:"Tertiary Education",
    experience:"Practical Experience",
    other: "Work Availablity",
    uploadResume:"Upload Resume",
    profileDetails: "Profile Details",
}
export const STEP_LABELS ={
    upload:[
        ALL_STEPS.interests,
        ALL_STEPS.profileDetails,
        ALL_STEPS.uploadResume,
        ALL_STEPS.other
      ],
      build:[
        ALL_STEPS.interests,
        ALL_STEPS.bio,
        ALL_STEPS.education,
        ALL_STEPS.experience,
        ALL_STEPS.other
      ]
}
