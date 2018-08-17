export class SimpleTweet {
    // tslint:disable-next-line:variable-name
    public _id: number;
    public username: string;
    public avatar: string;
    public name: string;
    public date: Date;
    public text: string;
    public photo: string;
    public blocked: boolean = false;
    public selected: boolean = false;
    public starred: boolean = false;

    constructor(id: number,
                username: string,
                avatar: string,
                name: string,
                date: Date,
                text: string,
                photo: string,
                starred: boolean) {
        this._id = id;
        this.username = username;
        this.avatar = avatar;
        this.name = name;
        this.date = date;
        this.text = text;
        this.photo = photo;
        this.starred = starred;
    }
}
