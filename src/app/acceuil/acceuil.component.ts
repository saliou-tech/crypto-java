import { Component, OnInit } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  panelOpenState = false;
  // selected = 'option2';
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'RSA'},
    {value: 'pizza-1', viewValue: 'DSA'},
    {value: 'tacos-2', viewValue: 'ECDSA'}
  ];
  provider: Food[] = [
    {value: 'steak-0', viewValue: 'SUN'},
    {value: 'pizza-1', viewValue: 'SunRsaSign'},
    {value: 'tacos-2', viewValue: 'BC'}
  ];
  taille: Food[] = [
    {value: 'steak-0', viewValue: '1024'},
    {value: 'pizza-1', viewValue: '128'},
    {value: 'tacos-2', viewValue: '256'}
  ];
  

  constructor() { }

  ngOnInit(): void {
  }

}
