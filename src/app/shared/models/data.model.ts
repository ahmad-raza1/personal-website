import { BasicInfo, Education, Experience, Skill } from "./data-interfaces";

export class Data {
    basicInfo: BasicInfo;
    education: Education | Array<Education>;
    experience: Experience | Array<Experience>;
    skills: Array<Skill>;

    constructor(
        basicInfo: BasicInfo,
        education: Education | Array<Education>,
        experience: Experience | Array<Experience>,
        skills: Array<Skill>
    ) {
        this.basicInfo = basicInfo;
        this.education = education;
        this.experience = experience;
        this.skills = skills;
    }
}
