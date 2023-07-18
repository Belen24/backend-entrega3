import { Router } from "express";
import { transporter } from "../config/email.js";

const router = Router();

//creacion del cuerpo del correo
const emailTemplate = `<div>
        <h1>Bienvenido!!</h1>
        <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
        <p>Ya puedes empezar a usar nuestros servicios</p>
        <a href="https://www.google.com/">Explorar</a>
</div>`;



//Estructura del correo
const mailOptions = {
    from:"ecommerce",
    to:"bgutierrez.mil@gmail.com",
    subject:"Registro exitoso",
    html:emailTemplate,
};

//ruta para enviar el correo
router.post("/api/email-coder",async(req,res)=>{
    try{
        //usar el transports con la estructura del correo
        const info = await transporter.sendMail(mailOptions);
        console.log("info: ", info);
        res.json({status:"success", message:`Correo enviado a ${mailOptions.to}`});
    }catch(error){
        console.log(error.message);
        res.json({status:"error", message:"hubo un error al enviar el correo"});
    }
});

export { router as emailRouter};