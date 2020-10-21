import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Joke } from 'src/models/joke.model';
import { JokesService } from 'src/services/jokes.service';

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.css']
})
export class JokeListComponent implements OnInit {

  constructor(public jokeService:JokesService, private route: ActivatedRoute, private router: Router) { }
  public jokes: Array<Joke> 
  ngOnInit(): void {
    this.jokes = this.jokeService.getJokes();
    this.jokes.map((joke:Joke) =>{
      let item = this.jokeService.jokeCategory.find(o => o.id === joke.jokeCategory)
      joke.jokeCategory = item.name
    })
  }

  palySingleJoke(id) {
    this.jokeService.playSingle = true;
    this.router.navigate(['/jokes/', id, 'play'], { relativeTo: this.route });
  }

}
