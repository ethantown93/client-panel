import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { AddClientComponent } from 'src/app/components/add-client/add-client.component';
import { ClientDetailsComponent } from 'src/app/components/client-details/client-details.component';
import { ClientsComponent } from 'src/app/components/clients/clients.component';
import { EditClientComponent } from 'src/app/components/edit-client/edit-client.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client/add',
    component: AddClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client/:id',
    component: ClientDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client/edit/:id',
    component: EditClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RegisterGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RegisterGuard]
})
export class AppRoutingModule { }
