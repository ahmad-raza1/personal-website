import { BasicInfo, Education, Experience } from "./data-interfaces";

export class Data {
    basicInfo: BasicInfo;
    education: Education | Array<Education>;
    experience: Experience | Array<Experience>;
    skills: Array<string>;

    constructor(
        basicInfo: BasicInfo,
        education: Education | Array<Education>,
        experience: Experience | Array<Experience>,
        skills: Array<string>
    ) {
        this.basicInfo = basicInfo;
        this.education = education;
        this.experience = experience;
        this.skills = skills;
    }
}
