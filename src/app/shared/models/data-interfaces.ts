export interface BasicInfo {
    name: string,
    headline: string,
    summary: string
}

export interface Education {
    institution: string,
    program: string,
    grade: string,
    from: string,
    to: string,
    location: string,
    url: string
}

export interface Experience {
    organization: string,
    designation: string,
    jobType: string,
    from: Date,
    to: Date,
    location: string,
    url: string
}

export interface Skill {
    name: string,
    faIcon: string,
    iconType: string
}

export interface SocialLink {
    url: string,
    faIcon: string,
    color: string
}
