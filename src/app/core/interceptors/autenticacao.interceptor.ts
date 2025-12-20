import { HttpInterceptorFn } from '@angular/common/http';

export const autenticacaoInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
