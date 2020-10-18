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
  styleUrls: ['./acceuil.component.css'],
})
export class AcceuilComponent implements OnInit {
  checked = false;
  indeterminate = false;
  showClesignatureerror = false;
  labelPosition: 'symetrique' | 'asymetrique' = 'asymetrique';
  cleprive: String;
  clepublique: String;
  messagechiffre: String;
  erreur;
  message;
  generate = false;
  showCle = false;
  showerror = false;
  durationInSeconds = 5;
  panelOpenState = false;
  url;
  showfilesuccess = false;
  showClesignature = false;
  indeterminatesignature = false;

  params = {
    taille: '',
    algorithme: '',
    file: '',
  };
 
  parametre = {
    algorithme: '',
    provider: '',
    taille: '',
  };
  parametrechiffrement = {
    clepriv: this.cleprive,
    message: '',
    algorithme: this.parametre.algorithme,
  }; 
  paramsignature = {
    hashingAlgo: '',
    signingAlgo: '',
    algorithme: this.parametre.algorithme,
    clepriv:this.cleprive,
    message:''
  };


  // selected = 'option2';

  foods: Food[] = [
    { value: 'RSA', viewValue: 'RSA' },
    { value: 'DSA', viewValue: 'DSA' },
    { value: 'DH', viewValue: 'DH' },
    { value: 'DES', viewValue: 'DES' },
    // {value: 'DESede', viewValue: 'DESede'},
    { value: 'AES', viewValue: 'AES' },
  ];
  signingAlgo: Food[] = [
    { value: 'MD5withRSA', viewValue: 'MD5withRSA' },
    { value: 'SHA1withRSA', viewValue: 'SHA1withRSA' },
    { value: 'SHA256withRSA', viewValue: 'SHA256withRSA' },
    { value: 'MD5withDSA', viewValue: 'MD5withDSA' },
    { value: 'SHA1withDSA', viewValue: 'SHA1withDSA' },
    { value: 'SHA256withDSA', viewValue: 'SHA256withDSA' },
   
  ];
  hashingAlgo: Food[] = [
    { value: 'MD5', viewValue: 'MD5' },
    { value: 'SHA1', viewValue: 'SHA1' },
    { value: 'SHA256', viewValue: 'SHA256' },
   
   
  ];
  provider: Food[] = [
    { value: 'SUN', viewValue: 'SUN' },
    { value: 'SunRsaSign', viewValue: 'SunRsaSign' },
    { value: 'BC', viewValue: 'BC' },
    { value: 'SunJCE', viewValue: 'SunJCE' },
  ];
  taille: Food[] = [
    { value: '2048', viewValue: '2048' },
    { value: '1024', viewValue: '1024' },
    { value: '512', viewValue: '512' },
    { value: '256', viewValue: '256' },
    { value: '128', viewValue: '128' },
    { value: '64', viewValue: '64' },
  ];

  constructor(private api: CryptoService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.parametre = {
      algorithme: '',
      provider: '',
      taille: '',
    };
    this.url = {
      chemin: '',
    };
    this.paramsignature = {
      hashingAlgo: '',
      signingAlgo: '',
      algorithme: '',
      clepriv:'',
      message:''
    };

    // this.checked = this.ModeChiffrementS()
    // this.indeterminate =  this.ModeChiffrementA()
  }

  openSnackBar() {
    this._snackBar.open(
      'Une paire de cle publique et privé a été généré avec succés!!vous pouvez desormais passsez au chiffrement',
      '',
      {
        duration: this.durationInSeconds * 1000,
      }
    );
  }

  openSnackBar2() {
    this._snackBar.open(
      'Fichier chiffre avec succes,et il est place dans le dossier du fichier clair',
      '',
      {
        duration: this.durationInSeconds * 10000,
      }
    );
  }

  ModeChiffrementS(): boolean {
    this.checked = true;
    this.indeterminate = false;
    this.foods = [
      { value: 'DES', viewValue: 'DES' },
      { value: 'DES', viewValue: '3DES' },
      { value: 'AES', viewValue: 'AES' },
    ];
    this.taille = [
      { value: '512', viewValue: '512' },
      { value: '256', viewValue: '256' },
      { value: '128', viewValue: '128' },
      { value: '56', viewValue: '56' },
      { value: '64', viewValue: '64' },
    ];

    console.log(this.checked);
    return this.checked;
  }
  ModeChiffrementA(): boolean {
    this.indeterminate = true;
    this.checked = false;
    console.log(this.indeterminate);
    this.foods = [
      { value: 'RSA', viewValue: 'RSA' },
      { value: 'DSA', viewValue: 'DSA' },
      { value: 'DH', viewValue: 'DH' },
    ];

    this.taille = [
      { value: '2048', viewValue: '2048' },
      { value: '1024', viewValue: '1024' },
      { value: '512', viewValue: '512' },
    ];

    return this.indeterminate;
  }

