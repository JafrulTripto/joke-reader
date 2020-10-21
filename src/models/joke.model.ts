export class Joke {
    public id:string
    public jokeCategory:string;
    public jokeType: string;
    public jokeFlags: Array<any>;
    public jokeContent: string;
    public jokeDelivery?:string;

    constructor(jokeCategory:string, jokeType:string, jokeFlags:Array<any>, jokeContent:string, jokeDelivery?:string){
        this.jokeCategory = jokeCategory;
        this.jokeContent = jokeContent;
        this.jokeType = jokeType;
        this.jokeFlags = jokeFlags;
        this.jokeDelivery = jokeDelivery
    }
}