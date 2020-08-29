import { injectable } from 'inversify';
import { LogInRefreshTokenUseCase, LoginUseCaseInputPort } from './LoginUseCaseInputPort';
import container from '@/inversify.config';

import { OAuth2Repository } from '../Repository/OAuth2Repository';
import { SignInUseUseInputPort } from './SignInUseUseInputPort';
import { LogoutUseCaseInputPort } from './LogoutUseCaseInputPort';
import TYPES from "@/ManagerBis/ManagerBisTypes";

export interface ReFreshTokenTimer {
    startTimer(): void;
    stopTimer(): void;
    timerId?: number;
}

@injectable()
export class ReFreshTokenTimerImpl implements ReFreshTokenTimer {
    timerId?: number;
    startTimer(): void {
        if (this.timerId != null) {
            this.stopTimer();
        }
        const loginUseCaseInputPort: LoginUseCaseInputPort = new LogInRefreshTokenUseCase(
            container.get<OAuth2Repository>(TYPES.OAuth2Repository),
            container.get<SignInUseUseInputPort>(TYPES.SignInUseUseInputPort), this,
            container.get<LogoutUseCaseInputPort>(TYPES.LogoutUseCaseInputPort));
        this.timerId = setTimeout(async () => {
            await loginUseCaseInputPort.login();
        }, 1800000);
    }
    stopTimer(): void {
        clearTimeout(this.timerId);
    }
}
