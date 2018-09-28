import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsejeroComponent } from "./components/bodys/consejero/consejero.component";
import { DirectorComponent } from "./components/bodys/director/director.component";
import { EstudianteComponent } from "./components/bodys/estudiante/estudiante.component";
import { ProfesorComponent } from "./components/bodys/profesor/profesor.component";
import { PageNotFoundComponent } from "./components/bodys/page-not-found/page-not-found.component";
import { EmptyComponent } from './components/bodys/empty/empty.component';
import { DemandaComponent } from './components/bodys/director/demanda/demanda.component';
import { AsincronasComponent } from './components/bodys/director/asincronas/asincronas.component';
import { PeriodicasComponent } from './components/bodys/director/periodicas/periodicas.component';
import { AdminComponent } from "./components/admin/admin.component";
import { ConsultaDemandaComponent } from "./components/bodys/director/demanda/consulta-demanda/consulta-demanda.component";
import { BuscarComponent } from './components/bodys/consejero/buscar/buscar.component';
import { IaComponent } from './components/bodys/director/ia/ia.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { CrudadminComponent } from './components/admin/crudadmin/crudadmin.component';
import { CrearComponent } from './components/admin/crudadmin/crear/crear.component';
import { EliminarComponent } from './components/admin/crudadmin/eliminar/eliminar.component';
import { EditarComponent } from './components/admin/crudadmin/editar/editar.component';
import { ConsultarComponent } from './components/admin/crudadmin/consultar/consultar.component';
import { HomeComponent } from './components/home/home.component';
const ROUTES: Routes = [
    {
        path: 'consejero', component: ConsejeroComponent, canActivate: [AuthGuardGuard], canActivateChild: [AuthGuardGuard],
        children: [
            { path: 'buscar', component: BuscarComponent },
            { path: '', component: EmptyComponent },
            { path: '**', component: PageNotFoundComponent },
        ]

    },
    {
        path: 'director/:id',
        component: DirectorComponent, canActivate: [AuthGuardGuard], canActivateChild: [AuthGuardGuard],
        children: [
            { path: 'demanda', component: DemandaComponent },
            { path: 'asincrono', component: AsincronasComponent },
            { path: 'periodico', component: PeriodicasComponent },
            { path: 'ia', component: IaComponent },
            { path: 'demanda/consultaDemanda', component: ConsultaDemandaComponent },
            { path: '', component: EmptyComponent },
            { path: '**', component: PageNotFoundComponent },

        ]
    },

    { path: 'estudiante/:id', component: EstudianteComponent, canActivate: [AuthGuardGuard] },
    { path: 'profesor/:id', component: ProfesorComponent, canActivate: [AuthGuardGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuardGuard] },
    {
        path: 'admin/:id', component: CrudadminComponent, canActivate: [AuthGuardGuard], children: [
            { path: 'crear', component: CrearComponent },
            { path: 'eliminar', component: EliminarComponent },
            { path: 'editar', component: EditarComponent },
            { path: 'consultar', component: ConsultarComponent },
            { path: '', component: EmptyComponent },
            { path: '**', component: PageNotFoundComponent },
        ]
    },
    { path: 'Home', component: HomeComponent, canActivate: [AuthGuardGuard] },
    { path: '**', pathMatch: 'full', redirectTo: 'Home' }

];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
    exports: [RouterModule]
})
// tslint:disable-next-line:class-name
export class APP_ROUTING { }

