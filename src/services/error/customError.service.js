export class CustomError{
    static createError ({name,message,cause,errorCode}){
        const error = new Error(message);
        error.cause = cause;
        error.name = name;
        error.code = errorCode;
        console.log("error: ", error.name);
        throw error;
    }
}
