export const getSkillsNotAchieved = (user, skillsRequired) => {
  const skillsNotAchieved = user.skills ? [] : skillsRequired.map(x => x.id);
  skillsRequired
    .map(x => x.id)
    .forEach(x => {
      if (user.skills && !user.skills.includes(x)) skillsNotAchieved.push(x);
    });

  return skillsNotAchieved;
};
