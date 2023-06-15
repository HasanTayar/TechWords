export class User {
    name: string
    email: string
    password: string
    gender: string
    birthdate: string
    constructor(name: string, email: string, password: string, gender:string, birthdate:string){
        this.name = name
        this.email = email
        this.password = password
        this.gender = gender
        this.birthdate = birthdate
    }
}