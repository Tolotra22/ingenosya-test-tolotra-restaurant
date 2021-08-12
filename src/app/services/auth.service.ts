export class AuthService {
    isAuth = false;
    constructor(){
        setTimeout(() => {
            this.isAuth = true
        }, 500)
    }
}