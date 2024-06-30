import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AdminComponent } from "./dashboard/admin/admin.component";
import { AuthGuard } from "./auth/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeesComponent } from "./dashboard/employees/employees.component";
import { TablesComponent } from "./dashboard/tables/tables.component";
import { FoodsComponent } from "./dashboard/foods/foods.component";
import { OrderComponent } from "./dashboard/order/order.component";
import { OrdersComponent } from "./dashboard/orders/orders.component";

const appRoutes:Routes=[
{
    path:'',
    component:AuthComponent
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
      { path: 'order', component: OrderComponent },
      { path: 'orders', component: OrdersComponent },
    ]
},

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}