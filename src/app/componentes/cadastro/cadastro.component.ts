import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './cadastro';
import { CadastroService } from './cadastro.service';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-cadastro',
    styleUrls: ['./cadastro.component.css'],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      CommonModule,

    ],
  templateUrl: './cadastro.component.html'
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

    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
      );
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) { // Adicione esta verificação
      this.service.buscarPorId(parseInt(id)).subscribe((user) => {this.user = user
      })
    }
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

    if (pwd.length >= 6) strength++;           // Fraca
    if (pwd.length >= 8) strength++;           // Média
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) strength++; // Forte
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;  // Muito Forte

    return Math.min(strength, 4);
  }

  strengthLabels = [
    'Muito Fraca',
    'Fraca',
    'Média',
    'Forte',
    'Muito Forte'
  ];

  showPasswordInfo = false;

  togglePasswordInfo() {
    this.showPasswordInfo = !this.showPasswordInfo;
  }



  cancelar() {
    this.router.navigate(['/cadastro'])
  }

  get passwordStrength(): number {
    return this.calculatePasswordStrength(this.password);
  }


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
