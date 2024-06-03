import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, emailValidator } from 'src/app/theme/utils/app-validators';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: UntypedFormGroup;
  public agentForm: UntypedFormGroup;
  public hide = true;
  public userTypes = [
    { id: 1, name: 'Agent' },
    { id: 2, name: 'Admin' },
    { id: 3, name: 'Buyer' }
  ];

  constructor(public fb: UntypedFormBuilder, public router: Router, public snackBar: MatSnackBar, private service: SharedService) { }

  ngOnInit() {
    this.userFormInit();
    this.agentFormInit();
  }

  userFormInit() {
    this.registerForm = this.fb.group({
      //userType: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      //receiveNewsletter: false                            
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }

  agentFormInit() {
    this.agentForm = this.fb.group({
      //userType: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      //receiveNewsletter: false                            
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }

  public onRegisterFormSubmit(values: Object): void {
    if (this.registerForm.valid) {
      //console.log(values);
      const formURlData = new FormData();
      formURlData.set('email', this.registerForm.value.email);
      formURlData.set('name', this.registerForm.value.username);
      formURlData.set('phone_number', this.registerForm.value.phone);
      formURlData.set('password', this.registerForm.value.password);
      formURlData.set('confirm_password', this.registerForm.value.confirmPassword);
      this.service.postAPI('public/api/user-register', formURlData).subscribe({
        next: (resp) => {
          if (resp.status == 'success') {
            localStorage.setItem('userDetail', JSON.stringify(resp.user_info));
            this.router.navigateByUrl('');
            this.snackBar.open(resp.message, '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            // this.srevice.setToken(resp.token);
            // this.toastr.success(resp.message);
          } else {
            this.snackBar.open(resp.data.message, '×',
            { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            // this.toastr.warning(resp.message);
            // this.loading = false;
          }
        },
        error: (error) => {
          // this.loading = false;
          //this.toastr.warning('Something went wrong.');
          console.error('Login error:', error.message);
        }
      });
    }
  }

  public onAgentFormSubmit(values: Object): void {
    if (this.agentForm.valid) {
      //console.log(values);
      const formURlData = new FormData();
      formURlData.set('email', this.agentForm.value.email);
      formURlData.set('name', this.agentForm.value.username);
      formURlData.set('phone_number', this.agentForm.value.phone);
      formURlData.set('password', this.agentForm.value.password);
      formURlData.set('confirm_password', this.agentForm.value.confirmPassword);
      this.service.postAPI('public/api/agent-register', formURlData).subscribe({
        next: (resp) => {
          if (resp.status == 'success') {
            localStorage.setItem('userDetail', JSON.stringify(resp.user_info));
            this.router.navigateByUrl('');
            this.snackBar.open(resp.message, '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            // this.srevice.setToken(resp.token);
            // this.toastr.success(resp.message);
          } else {
            this.snackBar.open(resp.data.message, '×',
              { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            // this.toastr.warning(resp.message);
            // this.loading = false;
          }
        },
        error: (error) => {
          // this.loading = false;
          //this.toastr.warning('Something went wrong.');
          console.error('Login error:', error.message);
        }
      });
    }
  }


}
