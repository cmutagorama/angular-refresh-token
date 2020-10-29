import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
      // redirect to home if already logged in
      if (this.authService.userValue) {
        this.router.navigate(['/']);
      }
     }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or dfault to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['/dashboard' || this.returnUrl]);
          },
          error: error => {
            this.error = error;
            this.loading = false;
          }
        });
  }

}
