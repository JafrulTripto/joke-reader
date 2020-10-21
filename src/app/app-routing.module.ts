import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditJokeComponent } from './main-content/edit-joke/edit-joke.component';
import { JokeListComponent } from './main-content/joke-list/joke-list.component';
import { PlayJokeComponent } from './main-content/joke-operations/play-joke/play-joke.component';
import { MainContentComponent } from './main-content/main-content.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/jokes', pathMatch: 'full' },
    {
        path: 'jokes', component: MainContentComponent, children: [
            { path: '', component: JokeListComponent },
            { path: 'add', component: EditJokeComponent },
            { path: ':id/edit', component: EditJokeComponent },
            { path: ':id/play', component: PlayJokeComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}