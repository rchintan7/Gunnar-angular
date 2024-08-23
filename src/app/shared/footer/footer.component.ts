import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  dayNumber = new Date().getDay() % 12;
  todaysHeaderCss = this.getCss('Header', this.dayNumber);

  getCss(spriteType: string, dayNumber: number): string {
    return `transparent url('/assets/images/Bootstrap${spriteType}Composed.jpg') 0 ${
      -81 * dayNumber
    }px`;
  }
}