  generateKey() {
    this.generate = true;
    console.log('click', this.parametre);
    if (this.parametre.algorithme == 'DH' && this.parametre.taille == '128') {
      this.message =
        ' DH key size must be multiple of 64,' +
        'and can only range from 512 to 8192 ';
      this.showerror = true;
      this.showCle = false;
      this.generate = false;
    } else if (
      this.parametre.algorithme == 'DH' &&
      (this.parametre.provider == 'SUN' ||
        this.parametre.provider == 'SunRsaSign')
    ) {
      this.message =
        'pas un tel algorithme: DH pour le fournisseur SUN et SunRsaSign';
      this.showerror = true;
      this.showCle = false;
      this.generate = false;
    } else if (
      this.parametre.algorithme == 'RSA' &&
      (this.parametre.taille < '512' ||
        this.parametre.provider == 'SUN' ||
        this.parametre.provider == 'SunJCE')
    ) {
      this.message =
        'La taille des clés doit etre superieure à 512!!Le provider SUN ou SunJCE ne fournit pas RSA ';
      this.showerror = true;
      this.showCle = false;
      this.generate = false;
    } else if (
      this.parametre.algorithme == 'DSA' &&
      (this.parametre.provider == 'SunJCE' ||
        this.parametre.provider == 'SunRsaSign')
    ) {
      this.message =
        'no such algorithm: DSA for provider SunJCE and SunRsaSign ';
      this.showerror = true;
      this.showCle = false;
      this.generate = false;
    } else if (
      this.parametre.algorithme == 'RSA' &&
      this.parametre.provider == 'SUN'
    ) {
      this.message = 'no such algorithm: RSA for provider SUN';
      this.showerror = true;
      this.showCle = false;
      this.generate = false;
    } else if (
      this.parametre.algorithme == 'DSA' &&
      this.parametre.taille < '512'
    ) {
      this.message = 'La taille de la clé DSA doit etre superieure à 512';
      this.showerror = true;
      this.showCle = false;
      this.generate = false;
    } else if (
      this.parametre.algorithme == 'AES' &&
      (this.parametre.provider == 'SUN ' ||
        this.parametre.provider == 'SunRsaSign')
    ) {
      this.message = 'no such algorithm: AES for provider SUN and SunRsaSign ';
      this.showerror = true;
      this.showCle = false;
      this.generate = false;
    } else if (
      this.parametre.algorithme == 'AES' &&
      (this.parametre.taille > '256' || this.parametre.taille < '128')
    ) {
      this.message = 'Wrong keysize: must be equal to 128, 192 or 256';
      this.showerror = true;
      this.showCle = false;
      this.generate = false;
    } else if (
      this.parametre.algorithme == 'DES' &&
      this.parametre.taille != '56'
    ) {
      this.message = 'Wrong keysize: must be equal 56';
      this.showerror = true;
      this.showCle = false;
      this.generate = false;
    }
    this.api.generateKey(this.parametre).subscribe(
      (response) => {
        this.cleprive = response[0];
        this.clepublique = response[1];

        if (
          this.parametre.algorithme == 'AES' ||
          this.parametre.algorithme == 'DES'
        ) {
          this.checked = true;
          this.cleprive = response[0];
          this.parametrechiffrement.clepriv = this.cleprive;
          this.parametrechiffrement.algorithme = this.parametre.algorithme;
        } else if (
          this.parametre.algorithme != 'AES' &&
          this.parametre.algorithme != 'DES'
        ) {
          this.indeterminate = true;
          this.clepublique = response[1];
        }
        this.generate = false;
        this.openSnackBar();
        this.showCle = true;
        this.showerror = false;

        console.log(response[0]);
        console.log(response[1]);

        this.checked = true;
        this.generate = false;
      },
      (error) => {
        console.log('error', error);
        this.erreur = error;
        this.generate = false;
      }
    );
  }

  chiffrementSymetriqueMessage() {
    this.generate = true;
    console.log(this.parametrechiffrement);
    this.api.ChiffrementSymetrique(this.parametrechiffrement).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log('error', error);
        this.erreur = error;
        this.messagechiffre = this.erreur.error.text;
        this.generate = false;
        console.log(this.messagechiffre);
      }
    );
  }
  chiffrementSymetriqueFichier() {
    this.generate = true;

    this.params = {
      taille: this.parametre.taille,
      algorithme: this.parametre.algorithme,
      file: this.url.chemin,
    };
    console.log(this.params);
    this.api.ChiffrementFichierSymetrique(this.params).subscribe(
      (response) => {
        this.showfilesuccess = true;

        console.log(response);
      },
      (error) => {
        this.generate = false;

        console.log('error', error);
        this.erreur = error;

        this.messagechiffre = this.erreur.error.text;
        console.log(this.messagechiffre);
        this.openSnackBar2();
      }
    );
  }
  loadKeys() {
    console.log(this.parametrechiffrement.algorithme)
    if (
      this.parametre.algorithme == 'DES' ||
      this.parametre.algorithme == '3DES' ||
      this.parametre.algorithme == 'AES'
    ) {
      this.showClesignatureerror = true;
      this.showClesignature = false;
      this.indeterminatesignature = false;
      console.log((this.showClesignatureerror = true));
      
    } 
    else {
      console.log(this.paramsignature)
      this.showClesignature = true;
      this.indeterminatesignature = true;
      this.showClesignatureerror = false;

    }
  }
  signerMessage(){
    this.paramsignature.algorithme=this.parametre.algorithme
    this.paramsignature.clepriv=this.cleprive
    console.log(this.paramsignature)
    this.api.signatureDigitaleMessage(this.paramsignature).subscribe(
      (response) => {
        //this.showfilesuccess = true;

        console.log(response);
        
      },
      (error) => {
        this.generate = false;

        console.log('error', error);
        this.erreur = error;

        this.messagechiffre = this.erreur.error.text;
        console.log(this.messagechiffre);
        this.openSnackBar2();
      }
    );
  }
}
