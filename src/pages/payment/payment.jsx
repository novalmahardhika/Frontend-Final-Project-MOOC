import { Card } from "@/components/ui/card";
import PaidCourse from "./course";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Payment = () => {
  // Fungsi untuk menghasilkan nomor Virtual Account secara acak
  const generateVirtualAccount = () => {
    const randomVirtualAccount = Math.floor(Math.random() * 1000000000).toString();
    return randomVirtualAccount;
  };

  return (
    <div className="container mt-5 font-poppins">
      <div className="flex justify-between gap-20">
        <div className="w-4/5">
          <Tabs
            defaultValue="Transfer"
            className="w-full"
          >
            <TabsList className="w-full">
              <TabsTrigger
                value="Transfer"
                className="w-full"
              >
                Transfer Melalui Mobile Banking
              </TabsTrigger>
              <TabsTrigger
                value="Bank"
                className="w-full"
              >
                Pembayaran Melalui Go-Pay
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Transfer">
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
            <TabsContent value="Bank">
              <div className="container space-y-5 pt-3">
                <div>Pembayaran Melalui Go-Pay</div>
                <div className="px-5">
                  <ol
                    style={{ listStyleType: "decimal" }}
                    className="space-y-2"
                  >
                    <li>
                      <strong>Buka Aplikasi GoPay:</strong> Pastikan Anda membuka aplikasi GoPay pada perangkat mobile Anda.
                    </li>
                    <li>
                      <strong>Pilih Menu Scan QR:</strong> Temukan opsi untuk melakukan pembayaran atau scan QR Code. Biasanya, terdapat ikon scan QR di aplikasi GoPay.
                    </li>
                    <li>
                      <strong>Scan QR Code:</strong> Arahkan kamera ponsel Anda ke QR Code yang diberikan pada halaman pembayaran atau di toko fisik.
                    </li>
                    <li>
                      <strong>Masukkan Jumlah Pembayaran:</strong> Isi nominal yang ingin Anda bayarkan sesuai dengan petunjuk pembayaran.
                    </li>
                    <li>
                      <strong>Konfirmasi Pembayaran:</strong> Pastikan untuk memeriksa kembali detail pembayaran, termasuk nomor transaksi dan jumlah yang benar. Konfirmasikan pembayaran jika sudah sesuai.
                    </li>
                    <li>
                      <strong>Isi Deskripsi (Opsional):</strong> Jika ada opsi untuk mengisi deskripsi atau catatan, Anda bisa melakukannya untuk memberikan informasi tambahan.
                    </li>
                    <li>
                      <strong>Konfirmasi dan Kirim:</strong> Setelah semua informasi benar, konfirmasikan pembayaran dan kirimkan.
                    </li>
                    <li>
                      <strong>Periksa Konfirmasi:</strong> Setelah transaksi berhasil, Anda akan menerima konfirmasi pembayaran. Pastikan untuk menyimpan bukti transaksi sebagai referensi.
                    </li>
                  </ol>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-2/5">
          {/* Komponen PaidCourse (gantilah dengan implementasi sesuai kebutuhan) */}
          <Card className="h-[150px] flex items-center justify-center mb-10">
            <div className="space-y-5">
              <Label className="flex justify-center">Nomor Virtual Account</Label>
              <div className="text-2xl text-center">{generateVirtualAccount()}</div>
            </div>
          </Card>
          <PaidCourse />
        </div>
      </div>
    </div>
  );
};

export default Payment;
