export interface PostType {
    _id: string;
    userId: UserType;
    public: boolean;
    content: string;
    media: MediaType[];
    likes: string;
    block: boolean;
    timestamp: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    deleted: boolean;
    reports?: ReportedType[]
    reported_count?: number
}

export interface ForumType {
    _id: string;
    userId: UserType;
    public: boolean;
    name: string;
    category: string;
    description: string;
    timestamp: number;
    image: string;
    joined: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    deleted: boolean;
    disabled: boolean;
}

export interface StoryType {
    _id: string;
    userId: UserType;
    content: string;
    media: MediaType;
    timestamp: number;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface MediaType {
    url: string;
    type: 'image' | 'video';
}

export interface ResourceType {
    _id: string;
    userId: UserType;
    content: string;
    media: MediaType;
    likes: string[];
    timestamp: number;
    category: CategoryType;
    approved: boolean;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    block: boolean;
    deleted: boolean;
}

export interface UserType {
    _id: string;
    firebaseAuthId: string;
    isProfileCompleted: boolean;
    provider: string;
    login: boolean;
    email: string;
    interest: any[];
    rewardPoints: number;
    block: boolean;
    __v: number;
    name: string;
    username: string;
    imageUrl: string;
    bio: string;
}
export interface CategoryType {
    _id: string;
    title: string;
    createdAt: number;
    enabled: boolean;
}

export interface ReportedType {
    _id: string;
    title: string;
    user: UserType;
    post: string;
    closed: boolean;
    description: string;
    type: string;
    __v: number;
}

export interface DashboardType {
    user: DataAnalysType;
    post: DataAnalysType;
    forum: DataAnalysType;
    forumpost: DataAnalysType;
    resource: DataAnalysType;
    reports: ReportsType
    graph:any
}

export interface DataAnalysType {
    total: number;
    active: number;
    disabled: number;
}

export interface ReportsType {
    post: number;
    resource: number;
    forum: number;
}

//Declare Module
