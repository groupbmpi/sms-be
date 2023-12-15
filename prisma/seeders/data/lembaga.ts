import { Kategori, Lembaga } from "@prisma/client";

//TODO:Continue add other lembaga
export const lembagaData : Omit<Lembaga, 'id'|'createdAt'|'updatedAt'>[] = [
    {
        nama: "Kemenko PMK RI",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementrian Kesehatan RI",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementrian Dalam Negeri",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementerian Ketenagakerjaan",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementerian Desa PDTT",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementerian Komunikasi dan Informatika",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Kementerian Pendidikan, Kebudayaan, Riset dan Teknologi",
        kategori: Kategori.KEMENTRIAN,
    },
    {
        nama: "Dinas Kesehatan Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Dinas Kesehatan Kabupaten/Kota",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Dinas Pendidikan Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Dinas Pendidikan Kabupaten/Kota",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Dinas Komunikasi dan Informatika Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Dinas Komunikasi dan Informatika Kabupaten/Kota",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Badan Perencanaan Daerah",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Humas/Protokoler Pemerintah Provinsi",
        kategori: Kategori.PEMERINTAH_DAERAH,
    },
    {
        nama: "Yayasan Mentari Meraki Asa",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "SR Sumatera Barat",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "Yayasan Inisiatif Lampung Sehat",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "Masyarakat Sehat Sriwijaya",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "PKBI Riau",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "SR DKI Jakarta",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "SR Banten",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "SR Konsorisium Penabulu Jawa Barat",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "Mentari Sehat Indonesia",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "Yayasan Bhanu Yasa Sejahtera",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "Yayasan Bina Asri",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "Yayasan Masyarakat Peduli TBC Sulawesi Selatan",
        kategori: Kategori.LEMBAGA_SWADAYA_MASYARAKAT,
    },
    {
        nama: "Universitas Sumatera Utara",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Muhammadiyah Sumatera Utara",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Andalas",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Negeri Padang",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Politeknik Kesehatan Kemenkes Padang",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Riau",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Muhammadiyah Riau",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Sriwijaya",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Muhammadiyah Palembang",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Lampung",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Bandar Lampung",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Sultan Ageng Tirtayasa",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Muhammadiyah Tangerang",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Negeri Jakarta",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Islam Negeri Syarif Hidayatullah Jakarta",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        nama: "Universitas Paramadina",
        kategori: Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Bakrie",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Muhammadiyah Jakarta",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Indonesia",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Institut Pertanian Bogor",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Institut Teknologi Bandung",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Padjadjaran",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Diponegoro",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Muhammadiyah Semarang",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Muhammadiyah Surakarta",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Jember",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Airlangga",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Politeknik Negeri Madura",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Negeri Malang",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Islam Negeri Sayyid Ali Rahmatullah Tulungagung",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Ciputra",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN,
    },
    {
        "nama": "Universitas Muhammadiyah Pontianak",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN
    },
    {
        "nama": "Universitas Tanjungpura",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN
    },
    {
        "nama": "Universitas Islam Negeri Alauddin Makassar",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN
    },
    {
        "nama": "Universitas Hasanuddin",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN
    },
    {
        "nama": "Sekolah Tinggi Ilmu Kesehatan Tamalatea Makassar",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN
    },
    {
        "nama": "Universitas Mulawarman",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN
    },
    {
        "nama": "Universitas Cendrawasih",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN
    },
    {
        "nama": "Universitas Sam Ratulangi",
        "kategori": Kategori.INSTITUSI_PENDIDIKAN
    },
    {
        "nama": "Bakrie Sumatera Plantation",
        "kategori": Kategori.DUNIA_USAHA
    },
    {
        "nama": "Dairi Prima Minerals",
        "kategori": Kategori.DUNIA_USAHA
    },
    {
        "nama": "Bumi Resources Minerals",
        "kategori": Kategori.DUNIA_USAHA
    },
    {
        "nama": "PT Otsuka Indah Amerta",
        "kategori": Kategori.DUNIA_USAHA
    },
    {
        "nama": "Johnson & Johnson",
        "kategori": Kategori.DUNIA_USAHA
    },
    {
        "nama": "KADIN Indonesia",
        "kategori": Kategori.DUNIA_USAHA
    },
    {
        "nama": "KADIN Provinsi",
        "kategori": Kategori.DUNIA_USAHA
    },
    {
        "nama": "Energi Mega Persada",
        "kategori": Kategori.DUNIA_USAHA
    },
    {
        "nama": "KOMPAS",
        "kategori": Kategori.MEDIA
    },
    {
        "nama": "ANTARA",
        "kategori": Kategori.MEDIA
    },
    {
        "nama": "INews",
        "kategori": Kategori.MEDIA
    },
    {
        "nama": "Viva",
        "kategori": Kategori.MEDIA
    },
    {
        "nama": "ANTV",
        "kategori": Kategori.MEDIA
    },
    {
        "nama": "TVOne",
        "kategori": Kategori.MEDIA
    },
    {
        "nama": "TribunNews",
        "kategori": Kategori.MEDIA
    },
    {
        "nama": "Tempo.co",
        "kategori": Kategori.MEDIA
    },
    {
        "nama": "Media Lokal",
        "kategori": Kategori.MEDIA
    },
    {
        "nama": "POP TB Indonesia",
        "kategori": Kategori.MASYARAKAT_TERDAMPAK
    },
    {
        "nama": "PUSAKO Sumbar",
        "kategori": Kategori.MASYARAKAT_TERDAMPAK
    },
    {
        "nama": "Pejuang Tangguh",
        "kategori": Kategori.MASYARAKAT_TERDAMPAK
    },
    {
        "nama": "Sekawan's TB Jember",
        "kategori": Kategori.MASYARAKAT_TERDAMPAK
    },
    {
        "nama": "Rekat Peduli Indonesia",
        "kategori": Kategori.MASYARAKAT_TERDAMPAK
    },
    {
        "nama": "Daeng TB Gowa",
        "kategori": Kategori.MASYARAKAT_TERDAMPAK
    },
    {
        "nama": "Bekantan TB",
        "kategori": Kategori.MASYARAKAT_TERDAMPAK
    },
]
