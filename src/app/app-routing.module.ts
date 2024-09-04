import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./dashboard/admin/admin.component";
import { AuthGuard } from "./auth/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeesComponent } from "./dashboard/employees/employees.component";
import { TablesComponent } from "./dashboard/tables/tables.component";
import { FoodsComponent } from "./dashboard/foods/foods.component";
import { NewOrderComponent } from "./dashboard/new-order/new-order.component";
import { OrdersComponent } from "./dashboard/orders/orders.component";
import { AddEmployeeComponent } from "./dashboard/employees/add-employee/add-employee.component";
import { AddTableComponent } from "./dashboard/tables/add-table/add-table.component";
import { AddFoodComponent } from "./dashboard/foods/add-food/add-food.component";
import { LoginGuard } from "./auth/login.guard";

const appRoutes: Routes = [
    {
        path: '',
        component: AuthComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            { path: 'admin', component: AdminComponent },
            { path: 'employees', component: EmployeesComponent },
            { path: 'tables', component: TablesComponent },
            { path: 'foods', component: FoodsComponent },
            { path: 'new-order', component: NewOrderComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'add-employee', component: AddEmployeeComponent },
            { path: 'add-table', component: AddTableComponent },
            { path: 'add-food', component: AddFoodComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}