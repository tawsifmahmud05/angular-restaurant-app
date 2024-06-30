import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../../auth/auth.service";
import { Observable } from "rxjs";



@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private authService: AuthService) {

    };

    private employeeDatabaseUrl = 'https://restaurantapi.bssoln.com/api/Employee/datatable';


    getEmployees(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.employeeDatabaseUrl, { headers });
    }

}
