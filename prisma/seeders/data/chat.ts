import { Chat } from "@prisma/client";

export const chatData : Omit<Chat,"createdAt" | "updatedAt" | "id">[] = [
    {
        pesan : "Halo, teman-teman! Apa kabar?",
        user_id: 1
    },
    {
        pesan : "Hai! Kabarku baik, nih. Lagi sibuk-sibuknya dengan proyek di kantor.",
        user_id: 2
    },
    {
        pesan : "Halo juga! Aku juga baik. Eh, proyek apa tuh, B?",
        user_id: 3
    },
    {
        pesan : "Proyek penelitian baru nih, C. Sedang fokus mengumpulkan data.",
        user_id: 2
    },
    {
        pesan : "Wah, keren! Kalau begitu, C, bagaimana kabarmu?",
        user_id: 1
    },
    {
        pesan : "Baik juga, A. Baru saja selesai kuliah pagi tadi. Lagi mikir mau makan apa siang ini.",
        user_id: 3
    },
    {
        pesan : "Enak banget, ya, bisa makan siang setelah kuliah. Aku jadi kangen jaman kuliah dulu.",
        user_id: 2
    },
    {
        pesan : "Iya, waktu kuliah memang masa-masa seru. Eh, teman-teman, besok ada rencana apa?",
        user_id: 1
    },
    {
        pesan : "Aku sih masih belum ada rencana pasti. Mau ngajak kemana, A?",
        user_id: 3
    },
    {
        pesan : "Mau ngajak ke kafe, nih. Kalian tertarik?",
        user_id: 1
    },
    {
        pesan : "Wah, aku sih tertarik banget. Tapi, aku masih ada janji sama teman-teman lain.",
        user_id: 2
    },
    {
        pesan : "Kalau begitu, kita rencanakan saja untuk minggu depan, ya.",
        user_id: 1
    },
    {
        pesan : "Oke, A. Aku tunggu kabar selanjutnya.",
        user_id: 3
    },
    {
        pesan : "Baik, C. Sampai ketemu lagi!",
        user_id: 1
    },
    {
        pesan : "Sampai ketemu lagi, A!",
        user_id: 3
    },
    {
        pesan : "Sampai ketemu lagi, teman-teman!",
        user_id: 2,
    }
]