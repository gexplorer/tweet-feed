export class SimpleTweet {
    public id: number;
    public username: string;
    public avatar: string;
    public name: string;
    public date: Date;
    public text: string;
    public photo: string;

    constructor(id: number, username: string, avatar: string, name: string, date: Date, text: string, photo: string) {
        this.id = id;
        this.username = username;
        this.avatar = avatar;
        this.name = name;
        this.date = date;
        this.text = text;
        this.photo = photo;
    }
}