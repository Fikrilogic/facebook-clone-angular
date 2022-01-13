import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookGuard } from './guards/facebook.guard';


const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(mod => mod.PublicModule)
  },
  {
    path: 'private',
    loadChildren: () => import('./private/private.module').then(mod => mod.PrivateModule),
    canActivate: [FacebookGuard]
  },
  {
    path: '**',
    redirectTo: 'public',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
