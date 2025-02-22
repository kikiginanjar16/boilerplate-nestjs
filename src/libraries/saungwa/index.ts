import axios from "axios";
import * as FormData from "form-data";
export class SaungwaApiNotification {

    private normalize(phoneNumber: string): string {
        if (!phoneNumber) {
            throw new Error("Phone number cannot be empty");
        }

        if (phoneNumber[0] === '0') {
            phoneNumber = '62' + phoneNumber.slice(1);
        }

        return phoneNumber;
    }

    public async sendWhatsAppNotification(phoneNumber: string, message: string): Promise<void> {
        const form = new FormData();
        form.append('to', this.normalize(phoneNumber));
        form.append('message', message);
        form.append('appkey', "1a588038-650f-4c63-97be-bb3f5312d9f1");
        form.append('authkey', "aCXiRgGhwetCfn2coxK0Dx4BBvxaDcwRqmkzhfU1cIrSdskOUR");

        try {
            await axios.post(`https://app.saungwa.com/api/create-message`, form);
            console.log('WhatsApp notification sent successfully');
        } catch (error) {
            console.error('Failed to send WhatsApp notification', error);
        }
    }
}