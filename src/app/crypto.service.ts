import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  //baseurl= "https://apicryptojava.herokuapp.com/api";
 baseurl = 'http://localhost:8080/api';
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
}
