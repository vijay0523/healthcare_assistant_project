import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  toggle_chat = false;
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
  symptom_check_bool = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.appointment_form_field.valueChanges.subscribe(
      (data: any) => {
        console.log(data);
        this.chat_messages.push({message: "Set an appointment with the doctor at "+data, type: 'user'});
        this.chat_messages.push({message: "Appointment set at time "+data, type: 'bot'});
        this.chat_messages.push({message: "Is there anything else that i can do for you? ", intent: 'greeting', type: 'bot'});
        // this.sendChat();
        let appointment_data = []
        appointment_data.push({name: 'Patient', time: data, date: '10/06/2022', status: 'Pending'});
        localStorage.setItem('appointment', JSON.stringify(appointment_data));
      }
    );
    let element = document.getElementById('chat_box') as HTMLElement;
    element.style.height = '50px';
  }

  appendChat() {
    console.log(this.chat_form_field.value);
    this.chat_messages.push({
      message: this.chat_form_field.value,
      type: "user"
    });
    this.sendChat("normal");
    let out: any = document.getElementById("out");
    // allow 1px inaccuracy by adding 1
    var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
  }

  sendMsg(type: number) {
    let intent = ""
    if(type == 0){
      let message = "Schedule an Appointment with a doctor";
      this.chat_messages.push({
        message: message,
        type: "user"
      });
      intent = "normal"
    } else if (type == 1){
      let message = "I want to check my symptoms";
      this.chat_messages.push({
        message: message,
        type: "user"
      });
      intent = "symptom"
    } else if (type == 2){
      let message = "I want to check Heart Related Diseases";
      this.chat_messages.push({
        message: message,
        type: "user"
      });
      this.chat_messages.push({
        message: "Sure! Let me fetch your details from Medical Record",
        type: "bot"
      });
      // this.chat_messages.push({
      //   message: "Our classifier suggests that you are suffering from Heart Disease",
      //   type: "bot"
      // });
      this.chat_messages.push({
        message: "Please check out the results in explainer dashboard for more details",
        type: "bot"
      });
      return;
    } else if (type == 3){
      let message = "I want to check Diabetes Related Diseases";
      this.chat_messages.push({
        message: message,
        type: "user"
      });
      this.chat_messages.push({
        message: "Sure! Let me fetch your details from Medical Record",
        type: "bot"
      });
      // this.chat_messages.push({
      //   message: "Our classifier suggests that you are suffering from Diabetes Disease",
      //   type: "bot"
      // });
      this.chat_messages.push({
        message: "Please check out the results in explainer dashboard for more details",
        type: "bot"
      });
      return;
    }
    this.sendChat(intent);
  }

  sendChat(type: string) {
    this.http.post('http://localhost:5000/chat', {msg: this.chat_messages[this.chat_messages.length-1].message, intent: type}).subscribe(
      (data: any) => {
        console.log(data);
        this.chat_messages.push({message: data.reply, intent: data.intent, type: 'bot'});
        console.log(this.chat_messages);
        if(data[0] == 'schedule_appointment'){
          this.schedule_appointment_input_bool = true;
        }
      }
    );
  }

  toggleChat() {
    this.toggle_chat = !this.toggle_chat;
    let element = document.getElementById('chat_box') as HTMLElement;
    if(this.toggle_chat == false){
      element.style.height = '50px';
    }
    else{
      element.style.height = '500px';
    }
  }

  redirect(loc: string) {
    if(loc == "access-control")
      this.router.navigate(['patient/access-control']);
    else if(loc == "medical-record")
      this.router.navigate(['patient/medical-record']);
    else if(loc == "explainer-dashboard")
    this.router.navigate(['patient/explainer-dashboard']);
  }

}
