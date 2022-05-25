import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  chat_form_field: FormControl = new FormControl('');
  appointment_form_field: FormControl = new FormControl('');
  chat_messages: {message: string, intent?: string, type: string}[] = [
    {
      message: "Hi there! What can i do for you today?",
      intent: "greeting",
      type: "bot"
    },
    // {
    //   message: "Hi",
    //   type: "user"
    // },
    // {
    //   message: "Hello!",
    //   type: "bot"
    // },
    // {
    //   message: "Im feeling sick today",
    //   type: "user"
    // },
    // {
    //   message: "Oh! No worries. I'm Glad to help you out! Can i know which symptoms you are feeling?",
    //   type: "bot"
    // },
  ];

  schedule_appointment_input_bool = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.appointment_form_field.valueChanges.subscribe(
      (data: any) => {
        console.log(data);
        this.chat_messages.push({message: "Set an appointment with the doctor at "+data, type: 'user'});
        this.chat_messages.push({message: "Appointment set at time "+data, type: 'bot'});
        this.chat_messages.push({message: "Is there anything else that i can do for you? ", intent: 'greeting', type: 'bot'});
        // this.sendChat();
      }
    );
  }

  appendChat() {
    console.log(this.chat_form_field.value);
    this.chat_messages.push({
      message: this.chat_form_field.value,
      type: "user"
    });
    this.sendChat();
    let out: any = document.getElementById("out");
    // allow 1px inaccuracy by adding 1
    var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
  }

  sendMsg(type: number) {
    if(type == 0){
      let message = "Schedule an Appointment with a doctor";
      this.chat_messages.push({
        message: message,
        type: "user"
      });
    }
    this.sendChat();
  }

  sendChat() {
    this.http.post('http://localhost:5000/chat', {msg: this.chat_messages[this.chat_messages.length-1].message}).subscribe(
      (data: any) => {
        console.log(data);
        this.chat_messages.push({message: data[1], intent: data[0], type: 'bot'});
        console.log(this.chat_messages);
        if(data[0] == 'schedule_appointment'){
          this.schedule_appointment_input_bool = true;
        }
      }
    );
  }

}
