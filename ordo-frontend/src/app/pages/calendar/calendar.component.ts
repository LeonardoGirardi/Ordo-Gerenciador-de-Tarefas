import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [
    DatePipe
  ],
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  today: Date = new Date();

  constructor() { }

  ngOnInit(): void { }

}

