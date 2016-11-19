export class Post {
    _id: string;
    title: string;
    subtitle: string;
    text: string;
    published: boolean = false;
    storyID: string;
    comments: any[];
    likes: string[];
}
