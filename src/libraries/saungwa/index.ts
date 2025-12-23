import axios from "axios";
import * as FormData from "form-data";

import Constant from "src/common/constant";
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
        form.append('appkey', Constant.SAUNGWA_APPKEY);
        form.append('authkey', Constant.SAUNGWA_AUTHKEY);

        try {
            await axios.post(`${Constant.SAUNGWA_BASE_URL}/create-message`, form);
            console.log('WhatsApp notification sent successfully');
        } catch (error) {
            console.error('Failed to send WhatsApp notification', error);
        }
    }
}
