import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

}

// Сервис предоставляет свой кеш messagesи два метода:
// - Один к add() сообщению в кеш.
// - Еще clear() в кеш.