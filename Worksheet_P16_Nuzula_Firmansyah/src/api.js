const ALAMAT = 'data/proyek.json';

export async function ambilProyek() {
    try {
        const respons = await fetch(ALAMAT);
        if (!respons.ok) {
            throw new Error('Status HTTP ' + respons.status);
        }
        const data = await respons.json();
        if (!Array.isArray(data)) {
            throw new Error('Bentuk data tidak sesuai: API harus mengembalikan larik.');
        }
        return data;
    } catch (galat) {
        console.error('Gagal mengambil data proyek:', galat.message);
        throw galat;
    }
}
