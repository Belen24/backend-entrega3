export const generateUserErrorInfo =(user)=>{
    return `
    Uno o mas campos no estan completos.
    Lista de campos requeridos:
    name: Este campo recibe string, pero se recibe ${user.name},
    `

}
