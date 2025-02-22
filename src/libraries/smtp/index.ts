import nodemailer from 'nodemailer';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.example.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'your-email@example.com',
                pass: 'your-email-password',
            },
        });
    }

    async sendMail(options: MailOptions): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: options.from,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
            });
            console.log('Mail sent successfully');
        } catch (error) {
            console.error('Error sending mail:', error);
        }
    }
}

export default MailService;