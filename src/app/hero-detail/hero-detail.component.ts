import { Component, Input, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{

  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private locotion: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.locotion.back();
  }
}


// Зберігає ActivatedRouteінформацію про маршрут до цього екземпляра HeroDetailComponent. 
// Цей компонент цікавить параметри маршруту, отримані з URL-адреси. 
// Параметр "id" - це idгерой, який буде показано.

// Отримує HeroServiceдані про героя з віддаленого сервера, і цей компонент використовує їх, щоб отримати відображення героя.

// locationсервіс Angular для взаємодії з браузером. Ця служба дозволяє повернутися до попереднього перегляду.

// route.snapshot - статичне зображення інформації про маршрут невдовзі після створення компонента.
// paramMapс - ловник значень параметрів маршруту, отриманих із URL-адреси. Ключ "id"повертає idгероя для отримання.
// Параметри маршруту завжди є рядками. Функція JavaScript Numberперетворює рядок на число, яким і idповинен бути герой.
