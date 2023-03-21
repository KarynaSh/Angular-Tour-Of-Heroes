import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs'

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes'); //отправить сообщение, когда герои будут получены.
    return heroes;
  } 

}

//getHeroes - метод для возврата фиктивных героев 

// HeroService.getHeroes() возвращает Observable чтобы он мог использовать HttpClient.get метод Angular 
// для получения героев и HttpClient.get() возвращал Observable.

//of(HEROES) возвращает объект Observable<Hero[]>, который выдает единственное значение — массив фиктивных героев.


