# BORMI
**BORMI** adalah sebuah *website* yang digunakan untuk **mengelola keberjalanan operasional** toko retail BORMI. *Website* BORMI akan digunakan oleh **3 jenis pengguna** yaitu : 
- **Kasir**
	- Di dalam *website* BORMI, kasir dapat : 
		-  **Melihat produk apa saja** yang **sedang dijual** oleh toko retail BORMI
		- **Melakukan *filter*** terhadap produk yang ditampilkan berdasarkan **nama** dan **kategori** barang
		- **Memasukkan produk** yang dipilih **ke dalam keranjang** kasir tersebut
		- Mengelola produk yang ada di dalam keranjang seperti **menambah atau mengurangi kuantitas barang** di dalam keranjang dan **menghapus barang** dari keranjang
		- **Melakukan *checkout*** terhadap barang-barang yang ada di keranjang dan **menghasilkan data transaksi baru**
- **Inventaris**
	- Di dalam *website* BORMI, inventaris dapat : 
		-  **Melihat data daftar produk yang ada** di toko retail BORMI
		-  **Mengelola data produk** yang ada di toko retail BORMI, seperti : 
			1. **Mengubah data produk** yang ada seperti **gambar, nama, kategori, stok, dan harga** produk
			2. **Menghapus produk** dari daftar produk di toko retail BORMI
			3. **Menambah data produk baru** ke dalam daftar data produk
		
- **Admin**
	- Di dalam *website* BORMI, admin dapat : 
		- **Melihat data daftar karyawan** yang ada di toko retail BORMI
		-  **Mengelola data karyawan** yang ada di toko retail BORMI, seperti : 
			1. **Mengubah data karyawan** yang ada seperti ***username*, *password*, dan jenis pengguna** dalam *website* BORMI
			2. **Menghapus karyawan** dari daftar karyawan di toko retail BORMI
			3. **Menambah data karyawan baru** ke dalam daftar data karyawan
		- **Melihat data transaksi** toko retail BORMI
		- **Melakukan *filter*** terhadap data transaksi toko retail BORMI berdasarkan **rentang tanggal**
		- **Melihat detail setiap transaksi** seperti **tanggal dilakukannya transaksi**, **produk apa saja yang dibeli** dengan **gambar, nama, kuantitas, dan harga produk**, serta **total harga transaksi**

