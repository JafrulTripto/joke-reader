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
  public startIndex = 0;
  public endIndex = 5;
  public currentIndex = 0;
  public pageLength = 0
  ngOnInit(): void {
    this.jokes = this.jokeService.getJokes();
    this.jokes.map((joke:Joke) =>{
      let item = this.jokeService.jokeCategory.find(o => o.id === joke.jokeCategory)
      joke.jokeCategory = item.name
    })
  }

  updateIndex(pageIndex){
    this.currentIndex = pageIndex
    if (this.currentIndex > (this.pageLength-1) || this.currentIndex<0 ) {
      return
    } else {
      this.startIndex = pageIndex * 5;
      this.endIndex = this.startIndex + 5;
    }
    
  }
  // nextIndex(index){
  //   this.currentIndex = index
  //   this.startIndex = index * 5;
  //   this.endIndex = this.startIndex + 5;
  // }

  palySingleJoke(id) {
    this.jokeService.playSingle = true;
    this.router.navigate(['/jokes/', id, 'play'], { relativeTo: this.route });
  }

  getArrayFromNumber(length){
    this.pageLength = Math.ceil(length/5);
    return new Array(this.pageLength);
  }

}
