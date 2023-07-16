export class UsersDto{
    constructor(user){
        //contact la info del body de una peticion post
        this.nombreCompleto = `${contact.nombre} ${contact.apellido}`,
        this.email= contact.email,
        this.telefono = contact.telefono,
        this.password = contact.password
    }
}

export class UserGetDto{
    constructor(contactDB){
        this.nombreCompleto=contactDB.nombreCompleto,
        this.email=contactDB.email,
        this.telefono= contactDB.telefono
    }
}