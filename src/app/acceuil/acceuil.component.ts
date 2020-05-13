import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  generate =false;
  showCle = false;
  durationInSeconds = 5;
  panelOpenState = false;
  parametre =  {
    algorithme:"",
    provider:"",
    taille:""
  }
  // selected = 'option2';
  foods: Food[] = [
    {value: 'RSA', viewValue: 'RSA'},
    {value: 'DSA', viewValue: 'DSA'},
    {value: 'ECDSA', viewValue: 'ECDSA'}
  ];
  provider: Food[] = [
    {value: 'SUN', viewValue: 'SUN'},
    {value: 'SunRsaSign', viewValue: 'SunRsaSign'},
    {value: 'BC', viewValue: 'BC'}
  ];
  taille: Food[] = [
    {value: '1024', viewValue: '1024'},
    {value: '256', viewValue: '128'},
    {value: '128', viewValue: '256'}
  ];
  

  constructor(private api:CryptoService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.parametre = {
      algorithme:"",
      provider:"",
      taille:""
    }
  }

  openSnackBar() {
    this._snackBar.open("Une paire de cle publique et privé a été généré avec succés!!vous pouvez desormais passsez au chiffrement", "", {
      duration: this.durationInSeconds * 1000,
    });
  }


  generateKey(){
    this.generate =true
    console.log( "click",this.parametre);

    this.api.generateKey(this.parametre).subscribe(response => {
    
      console.log(response)
     
     

    },
    error => {
      console.log('error', error);
      if(error.status==200){
        this.generate =false
        this.openSnackBar()
        this.showCle =true

      }
    })

  }


  }


