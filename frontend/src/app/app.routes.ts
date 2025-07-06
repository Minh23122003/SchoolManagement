import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent as HomeAdminComponent } from './admin/component/home/home.component';
import { IndexComponent as IndexSubjectComponent } from './admin/component/subjects/index/index.component';
import { CreateComponent as CreateSubjectComponent } from './admin/component/subjects/create/create.component';
import { UpdateComponent as UpdateSubjectComponent } from './admin/component/subjects/update/update.component';
import { IndexComponent as IndexUserComponent } from './admin/component/users/index/index.component';
import { CreateComponent as CreateUserComponent } from './admin/component/users/create/create.component';
import { UpdateComponent as UpdateUserComponent } from './admin/component/users/update/update.component';
import { IndexComponent as IndexStaffComponent } from './admin/component/staffs/index/index.component';
import { CreateComponent as CreateStaffComponent } from './admin/component/staffs/create/create.component';
import { UpdateComponent as UpdateStaffComponent } from './admin/component/staffs/update/update.component';
import { IndexComponent as IndexTeacherComponent } from './admin/component/teachers/index/index.component';
import { CreateComponent as CreateTeacherComponent } from './admin/component/teachers/create/create.component';
import { UpdateComponent as UpdateTeacherComponent } from './admin/component/teachers/update/update.component';
import { IndexComponent as IndexGradeComponent } from './admin/component/grades/index/index.component';
import { CreateComponent as CreateGradeComponent } from './admin/component/grades/create/create.component';
import { UpdateComponent as UpdateGradeComponent } from './admin/component/grades/update/update.component';
import { IndexComponent as IndexSchoolYearComponent } from './admin/component/school-years/index/index.component';
import { CreateComponent as CreateSchoolYearComponent } from './admin/component/school-years/create/create.component';
import { UpdateComponent as UpdateSchoolYearComponent } from './admin/component/school-years/update/update.component';
import { IndexComponent as IndexClassComponent } from './admin/component/classes/index/index.component';
import { CreateComponent as CreateClassComponent } from './admin/component/classes/create/create.component';
import { UpdateComponent as UpdateClassComponent } from './admin/component/classes/update/update.component';
import { IndexComponent as IndexStudentComponent } from './admin/component/students/index/index.component';
import { CreateComponent as CreateStudentComponent } from './admin/component/students/create/create.component';
import { UpdateComponent as UpdateStudentComponent } from './admin/component/students/update/update.component';
import { IndexComponent as IndexScoreComponent } from './admin/component/scores/index/index.component';
import { CreateComponent as CreateScoreComponent } from './admin/component/scores/create/create.component';
import { UpdateComponent as UpdateScoreComponent } from './admin/component/scores/update/update.component';
import { AuthAdminGuard } from './admin/guards/auth-admin.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
      path: 'admin',
      component: HomeAdminComponent,
      canActivate: [AuthAdminGuard],
      children: [
        // SUBJECTS
        { path: 'subjects', component: IndexSubjectComponent },
        { path: 'subjects/create', component: CreateSubjectComponent },
        { path: 'subjects/:id/update', component: UpdateSubjectComponent },

        // USERS
        { path: 'users', component: IndexUserComponent },
        { path: 'users/create', component: CreateUserComponent },
        { path: 'users/:id/update', component: UpdateUserComponent },

        // STAFFS
        { path: 'staffs', component: IndexStaffComponent },
        { path: 'staffs/create', component: CreateStaffComponent },
        { path: 'staffs/:id/update', component: UpdateStaffComponent },

        // TEACHERS
        { path: 'teachers', component: IndexTeacherComponent },
        { path: 'teachers/create', component: CreateTeacherComponent },
        { path: 'teachers/:id/update', component: UpdateTeacherComponent },

        // GRADES
        { path: 'grades', component: IndexGradeComponent },
        { path: 'grades/create', component: CreateGradeComponent },
        { path: 'grades/:id/update', component: UpdateGradeComponent },

        // SCHOOL YEARS
        { path: 'school-years', component: IndexSchoolYearComponent },
        { path: 'school-years/create', component: CreateSchoolYearComponent },
        { path: 'school-years/:id/update', component: UpdateSchoolYearComponent },

        // CLASSES
        { path: 'classes', component: IndexClassComponent },
        { path: 'classes/create', component: CreateClassComponent },
        { path: 'classes/:id/update', component: UpdateClassComponent },

        // STUDENTS
        { path: 'students', component: IndexStudentComponent },
        { path: 'students/create', component: CreateStudentComponent },
        { path: 'students/:id/update', component: UpdateStudentComponent },

        // SCORES
        { path: 'scores', component: IndexScoreComponent },
        { path: 'scores/create', component: CreateScoreComponent },
        { path: 'scores/:id/update', component: UpdateScoreComponent },
      ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
