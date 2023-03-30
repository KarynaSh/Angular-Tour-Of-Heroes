import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs'

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })

export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // Наразі припустимо, що герой із вказаним `id` існує завжди.
    // Обробку помилок буде додано потім.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  } 

}

// getHeroes(), getHero()має асинхронний підпис. Він повертає макет героя як Observable, використовуючи функцію RxJS of(). 

// HeroService.getHeroes() возвращает Observable чтобы он мог использовать HttpClient.get метод Angular 
// для получения героев и HttpClient.get() возвращал Observable.

// of(HEROES) возвращает объект Observable<Hero[]>, который выдает единственное значение — массив фиктивных героев.


