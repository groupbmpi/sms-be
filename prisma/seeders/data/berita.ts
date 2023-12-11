import { Berita } from "@prisma/client";

export const beritaData : Omit<Berita, 'id'|'createdAt'|'updatedAt'>[] = [
    {
        judul: "Berita 1",
        detail: "Ini detail berita 1",
        linkPhoto: "https://picsum.photos/201",
        user_id: 1,
    },
    {
        judul: "Berita 2",
        detail: "Ini detail berita 2",
        linkPhoto: "https://picsum.photos/201",
        user_id: 2,
    },
    {
        judul: "Berita 3",
        detail: "Ini detail berita 3",
        linkPhoto: "https://picsum.photos/201",
        user_id: 3,
    },
    {
        judul: "Berita 4",
        detail: "Ini detail berita 4",
        linkPhoto: "https://picsum.photos/201",
        user_id: 4,
    },
    {
        judul: "Berita 5",
        detail: "Ini detail berita 5",
        linkPhoto: "https://picsum.photos/201",
        user_id: 5,
    }
]