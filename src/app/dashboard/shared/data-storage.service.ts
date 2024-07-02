import { HttpClient, HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { AuthService } from "../../auth/auth.service";
import { Observable } from "rxjs";



@Injectable({ providedIn: 'root' })
export class DataStorageService {

    isLoading = false;

    constructor(private http: HttpClient, private authService: AuthService) {

    };

    private employeeDatabaseUrl = 'https://restaurantapi.bssoln.com/api/Employee/datatable';
    private foodDatabaseUrl = 'https://restaurantapi.bssoln.com/api/Food/datatable';
    private tableDatabaseUrl = 'https://restaurantapi.bssoln.com/api/Table/datatable';

    private createEmployeeUrl = 'https://restaurantapi.bssoln.com/api/Employee/create';

    getEmployees(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.employeeDatabaseUrl, { headers });
    }

    getFoods(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.foodDatabaseUrl, { headers });
    }

    getTables(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.tableDatabaseUrl, { headers });
    }

    addEmployee(employeeData: { firstName?: string; middleName?: string; lastName?: string; image?: string; spouseName?: string; fatherName?: string; motherName?: string; designation?: string; email?: string; phoneNumber?: string; gender?: string; dob?: string; joinDate?: string; nid?: string; headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType?: "arraybuffer"; withCredentials?: boolean | undefined; transferCache?: boolean | { includeHeaders?: string[] | undefined; } | undefined; }): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.post<any>(this.createEmployeeUrl, employeeData, { headers });
    }

}