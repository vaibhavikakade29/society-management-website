import { Component } from '@angular/core';
import { AiAssistantService } from 'src/app/core/services/ai-assistant.service';

interface ChatMessage {

  sender: 'user' | 'bot';

  text: string;

  time: Date;

}

@Component({

  selector: 'app-ai-assistant',

  templateUrl: './ai-assistant.component.html',

  styleUrls: ['./ai-assistant.component.css']

})

export class AiAssistantComponent {

  userMessage = '';

  isTyping = false;

  isOpen = false;

  messages: ChatMessage[] = [

    {

      sender: 'bot',

      text:
        '👋 Hello! I am Vighnahar AI Assistant. Ask me anything about our society, registration, maintenance, complaints, notices, visitors or rules.',

      time: new Date()

    }

  ];

  constructor(

    private aiService: AiAssistantService

  ) { }

  /*=========================================================
      SEND MESSAGE
  =========================================================*/

  sendMessage(): void {

    if (!this.userMessage.trim()) {

      return;

    }

    const question = this.userMessage;

    this.messages.push({

      sender: 'user',

      text: question,

      time: new Date()

    });

    this.userMessage = '';

    this.isTyping = true;

    setTimeout(() => {

      const answer = this.aiService.getAnswer(question);

      this.messages.push({

        sender: 'bot',

        text: answer,

        time: new Date()

      });

      this.isTyping = false;

      this.scrollToBottom();

    }, 800);

  }

  /*=========================================================
      ENTER KEY
  =========================================================*/

  onEnter(event: KeyboardEvent): void {

    if (event.key === 'Enter') {

      event.preventDefault();

      this.sendMessage();

    }

  }

  /*=========================================================
      AUTO SCROLL
  =========================================================*/

  scrollToBottom(): void {

    setTimeout(() => {

      const chat = document.getElementById('chatBody');

      if (chat) {

        chat.scrollTop = chat.scrollHeight;

      }

    });

  }

}