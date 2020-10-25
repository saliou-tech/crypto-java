import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
baseurl= "https://apicryptojava.herokuapp.com/api";
//baseurl = 'http://localhost:8080/api';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'  });

  constructor(private http: HttpClient) { }



  generateKey(url): Observable<any> {
    // this.url = url.replace(/^.*\\/, '');

    console.log( this.baseurl + '/graph' + JSON.stringify(url) + '/'  , { headers: this.httpHeaders} );

    return this.http.post<any>(this.baseurl + '/generate' , JSON.stringify(url)  , { headers: this.httpHeaders});
  }


  ChiffrementSymetrique(url): Observable<any> {
    // this.url = url.replace(/^.*\\/, '');

    console.log( this.baseurl + '/encrypt' + JSON.stringify(url) + '/'  , { headers: this.httpHeaders} );

    return this.http.post<any>(this.baseurl + '/encrypt' , JSON.stringify(url)  , { headers: this.httpHeaders});
  }
  ChiffrementASymetrique(url): Observable<any> {
    // this.url = url.replace(/^.*\\/, '');

    console.log( this.baseurl + '/encryptasymetrique' + JSON.stringify(url) + '/'  , { headers: this.httpHeaders} );

    return this.http.post<any>(this.baseurl + '/encryptasymetrique' , JSON.stringify(url)  , { headers: this.httpHeaders});
  }
  ChiffrementFichierSymetrique(url): Observable<any> {
    // this.url = url.replace(/^.*\\/, '');

    console.log( this.baseurl + '/encrypt' + JSON.stringify(url) + '/'  , { headers: this.httpHeaders} );

    return this.http.post<any>(this.baseurl + '/encryptfile' , JSON.stringify(url)  , { headers: this.httpHeaders});
  }
  ChiffrementFichierAsymetrique(url): Observable<any> {
    // this.url = url.replace(/^.*\\/, '');

    console.log( this.baseurl + '/encryptasymetriquefile' + JSON.stringify(url) + '/'  , { headers: this.httpHeaders} );

    return this.http.post<any>(this.baseurl + '/encryptasymetriquefile' , JSON.stringify(url)  , { headers: this.httpHeaders});
  }


  signatureDigitaleMessage(url): Observable<any> {
    // this.url = url.replace(/^.*\\/, '');

    console.log( this.baseurl + '/signature' + JSON.stringify(url) + '/'  , { headers: this.httpHeaders} );

    return this.http.post<any>(this.baseurl + '/signature' , JSON.stringify(url)  , { headers: this.httpHeaders});
  }

  signatureDigitaleFchier(url): Observable<any> {
    // this.url = url.replace(/^.*\\/, '');

    console.log( this.baseurl + '/signaturefichier' + JSON.stringify(url) + '/'  , { headers: this.httpHeaders} );

    return this.http.post<any>(this.baseurl + '/signaturefichier' , JSON.stringify(url)  , { headers: this.httpHeaders});
  }


  DechiffrementMessage(url): Observable<any> {
    // this.url = url.replace(/^.*\\/, '');

    console.log( this.baseurl + '/dechiffrer' + JSON.stringify(url) + '/'  , { headers: this.httpHeaders} );

    return this.http.post<any>(this.baseurl + '/dechiffrer' , JSON.stringify(url)  , { headers: this.httpHeaders});
  }


}
