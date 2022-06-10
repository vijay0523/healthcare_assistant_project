import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointment_table = [
    {name: "Vijay", time: "3252352", date: "10/06/2022", status: "Pending"},
  ];

  constructor() { }

  ngOnInit(): void {
    let data = localStorage.getItem('appointment');
    data = JSON.parse(data as string);
    console.log(data);
    if(data != null){
      this.appointment_table = data as unknown as [];
    }
  }

}
