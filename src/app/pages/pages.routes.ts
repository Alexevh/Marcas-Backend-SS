import { Routes, RouterModule } from '@angular/router';


/* Rutas para las paginas de la APP */
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';

const pagesRoutes: Routes = [
    {    path: '',
         component: PagesComponent,
          children: [
                    {path: 'progress', component: ProgressComponent},
                    {path: 'graficas1', component: Graficas1Component},
                    {path: 'dashboard', component: DashboardComponent},
                    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  ]
},

];

/*  Como son rutas secundarias suamos forchild */
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);