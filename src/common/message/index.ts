export default class MessageHandler {
    static readonly OK = 'OK';

    static readonly SUC000 = 'Data berhasil ditampilkan';
    static readonly SUC001 = 'Data berhasil disimpan';
    static readonly SUC002 = 'Data berhasil diperbarui';
    static readonly SUC003 = 'Data berhasil dihapus';
    static readonly SUC004 = 'Data berhasil diambil';
    static readonly SUC005 = 'Data berhasil terkirim';
    static readonly SUC006 = 'Anda berhasil login';
    static readonly SUC007 = 'Pendaftaran anda telah berhasil';
    static readonly SUC008 = 'OTP berhasil dikirim';
    static readonly SUC009 = 'Anda berhasil logout';

    static readonly ERR000 = 'Kesalahan pada server';
    static readonly ERR001 = 'Kredensial tidak valid';
    static readonly ERR002 = 'Gagal menyimpan data';
    static readonly ERR003 = 'Gagal memperbarui data';
    static readonly ERR004 = 'Gagal menghapus data';
    static readonly ERR005 = 'Data tidak ditemukan';
    static readonly ERR006 = 'Nomor telepon sudah terdaftar';
    static readonly ERR007 = 'Anda tidak memiliki akses';
    static readonly ERR008 = 'Tokan tidak valid';
    static readonly ERR009 = 'OTP sudah kadaluarsa';
    static readonly ERR010 = 'OTP tidak valid';
    static readonly ERR011 = 'Token sudah tidak berlaku';
    static readonly ERR012 = 'Terlalu banyak percobaan, coba lagi nanti';
}
