export interface LoginManagerComponent {
    onLogin(): void;
}

export default interface LoginManager {
    login(): void;
    logout(): void;
    addListener(loginManagerComponent: LoginManagerComponent ): void;
    removeListener(loginManagerComponent: LoginManagerComponent): void;
    init(): Promise<void>;
    isLogin: boolean;
}

