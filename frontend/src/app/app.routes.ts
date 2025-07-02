import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent as HomeAdminComponent } from './admin/home/home.component';
import { IndexComponent as IndexSubjectComponent } from './admin/subjects/index/index.component';
import { CreateComponent as CreateSubjectComponent } from './admin/subjects/create/create.component';
import { UpdateComponent as UpdateSubjectComponent } from './admin/subjects/update/update.component';
import { IndexComponent as IndexUserComponent } from './admin/users/index/index.component';
import { CreateComponent as CreateUserComponent } from './admin/users/create/create.component';
import { UpdateComponent as UpdateUserComponent } from './admin/users/update/update.component';
import { IndexComponent as IndexStaffComponent } from './admin/staffs/index/index.component';
import { CreateComponent as CreateStaffComponent } from './admin/staffs/create/create.component';
import { UpdateComponent as UpdateStaffComponent } from './admin/staffs/update/update.component';
import { IndexComponent as IndexTeacherComponent } from './admin/teachers/index/index.component';
import { CreateComponent as CreateTeacherComponent } from './admin/teachers/create/create.component';
import { UpdateComponent as UpdateTeacherComponent } from './admin/teachers/update/update.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'admin', component: HomeAdminComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/subjects', component: IndexSubjectComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/subjects/create', component: CreateSubjectComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/subjects/:id/update', component: UpdateSubjectComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/users', component: IndexUserComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/users/create', component: CreateUserComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/users/:id/update', component: UpdateUserComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/staffs', component: IndexStaffComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/staffs/create', component: CreateStaffComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/staffs/:id/update', component: UpdateStaffComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/teachers', component: IndexTeacherComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/teachers/create', component: CreateTeacherComponent, canActivate: [AuthAdminGuard]},
    {path: 'admin/teachers/:id/update', component: UpdateTeacherComponent, canActivate: [AuthAdminGuard]},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
