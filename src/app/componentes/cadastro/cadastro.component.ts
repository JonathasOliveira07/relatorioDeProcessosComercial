import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './cadastro';
import { CadastroService } from './cadastro.service';
import { FormValidations } from './../../form-validations';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],

})
export class CadastroComponent implements OnInit {

  form: FormGroup;
  showPassword = true;
  showConfirmPassword = true;
  isLoading = false;

  user: User = {
  id: 0,
  nome: '',
  email: '',
  password: '',
  confPassword: ''
  }

  constructor(
    private service: CadastroService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) { // Adicione esta verificação
      this.service.buscarPorId(parseInt(id)).subscribe((user) => {this.user = user
      })
    }

    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }


  get password(): string {
    return this.form.get('password')?.value || '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;

    if (!password || !confirm) return null;

    return password === confirm ? null : { mismatch: true };
  }

  criarUser() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const user: User = {
    id: 0,
    nome: this.form.value.name,
    email: this.form.value.email,
    password: this.form.value.password,
    confPassword: this.form.value.password,
  };

  this.service.cadastrarUser(user).subscribe({
    next: () => {
      console.log('Usuário cadastrado com sucesso');
      this.router.navigate(['/login']);
    },
    error: err => console.error(err)
    });
  }



  calculatePasswordStrength(pwd: string): number {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  }

  cancelar() {
    this.router.navigate(['/cadastro'])
  }

  get passwordStrength(): number {
    return this.calculatePasswordStrength(this.password);
  }

  strengthLabels = ['Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'];

  // submit() {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return;
  //   }

  //   if (this.form.value.password !== this.form.value.confirmPassword) {
  //     this.form.get('confirmPassword')?.setErrors({ mismatch: true });
  //     return;
  //   }

  //   this.isLoading = true;



  //   // 🔹 Aqui você chama seu AuthService
  //   setTimeout(() => {
  //     this.isLoading = false;

  //     console.log('Usuário cadastrado com sucesso:', this.form.value);
  //     this.router.navigate(['/login']);
  //   }, 1500);
  // }
}
