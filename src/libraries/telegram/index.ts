import axios from 'axios';

class TelegramNotification {
    private botToken: string;
    private chatId: string;

    constructor(botToken: string, chatId: string) {
        this.botToken = botToken;
        this.chatId = chatId;
    }

    async sendMessage(message: string): Promise<void> {
        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        const payload = {
            chat_id: this.chatId,
            text: message,
        };

        try {
            await axios.post(url, payload);
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}

export default TelegramNotification;