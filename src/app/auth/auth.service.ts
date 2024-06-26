import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

    //URLS
    private loginUrl = 'https://restaurantapi.bssoln.com/api/Auth/SignIn';


    
    constructor(private http: HttpClient) {}

    //login
    login(userName: string, password: string): Observable<any> {
        const body = {
          userName,
          password
        };
        return this.http.post<any>(this.loginUrl, body);
      }
      
    


}
