import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Joke } from 'src/models/joke.model';
import { JokesService } from 'src/services/jokes.service';

@Component({
  selector: 'app-edit-joke',
  templateUrl: './edit-joke.component.html',
  styleUrls: ['./edit-joke.component.css']
})
export class EditJokeComponent implements OnInit {
  public id: string;
  public editMode: boolean = false
  public isJokeDelivery: boolean = false;
  public categories: Array<{ id: string, name: string }>
  public flags: Array<any>;
  public jokeForm: FormGroup;
  public alert:boolean = false;
  public headerTitle:string;

  public selectedFlags: Array<number> = []
  constructor(private jokeService: JokesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categories = this.jokeService.jokeCategory;
    this.flags = this.jokeService.jokeFlags;
    this.route.params.subscribe(
      (params: Params) => {
        this.id = (+params['id']).toString();
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
    this.headerTitle = this.editMode ? "Edit Joke" : "Add New Joke"
  }

  private initForm() {
    let jokeCategory = '';
    let jokeType = '';
    let jokeFlags = this.selectedFlags;
    let jokeContent = '';
    let jokeDelivery = '';
    if (this.editMode) {
      const joke: Joke = this.jokeService.getJoke(this.id.toString());
      this.selectedFlags = [...joke.jokeFlags]
      if (joke.jokeType == "2") {
        this.isJokeDelivery = true;
      }
      jokeCategory = joke.jokeCategory;
      jokeType = joke.jokeType;
      jokeFlags = this.selectedFlags
      jokeContent = joke.jokeContent;
      jokeDelivery = joke.jokeDelivery;

    }
    this.jokeForm = new FormGroup({
      'id': new FormControl(new Date().getTime().toString()),
      'jokeCategory': new FormControl(jokeCategory, Validators.required),
      'jokeType': new FormControl(jokeType, Validators.required),
      'jokeFlags': new FormControl(this.selectedFlags),
      'jokeContent': new FormControl(jokeContent, Validators.required),
      'jokeDelivery': new FormControl(jokeDelivery, this.isJokeDelivery? Validators.required : null),
    })

  }

  getFlagId(event, id: number) {
    if (event.target.checked) {
      this.selectedFlags.push(id)
    } else {
      this.selectedFlags = this.selectedFlags.filter(item => item != id)
    }
    this.jokeForm.patchValue({
      'jokeFlags': this.selectedFlags
    });

  }

  isChecked(item) {
    if (this.editMode) {
      const joke: Joke = this.jokeService.getJoke(this.id);
      if (joke.jokeFlags.includes(item.id)) {
        return true;
      }
    }
    return false
  }
  onChangeType(event) {
    if (event.target.value == 2) {
      this.isJokeDelivery = true
    } else {
      this.isJokeDelivery = false;
    };

  }
  onSubmitJoke() {
    console.log(this.jokeForm)
    if (this.jokeForm.valid) {
      if (this.editMode) {
        this.jokeService.editJoke(this.jokeForm.value, this.id)
        // console.log(this.jokeForm.value)
      } else {
        this.jokeService.addJoke(this.jokeForm.value);
      }
      this.router.navigate([''])
      this.alert = false;
    } else {
      this.alert = true;
    }
  }

}
