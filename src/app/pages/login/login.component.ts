import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { emailValidator } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup;
  public agentForm: UntypedFormGroup;
  public hide = true;
  constructor(public fb: UntypedFormBuilder, public router: Router, private service: SharedService) { }

  ngOnInit() {
    this.userFormInit();
    this.agentFormInit();
  }

  userFormInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      //rememberMe: false
    });
  }

  agentFormInit() {
    this.agentForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, emailValidator])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      //rememberMe: false
    });
  }

  public onLoginFormSubmit(values: Object): void {
    if (this.loginForm.valid) {
      const formURlData = new FormData();
      formURlData.set('email', this.loginForm.value.email);
      formURlData.set('password', this.loginForm.value.password);
      this.service.postAPI('public/api/user-login', formURlData).subscribe({
        next: (resp) => {
          if (resp.status == true) {
            localStorage.setItem('userDetail', JSON.stringify(resp.data.user));
            this.router.navigate(['/home']);
            this.service.setUserToken(resp.data.token);
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
      const formURlData = new FormData();
      formURlData.set('email', this.agentForm.value.email);
      formURlData.set('password', this.agentForm.value.password);
      this.service.postAPI('public/api/agent-login', formURlData).subscribe({
        next: (resp) => {
          if (resp.status == true) {
            localStorage.setItem('agentDetail', JSON.stringify(resp.data.agent));
            this.router.navigate(['/home']);
            this.service.setAgentToken(resp.data.token);
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
