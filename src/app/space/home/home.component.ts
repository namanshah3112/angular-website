import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url1="assets/apple1.jpg"
  url2="assets/samsung.jpeg"
  url3="assets/oneplus.png"
  constructor() { }

  ngOnInit(): void {
  }
  empty(){
    window.localStorage.clear();
  }
  slides = [
    {'image': "assets/apple1.jpg"}, 
    {'image':"assets/samsung.jpeg"},
    {'image': "assets/oneplus.png"}, 
    {'image': "assets/GooglePixel.jpeg"}, 
    {'image':"assets/vivo.jpeg"},
    {'image':"assets/xiaomi.jpeg"},
  ];
}
