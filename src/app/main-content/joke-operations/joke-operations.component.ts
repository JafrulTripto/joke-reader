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
  private subscription: Subscription;
  private prevRandom: number;
  ngOnInit(): void {
    this.prevRandom = 0
    console.log("ng on init")
    this.subscription = this.jokeService.playJoke
      .subscribe(value => {
        if (!value) {
          
        this.playJokes();
        } else {
          console.log(value)
        }
      })
  }

  addNewJoke() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }
  playJokes() {
    this.jokeService.playSingle = false;
    let jokes = this.jokeService.getJokes();
    let random = this.generateRandomNumber(this.prevRandom);
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
    this.subscription.unsubscribe();
  }

}
