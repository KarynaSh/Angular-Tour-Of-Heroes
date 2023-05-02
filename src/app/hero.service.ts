import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })

export class HeroService {

  private heroesUrl = 'api/heroes'; // URL-адреса веб-інтерфейсу API

  //Зареєстровано повідомлення HeroService за допомогою MessageService
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  ////Обробка помилок
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) {}

  // Отримайте героїв із сервера
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', [])) //Обробка помилок
      );
    }

  // Отримайте героя за id. Буде 404, якщо id не знайдено
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  } 
  
  // PUT: оновити героя на сервері
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

}

// getHeroes(), getHero() - має асинхронний підпис. Він повертає макет героя як Observable, використовуючи функцію RxJS of(). 

// HttpClient.get() - повертає Observable<Hero[]>, який є спостережуваним масивом героїв .

// HttpClient.get() за замовчуванням повертає тіло відповіді як нетиповий об’єкт JSON. 
// Застосування додаткового специфікатора типу <Hero[]> додає можливості TypeScript, які зменшують помилки під час компіляції.
// API даних сервера визначає форму даних JSON. API даних Tour of Heroes повертає дані героя у вигляді масиву.

// HeroServic підключаються до потоку спостережуваних значень і надсилають повідомлення за допомогою методу log() в область повідомлень внизу сторінки.
// Оператор RxJS tap() надає цю можливість, переглядаючи спостережувані значення, роблячи щось із цими значеннями та передаючи їх. 
// Зворотний виклик tap() не отримує доступу до самих значень.

// getHero() має три істотні відмінності від getHeroes():
// getHero() створює URL-адресу запиту з ідентифікатором потрібного героя
// Сервер має відповідати одним героєм, а не набором героїв
// getHero() повертає Observable<Hero>, який є спостережуваним Hero об’єктів , а не спостережуваним Hero масивів 

// catchError() перехоплює Observableневдалий . Потім оператор передає помилку функції обробки помилок.
// handleError() метод повідомляє про помилку, а потім повертає нешкідливий результат, щоб програма продовжувала працювати.
// handleError()може бути спільно використано багатьма HeroServiceметодами, тому воно узагальнене для задоволення їхніх різних потреб.
// Замість того, щоб безпосередньо обробляти помилку, він повертає функцію обробки помилок до catchError. Ця функція налаштована як з назвою операції, яка не вдалася, так і з безпечним значенням, що повертається.

// Метод HttpClient.put()приймає три параметри:
// URL
// Дані для оновлення, які в даному випадку є модифікованим героєм
// Опції
