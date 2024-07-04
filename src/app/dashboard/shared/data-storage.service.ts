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

    private baseUrl = 'https://restaurantapi.bssoln.com/api/';

    private endpoints = {
        employee: 'Employee',
        food: 'Food',
        table: 'Table',
        order: 'Order',
        employeeTable: 'EmployeeTable',
    };


    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        });
    }

    private get(endpoint: string, params?: HttpParams): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}${endpoint}`, {
            headers: this.getHeaders(),
            params,
        });
    }

    private post(endpoint: string, body: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}${endpoint}`, body, {
            headers: this.getHeaders(),
        });
    }

    private delete(endpoint: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}${endpoint}`, {
            headers: this.getHeaders(),
        });
    }

    getEmployees(page: number, perPage: number): Observable<any> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('per_page', perPage.toString());
        return this.get(`${this.endpoints.employee}/datatable`, params);
    }

    getFoods(page: number, perPage: number): Observable<any> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('per_page', perPage.toString());
        return this.get(`${this.endpoints.food}/datatable`, params);
    }

    getTables(page: number, perPage: number): Observable<any> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('per_page', perPage.toString());
        return this.get(`${this.endpoints.table}/datatable`, params);
    }

    getOrders(): Observable<any> {
        return this.get(`${this.endpoints.order}/datatable`);
    }

    addEmployee(employeeData: any): Observable<any> {
        return this.post(`${this.endpoints.employee}/create`, employeeData);
    }

    addTable(tableData: any): Observable<any> {
        return this.post(`${this.endpoints.table}/create`, tableData);
    }

    addFood(foodData: any): Observable<any> {
        return this.post(`${this.endpoints.food}/create`, foodData);
    }

    deleteEmployee(employeeId: string): Observable<any> {
        return this.delete(`${this.endpoints.employee}/delete/${employeeId}`);
    }

    deleteEmployeeTable(employeeTableId: string): Observable<any> {
        return this.delete(`${this.endpoints.employeeTable}/delete/${employeeTableId}`);
    }

    deleteTable(tableId: string): Observable<any> {
        return this.delete(`${this.endpoints.table}/delete/${tableId}`);
    }

    deleteFood(foodId: string): Observable<any> {
        return this.delete(`${this.endpoints.food}/delete/${foodId}`);
    }

    getNonAssignedEmployee(tableId: string): Observable<any> {
        return this.get(`${this.endpoints.employee}/non-assigned-employees/${tableId}`);
    }
}
