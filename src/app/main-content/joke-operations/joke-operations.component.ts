import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JokesService } from 'src/services/jokes.service';

@Component({
  selector: 'app-joke-operations',
  templateUrl: './joke-operations.component.html',
  styleUrls: ['./joke-operations.component.css']
})
export class JokeOperationsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private jokeService: JokesService) { }
  private playJokeSubscription: Subscription; 
  private countJokeSubscription: Subscription; 

  private prevRandom: number;
  public totalJokes;
  ngOnInit(): void {
    this.prevRandom = 0
    this.countJokeSubscription = this.jokeService.totalJoke.subscribe(count => {
      console.log(count);
      
      this.totalJokes = count;
    });
    console.log("ng on init")
    this.playJokeSubscription = this.jokeService.playJoke
      .subscribe(value => {
        this.playJokes(); 
      })
  }

  addNewJoke() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
  playJokes() {
    this.jokeService.playSingle = false;
    let jokes = this.jokeService.getJokes();
    let random;
    if (jokes.length >1) {
      random = this.generateRandomNumber(this.prevRandom);
    } else {
      random = 0;
    }
    
    this.prevRandom = random

    this.router.navigate(['/jokes/', jokes[random].id, 'play'], { relativeTo: this.route });
  }

  generateRandomNumber = (previous: number) => {
    let min = 0;
    var max = this.jokeService.getJokes().length;
    var next;
  
    next = Math.floor(Math.random() * (max - min)) + min;
    if (next===previous) {
      next = this.generateRandomNumber(previous); 
    }
    
    return next;
  }
  ngOnDestroy() {
    this.playJokeSubscription.unsubscribe();
    this.countJokeSubscription.unsubscribe();
  }

}
