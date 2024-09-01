import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { inject } from '@angular/core';

export const myHttpInterceptor: HttpInterceptorFn = (req, next) => {

  const loadService = inject(LoaderService);
  loadService.show();

  return next(req).pipe(finalize(() => loadService.hide()));
};
