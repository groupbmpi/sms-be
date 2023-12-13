// user
export const OTP_LENGTH = 6;
export const SALT_ROUND = 10;
export const ID_ROLE_SUPERADMIN = 1;
export const ID_ROLE_ADMIN = 2;
export const ID_ROLE_USER = 3;

// bcf location
export const BCF_CITY = "JAKARTA SELATAN"
export const BCF_PROVINCE = "DKI JAKARTA"

//Access control Action
export const READ = "read";
export const WRITE = "write";
export const UPDATE = "update";
export const DELETE = "delete";

//Access control Object
export const USER = "user";
export const LEMBAGA = "lembaga";
export const BERITA = "berita";
export const LAPORAN_KEGIATAN = "laporankegiatan";
export const LAPORAN_MASALAH = "laporanmasalah";
    

// Email template
export const EMAIL_KEY = "[[EMAIL]]"
export const OTP_KEY = "[[OTP]]"
export const PASSWORD_KEY = "[[PASSWORD]]"
export const REGISTER_MESSAGE = "Terima kasih telah mendaftar di BCF. Silahkan tunggu proses verifikasi akun anda paling lambat 1x24 jam.</br></br>Terima kasih,</br></br>BCF"
export const VERIFY_MESSAGE_SUCCESS = "Akun Anda telah berhasil diverifikasi. Berikut adalah kode OTP dan Password Anda</br> OTP : [[OTP]]\nPassword : [[PASSWORD]]. </br>Jangan berikan kode OTP dan password Anda kepada siapapun termasuk pihak BCF. BCF tidak akan pernah meminta kode OTP dan password Anda.</br></br>Terima kasih,</br>BCF"
export const VERIFY_MESSAGE_FAIL = "Mohon maaf akun Anda gagal diverifikasi.</br></br>Terima kasih,</br>BCF"
export const REGISTER_SUBJECT = "Registrasi Akun BCF"
export const VERIFY_SUBJECT = "Verifikasi Akun BCF"