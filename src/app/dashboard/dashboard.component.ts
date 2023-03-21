import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroServise: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroServise.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice (1, 5));
  }

}


// getHeroes() - повертає розрізаний список героїв на позиціях 1 і 5, повертаючи лише Героїв два, три, чотири та п’ять.