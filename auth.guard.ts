import { CanActivateFn, Router } from '@angular/router';
import { HasTokenService } from './src/app/services/has-token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const hasTokenService = inject(HasTokenService);
    const router = inject(Router);

    let hasToken = false;

    hasTokenService.hasToken.subscribe(res => {
        hasToken = res;
    });

    if (hasToken) {
        return true
    } else {
        router.navigate(["/login"]);
        return false;
    }
};
