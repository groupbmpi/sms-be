import { Role } from '@prisma/client';

export const roleData : Omit<Role, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
        role: "SuperAdmin",
        akses: "user:read,write,update,delete;lembaga:read,update,write,delete;berita:read,write,update,delete;laporankegiatan:read,write,update,delete;laporanmasalah:read,write,update,delete"
    },
    {
        role: "Admin",
        akses: "user:;lembaga:read,update,write,delete;berita:read,write,update,delete;laporankegiatan:read,write,update,delete;laporanmasalah:read,write,update,delete"
    },
    {
        role: "User",
        akses: "user:;lembaga:read,update,write,delete;berita:read,writeOwn,updateOwn,deleteOwn;laporankegiatan:read,write,updateOwn,delete;laporanmasalah:read,write,update,delete"
    }
]