import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { FightComponent } from './fight/fight.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'fight/:leftCharacterHealth/:rightCharacterHealth',
    component: FightComponent,
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
]
