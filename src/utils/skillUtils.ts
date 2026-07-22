export function countSkillsRecursively (skills: any [], index: number = 0) : number {
  if(index >= skills.length) return 0;
  return 1 + countSkillsRecursively (skills, index + 1)
}