# Cara Menjalankan Aplikasi
Silahkan kunjungi link berikut : [*website* BORMI](https://rpl-bormi.vercel.app/)
### Kredensial
1. Admin
```
username : admin
password : password
```
2. Inventaris
```
username : inventaris
password : password
```
3. Kasir
```
username : kasir1
password : password
```
```
username : kasir2
password : password
```
```
username : kasir3
password : password
```
```
username : kasir4
password : password
```
```
username : kasir5
password : password
```

# Daftar Use Case yang Diimplementasi
### Tabel *Use Case* yang Diimplementasi
<table>
<thead>
  <tr>
    <th>Diimplementasi</th>
    <th>Use Case</th>
    <th>NIM</th>
    <th>Nama</th>
    <th>Layar</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
<center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Melakukan log in</td>
    <td rowspan="4"><center>18221073<br>18221097</center></td>
    <td rowspan="4">Jessica<br>Filbert Felim</td>
    <td><center>Login<br><img src="https://i.ibb.co/CwPfp0N/Screenshot-2023-11-25-at-20-11-33.png" alt="Image" width="700" height="394"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td rowspan="2"><center>Melihat data rekap transaksi</td>
    <td><center>Tabel data rekap transaksi<br><img src="https://i.ibb.co/nQRdJLp/Screenshot-2023-11-24-at-23-48-59.png" alt="Image" width="700" height="369"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Deskripsi data rekap transaksi<br><img src="https://i.ibb.co/nsyFqFy/Screenshot-2023-11-24-at-23-49-26.png" alt="Image" width="700" height="369"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Melakukan filter data transaksi</td>
    <td><center>Tabel data rekap transaksi sesudah filter<br><img src="https://i.ibb.co/gytBqwZ/Screenshot-2023-11-24-at-23-50-49.png" alt="Image" width="700" height="369"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Mengelola barang dalam keranjang</td>
    <td rowspan="3"><center>18221097</td>
    <td rowspan="3"><center>Filbert Felim</td>
    <td><center>Barang &amp; total bill dalam keranjang<br><img src="https://i.ibb.co/BywVvDr/Screenshot-2023-11-24-at-23-58-08.png" alt="Image" width="700" height="369"><br><br>Menghapus dari keranjang<br><img src="https://i.ibb.co/chP9FYx/Screenshot-2023-11-25-at-00-00-26.png" alt="Image" width="700" height="369"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Menambah riwayat transaksi ( checkout )</td>
    <td><center>Tampilan keranjang setelah melakukan checkout<br><img src="https://i.ibb.co/6HvZ6fy/Screenshot-2023-11-25-at-00-17-51.png" alt="Image" width="700" height="369"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Melakukan log out</td>
    <td><center>Alert melakukan logout<br><img src="https://i.ibb.co/W0fVDqJ/Screenshot-2023-11-24-at-23-51-50.png" alt="Image" width="700" height="368"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Mengelola data pegawai</td>
    <td><center>18221137 18221097</td>
    <td><center>Felisa Aidadora D Filbert Felim</td>
    <td><center>Tabel data pegawai<br><img src="https://i.ibb.co/2ZNrBv2/Screenshot-2023-11-24-at-23-43-23.png" alt="Image" width="700" height="369"><br><br>Mengubah data karyawan<br><img src="https://i.ibb.co/ngmRpfM/Screenshot-2023-11-24-at-23-45-59.png" alt="Image" width="700" height="369"><br><br>Menambah data karyawan baru<br><img src="https://i.ibb.co/PMTmXtP/Screenshot-2023-11-25-at-00-21-00.png" alt="Image" width="700" height="369"><br><br>Menghapus karyawan<br><img src="https://i.ibb.co/hs3XJPT/Screenshot-2023-11-24-at-23-48-04.png" alt="Image" width="700" height="369"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Mengelola data produk</td>
    <td rowspan="4"><center>18221153 18221097</td>
    <td rowspan="4"><center>Victoria Angelique Filbert Felim</td>
    <td><center>Tabel data produk<br><img src="https://i.ibb.co/hC8n6Hb/Screenshot-2023-11-25-at-00-02-46.png" alt="Image" width="700" height="341"><br><br>Mengubah data produk<br><img src="https://i.ibb.co/C7LHD13/Screenshot-2023-11-25-at-00-03-54.png" alt="Image" width="700" height="342"><br><br>Menambah data produk baru<br><img src="https://i.ibb.co/SJccQ3m/Screenshot-2023-11-25-at-00-21-44.png" alt="Image" width="700" height="369"><br><br>Menghapus produk<br><img src="https://i.ibb.co/LQqZTwC/Screenshot-2023-11-25-at-00-04-38.png" alt="Image" width="700" height="342"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Melihat daftar barang</td>
    <td><center>Daftar barang yang dijual<br><img src="https://i.ibb.co/2q2yjSZ/Screenshot-2023-11-24-at-23-54-08.png" alt="Image" width="700" height="368"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Melakukan filter pencarian barang</td>
    <td><center>Daftar barang setelah di-filter<br><img src="https://i.ibb.co/6wkwb2t/Screenshot-2023-11-24-at-23-54-51.png" alt="Image" width="700" height="368"></td>
  </tr>
  <tr>
    <td><center><img src="https://media.istockphoto.com/id/496603666/vector/flat-icon-check.jpg?s=612x612&w=0&k=20&c=BMYf-7moOtevP8t46IjHHbxJ4x4I0ZoFReIp9ApXBqU=" alt="Image" width="100" height="100"></td>
    <td><center>Menambah barang ke dalam keranjang</td>
    <td><center>Menambah produk ke dalam keranjang <br><img src="https://i.ibb.co/gJJpdDd/Screenshot-2023-11-25-at-00-32-14.png" width="700" height="367"></td>
  </tr>
</tbody>
</table>


# Skema Database
<img src="https://utfs.io/f/71520cde-78a3-4ef2-ab9e-33bb1478a783-jyab13.png"  
     alt="Skema database bormi" />
