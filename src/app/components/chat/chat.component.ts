// chat.component.ts
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {faqs} from '../../data/faq'

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,AfterViewChecked {
  ngOnInit(): void {
    this.showInitialQuestions();
  }
  initialQuestions = [
    { text: 'Understanding Dementia'},
    { text: 'Symptoms and Diagnosis'},
    { text: 'Treatment and Management'},
    { text: 'Prevention and Risk Factors'},
    { text: 'Living with Dementia'}
  ];



  userMessage: any = '';
  chatHistory: Array<{ text: string, type: string }> = [];
  isOpen: boolean = false;
  category: any = '';
  answer: string = "";
  question: string = " ";

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  relatedQuestions = this.findRelatedQuestion(this.category);

  @ViewChild('chatHistory') private chatHistoryContainer!: ElementRef;

 findAnswer(question: string): any {
        const qna = faqs.find(qna => qna.question === question);
        return qna ? qna : " ";
}

findRelatedQuestion(category:string){
  return faqs.filter(faq => faq.category == category)
}

handleSelection(question: string) {
  this.chatHistory.push({ text: question, type: 'user' });
  if(question=="You want to know more"){
    this.showInitialQuestions();
    return;
  }
  if(question=="You are satisfied with the information"){
    this.chatHistory.push({text:"Thank you! have a great day!",type:'bot'});
    return;
  }

  const selectedCategory = this.initialQuestions.find(q => q.text === question);
  const selectedQuestion = this.initialQuestions.find(q => q.text === question);

  if (selectedCategory) {
    this.category = selectedCategory.text;
    this.chatHistory.push({text: this.answer,type: 'bot'});
    const relatedFAQs = this.findRelatedQuestion(this.category);
    console.log("related:"+relatedFAQs);
    relatedFAQs.forEach( faq => {
      this.chatHistory.push({ text: faq.question, type: 'option' });
    });
  }else if(!selectedQuestion)
  {
    this.chatHistory.push({ text:this.findAnswer(question).answer,type:'bot'});
    this.chatHistory.push({text:"You want to know more",type:'option'});
    this.chatHistory.push({text:"You are satisfied with the information",type:'option'});
  }
   else {
    this.chatHistory.push({ text: 'Sorry, I don\'t have an answer for that.', type: 'bot' });
  }
}

sendMessage() {
  if (this.userMessage.trim()) {
    this.chatHistory.push({ text: this.userMessage, type: 'user' });
    const answer = this.findAnswer(this.userMessage).answer;
    if (answer) {
      this.chatHistory.push({ text: answer, type: 'bot' });
    } else {
      this.showInitialQuestions();
    }
    this.userMessage = '';
  }
}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  showInitialQuestions() {
    this.initialQuestions.forEach( faq => {
      this.chatHistory.push({ text: faq.text, type: 'option' });
    });
  }

  private scrollToBottom() {
    if (this.chatHistoryContainer) {
      try {
        const element = this.chatHistoryContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      } catch (err) {
        console.error('Could not scroll to bottom:', err);
      }
    }
  }
}
