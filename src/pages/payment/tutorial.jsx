import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tutorial = () => {
  <div className="container bg-black">
    <Tabs
      defaultValue="account"
      className="w-full bg-black"
    >
      <TabsList className="w-full">
        <TabsTrigger
          value="account"
          className="w-full"
        >
          Transfer Melalui Mobile Banking
        </TabsTrigger>
        <TabsTrigger
          value="password"
          className="w-full"
        >
          Kartu Kredit
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="container space-y-5 pt-3">
          <div>Pembayaran Melalui Mobile Banking</div>
          <div className="px-5">
            <ol
              style={{ listStyleType: "&quot;decimal&quot;" }}
              className="space-y-2"
            >
              <li>
                <strong>Buka Aplikasi Mobile Banking:</strong> Buka aplikasi mobile banking dari bank Anda.
              </li>
              <li>
                <strong>Pilih Menu Transfer:</strong> Pilih opsi &ldquo;Transfer&rdquo; atau serupa.
              </li>
              <li>
                <strong>Pilih Rekening Bank Lain:</strong> Pilih opsi &ldquo;Transfer ke Bank Lain&rdquo; atau sejenisnya.
              </li>
              <li>
                <strong>Masukkan Nomor Rekening Tujuan:</strong> Masukkan nomor rekening tujuan yang diberikan pada halaman pembayaran.
              </li>
              <li>
                <strong>Masukkan Nominal Transfer:</strong> Isi nominal yang ingin Anda transfer sesuai dengan instruksi pembayaran.
              </li>
              <li>
                <strong>Pilih Jenis Transfer:</strong> Pilih jenis transfer yang sesuai, misalnya &ldquo;Antar Bank&rdquo; atau &ldquo;Transfer Online.&rdquo;
              </li>
              <li>
                <strong>Masukkan Deskripsi atau Nomor Referensi:</strong> Masukkan deskripsi atau nomor referensi sesuai petunjuk pembayaran.
              </li>
              <li>
                <strong>Konfirmasi dan Kirim:</strong> Konfirmasikan transaksi dan kirim pembayaran.
              </li>
              <li>
                <strong>Periksa Konfirmasi:</strong> Setelah transaksi berhasil, periksa konfirmasi yang diberikan oleh aplikasi mobile banking.
              </li>
            </ol>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="password">Ubah kata sandi Anda di sini.</TabsContent>
    </Tabs>
  </div>;
};

export default Tutorial;
