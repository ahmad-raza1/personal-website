import { BasicInfo, Education, Experience, Skill, SocialLink } from "./data-interfaces";

export class Data {
    basicInfo: BasicInfo;
    education: Education | Array<Education>;
    experience: Experience | Array<Experience>;
    skills: Array<Skill>;
    socialLinks: Array<SocialLink>;

    constructor(
        basicInfo: BasicInfo,
        education: Education | Array<Education>,
        experience: Experience | Array<Experience>,
        skills: Array<Skill>,
        socialLinks: Array<SocialLink>
    ) {
        this.basicInfo = basicInfo;
        this.education = education;
        this.experience = experience;
        this.skills = skills;
        this.socialLinks = socialLinks;
    }
}
