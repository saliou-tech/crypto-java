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
  erreur;
   message
  generate =false;
  showCle = false;
  showerror = false;
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
    {value: 'DH', viewValue: 'DH'}
  ];
  provider: Food[] = [
    {value: 'SUN', viewValue: 'SUN'},
    {value: 'SunRsaSign', viewValue: 'SunRsaSign'},
    {value: 'BC', viewValue: 'BC'},
    {value: 'SunJCE', viewValue: 'SunJCE'}
    
    
  ];
  taille: Food[] = [
    {value: '1024', viewValue: '1024'},
    {value: '512', viewValue: '512'},
    {value: '256', viewValue: '256'},
    {value: '128', viewValue: '128'}
    
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
    if(this.parametre.algorithme =="DH" && this.parametre.taille == "128"){
      this.message = " DH key size must be multiple of 64,"  + "and can only range from 512 to 8192 ";
      this.showerror = true;
      this.showCle =false;
      this.generate = false;

    }
    else if(this.parametre.algorithme =="DH" && (this.parametre.provider == "SUN" || this.parametre.provider =="SunRsaSign")){
      this.message = "pas un tel algorithme: DH pour le fournisseur SUN et SunRsaSign";
      this.showerror = true;
      this.showCle =false;
      this.generate = false;
    }
    else if(this.parametre.algorithme=="RSA" &&(this.parametre.taille<"512"||this.parametre.provider=="SUN"||this.parametre.provider=="SunJCE")){
      this.message = "La taille des clés doit etre superieure à 512!!Le provider SUN ou SunJCE ne fournit pas RSA ";
      this.showerror = true;
      this.showCle =false;
      this.generate = false;

    }
    else if (this.parametre.algorithme=="DSA" && (this.parametre.provider=="SunJCE"||this.parametre.provider=="SunRsaSign")){
      this.message = "no such algorithm: DSA for provider SunJCE and SunRsaSign ";
      this.showerror = true;
      this.showCle =false;
      this.generate = false;

    }
    else if (this.parametre.algorithme=="DSA" &&this.parametre.taille<"512"){
      this.message = "La taille de la clé DSA doit etre superieure à 512";
      this.showerror = true;
      this.showCle =false;
      this.generate = false;

    }

    this.api.generateKey(this.parametre).subscribe(response => {
    
      console.log(response)
     
     

    },
    error => {
      console.log('error', error);
      this.erreur = error;
      
      if(error.status==200){
        console.log(this.erreur.error.text)
        this.generate =false
        this.openSnackBar()
        this.showCle =true
        this.showerror = false;

      }
    })

  }


  }


