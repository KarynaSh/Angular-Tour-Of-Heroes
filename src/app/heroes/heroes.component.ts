import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;

  heroes: Hero[] = [];    //привязка массива HEROES

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  
}

// @Component - это функция-декоратор, которая указывает метаданные Angular для компонента.
// onSelect() - назначает selectedHero компоненту выделенного кликом мышки героя из шаблона.
// getHeroes() - метод для извлечения героев из сервиса

// Observable.subscribe() является критической разницей.
// subscribe() передает испускаемый массив обратному вызову, который устанавливает heroesсвойство компонента.
// Этот асинхронный подход работает, когда HeroService запрашивает героев с сервера.
