import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

// import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/customers' },
  { path: 'customers/:id', data: { preload: true }, loadChildren: 'app/customer/customer.module#CustomerModule' },
  { path: 'customers', loadChildren: 'app/customers/customers.module#CustomersModule' },
  // { path: 'orders', data: { preload: true }, loadChildren: 'app/orders/orders.module#OrdersModule' },
  // { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
  { path: '**', pathMatch: 'full', redirectTo: '/customers' }, 

];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes) ],
  exports: [ RouterModule ],
  // providers: [PreloadModulesStrategy]
})
export class AppRoutingModule { }
