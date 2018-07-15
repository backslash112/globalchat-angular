import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-message',
  host:{
    "[style.display]": "'inline-block'",
    "[style.width.%]": "100",
    "[style.height.%]": "100",
  },
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
