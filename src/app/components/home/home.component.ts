import { Component, OnInit } from '@angular/core';

// Angular component host element width and height are 0: https://stackoverflow.com/a/48940306/2195426
// Dynamically updating css in Angular: https://stackoverflow.com/a/35886534/2195426
@Component({
  selector: 'app-home',
  host:{
    "[style.display]": "'inline-block'",
    "[style.width.%]": "100",
    "[style.height.%]": "100",
  },
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
