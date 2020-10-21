import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Joke } from 'src/models/joke.model';
import { JokesService } from 'src/services/jokes.service';

@Component({
  selector: 'app-play-joke',
  templateUrl: './play-joke.component.html',
  styleUrls: ['./play-joke.component.css']
})
export class PlayJokeComponent implements OnInit {

  constructor(private jokeService: JokesService, private route: ActivatedRoute, private router: Router) { }

  private id: string;
  public joke: Joke;
  public delivery: boolean = false;
  public palySingle:boolean = false;
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = (+params['id']).toString();
        this.joke = this.jokeService.getJoke(this.id)
        this.palySingle = this.jokeService.playSingle;
        this.joke.jokeCategory = this.jokeService.jokeCategory.find(x => x.id === this.joke.jokeCategory).name
        this.jokeDelivery()
      }
    )
  }

  jokeDelivery() {
    this.delivery = false
    setTimeout(() => {               
      this.delivery = true
    }, 3000);
  }
  onClickNext() {
    this.jokeService.playJoke.next()
  }

}
