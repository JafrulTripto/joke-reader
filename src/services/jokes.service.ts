import { Injectable } from '@angular/core';
import { Joke } from 'src/models/joke.model';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class JokesService {
  public jokeFlags: Array<{id:string, name:string}> = [
    { name: "NSFW", id: "1" },
    { name: "Religious", id: "2" },
    { name: "Political", id: "3" },
    { name: "Racist", id: "4" },
  ]

  public jokeCategory:Array<{id:string, name:string}> = [
    {id:"1", name:'Miscellaneous'},
    {id:"2", name:'Pun'},
    {id:"3", name:'Programming'},
    {id:"4", name:'Dark'},
  ]
  public nextJoke = new Subject<any>();
  constructor() { }

  callMethodOfSecondComponent() { 
    this.nextJoke.next(null)      
  }
  getJokes() {
    return JSON.parse(localStorage.getItem("jokes") || "[]");
  }

  getJoke(id: string) {
    let jokes = this.getJokes();

   
    //let index = jokes.indexOf(obj);
    
    let joke = jokes.find(x => x.id === id);
    return joke;
  }

  addJoke(joke:Joke) {
    let items = this.getJokes();
    items.push(joke);
    localStorage.setItem("jokes", JSON.stringify(items));
  }

  editJoke(joke:Joke, id: string) {
    let jokes = [...this.getJokes()];
    let existingJoke = jokes.find(x => x.id === id);
    let index = jokes.indexOf(existingJoke);

    if (~index) {
      jokes[index] = joke;
    }
    localStorage.setItem("jokes", JSON.stringify(jokes));
  }

}
