import { Component } from '@angular/core';

@Component({
  selector: 'cgsh-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear:string = "2018";
  version:string = "1.0.2";
  userName:string = "CGSH\\taung"
}