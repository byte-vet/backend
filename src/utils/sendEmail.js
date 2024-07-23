import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';


export const sendEmail = async (email, subject, payload, template) => {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD_APP
            }
        });

        
        const __dirname = path.resolve('src', 'utils');
        const source = fs.readFileSync(path.join(__dirname, template), 'utf8');
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
            return {
                from: process.env.EMAIL,
                to: email,
                subject: subject,
                html: compiledTemplate(payload)
            }
        }

        // envia email
        transporter.sendMail(options(), (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
    
}



/* Exemplo de uso */
// sendEmail('
//"seuemail@gmail.com", 
//"Assunto do email",
//{ name: '
//"Nome do usuário" },
//"nome-do-template"
//);
// Path: src/utils/sendEmail.js