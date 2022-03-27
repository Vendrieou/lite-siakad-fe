import { useState } from 'react'
import { Modal, message } from 'antd'
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDatePicker
} from '@ant-design/pro-form'
import { FooterToolbar } from '@ant-design/pro-layout'
import styles from './FormEdit.module.less'

const FormEdit = ({
  setRow,
  row
}) => {
  const [modalVerification, setModalVerification] = useState(false)

  const editMahasiswa = (data) => {
    message.success(`Berhasil edit mahasiswa ${data}`)
  }

  const onSave = (data) => {
    editMahasiswa(data)
    setModalVerification(false)
    setRow(undefined)
  }

  const initialValues = {
    // BAG 1
    tanggalPendaftaran: row?.tanggalPendaftaran,
    kodeProgramStudi: row?.kodeProgramStudi,
    noIjazah: row?.noIjazah,
    // image: row?.image,
    nama: row?.nama,
    NIM: row?.NIM,
    tempat: row?.tempat,
    tglLahir: row?.tglLahir,
    jenisKelamin: row?.jenisKelamin,
    golDarah: row?.golDarah,
    agama: row?.agama,
    statusNikah: row?.statusNikah,
    kewarganegaraan: row?.kewarganegaraan,
    alamatMahasiswa: row?.alamatMahasiswa,
    kodePos: row?.kodePos,
    noTelp: row?.noTelp,
    noHp: row?.noHp,
    hobi: row?.hobi,
    jumlahSaudara: row?.jumlahSaudara,
    // BAG 2
    namaBapak: row?.namaBapak,
    namaIbu: row?.namaIbu,
    pekerjaanOrgTua: row?.pekerjaanOrgTua,
    alamatOrgTua: row?.alamatOrgTua,
    noTelpOrgTua: row?.noTelpOrgTua,
    noHpOrgTua: row?.noHpOrgTua,
    pendidikanOrgTua: row?.pendidikanOrgTua,
    // BAG 3
    asalSekolah: row?.asalSekolah,
    jurusan: row?.jurusan,
    alamat: row?.alamat,
    kodePosSekolah: row?.kodePosSekolah || 22221,
    kota: row?.kota || 'medan',
    provinsi: row?.provinsi || 'Sumut',
    tahunLulus: row?.tahunLulus || 2018,
    noSTTB: row?.noSTTB || 899999,
    tglSTTB: row?.tglSTTB || Date.now(),
    // BAG 4
    biayaKuliah: row?.biayaKuliah || 100,
    diskon: row?.diskon || 100,
    pembayaranCicilan: row?.pembayaranCicilan || 1,
    uangPendaftaran: row?.uangPendaftaran || 1000000,
    biayaLain: row?.biayaLain || 0
  }

  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification}
        onCancel={() => setModalVerification(false)}
        onOk={() => onSave(row?.namaMahasiswa)}
      >
        <p>{`Anda akan menyimpan data ${row?.namaMahasiswa}`}</p>
      </Modal>
      <ProForm
        style={{ display: 'flex' }}
        onFinish={async (values) => {
          console.log(values)
          message.success('success')
        }}
        initialValues={initialValues}
        params={{}}
        submitter={{
          render: (_, dom) => <FooterToolbar style={{ width: '100%' }}>{dom}</FooterToolbar>
        }}
      >
        <div className={styles.container}>
          <div>
            <div>
              <ProFormSelect
                options={[
                  { value: 'teknologiInformasi', label: 'TEKNOLOGI INFORMASI (TI)' },
                  { value: 'sistemInformasi', label: 'SISTEM INFORMASI (SI)' }
                ]}
                width="sm"
                name="prodi"
                label="PROGRAM STUDI"
                placeholder="Pilih prodi"
              />
              <ProFormText width="md" name="tahunAkademik" label="TAHUN AKADEMIK" placeholder="Masukkan tahun" />
            </div>
            <h3>BAG 1</h3>
            <ProFormText width="md" name="nama" label="NAMA LENGKAP" placeholder="Masukkan nama" />
            <ProFormText width="md" name="NIM" label="NIM" placeholder="Masukkan NIM" />
            <ProFormText width="md" name="tempat" label="TEMPAT" placeholder="Masukkan tempat" />

            <ProFormDatePicker width="md" name="tanggalPendaftaran" label="TANGGAL PENDAFTARAN " placeholder="Masukkan tgl. pendaftaran" />
            <ProFormText width="md" name="kodeProgramStudi" label="KODE PROGRAM STUDI" placeholder="Masukkan no. kode program studi" />
            <ProFormText width="md" name="noIjazah" label="NO IJAZAH" placeholder="Masukkan no. Ijazah" />
            {/* <img src={image && image.url} alt="image" width="200" height="200"/> */}
            
            <ProFormDatePicker width="md" name="tglLahir" label="TANGGAL" placeholder="Masukkan tgl. lahir" />
            <ProFormSelect
              options={[
                { value: 'female', label: 'Perempuan' },
                { value: 'male', label: 'Laki-laki' }
              ]}
              width="sm"
              name="jenisKelamin"
              label="JENIS KELAMIN"
              placeholder="Masukkan jenis kelamin"
            />
            <ProFormText width="md" name="golDarah" label="GOLONGAN DARAH" placeholder="Masukkan gol. darah" />
            <ProFormSelect
              options={[
                { value: 'buddha', label: 'Buddha' },
                { value: 'kristenProtestan', label: 'Kristen Protestan' },
                { value: 'katolik', label: 'Katolik' },
                { value: 'islam', label: 'Islam' },
                { value: 'hindu', label: 'Hindu' },
                { value: 'kongHuCu', label: 'Kong Hu Cu' }
              ]}
              width="sm"
              name="agama"
              label="AGAMA"
              placeholder="Masukkan agama"
            />
            <ProFormSelect
              options={[
                { value: 'belumKawin', label: 'Belum Kawin' },
                { value: 'kawin', label: 'Kawin' },
                { value: 'duda', label: 'Duda' },
                { value: 'janda', label: 'Janda' }
              ]}
              width="sm"
              name="statusNikah"
              label="STATUS"
              placeholder="Masukkan status nikah"
            />
            <ProFormText width="md" name="kewarganegaraan" label="KEWARGANEGARAAN" placeholder="Masukkan kewarganegaraan" />
            <ProFormTextArea width="md" name="alamatMahasiswa" label="ALAMAT MAHASISWA" placeholder="Masukkan alamat mahasiswa" />
            <ProFormText width="md" name="kodePos" label="KODE POS" placeholder="Masukkan kode pos" />
            <ProFormText width="md" name="noTelp" label="NO. TELEPON" placeholder="Masukkan noTelp" />
            <ProFormText width="md" name="noHp" label="NO. HP" placeholder="Masukkan noHp" />
            <ProFormText width="md" name="hobi" label="HOBI" placeholder="Masukkan hobi" />
            <ProFormText width="md" name="jumlahSaudara" label="JUMLAH SAUDARA" placeholder="Masukkan jumlah saudara" />
          </div>
          <div>
            <h3>BAG 2</h3>
            <ProFormText width="md" name="namaBapak" label="NAMA BAPAK" placeholder="Masukkan nama bapak" />
            <ProFormText width="md" name="namaIbu" label="NAMA IBU" placeholder="Masukkan nama ibu" />
            <ProFormText width="md" name="pekerjaanOrgTua" label="PEKERJAAN ORANG TUA" placeholder="Masukkan pekerjaan" />
            <ProFormTextArea width="md" name="alamatOrgTua" label="ALAMAT ORANG TUA" placeholder="jl." />
            <ProFormText width="md" name="noTelpOrgTua" label="NO. TELEPON" placeholder="Masukkan no. telp" />
            <ProFormText width="md" name="noHpOrgTua" label="NO. HP" placeholder="Masukkan no. hp" />
            <ProFormText width="md" name="pendidikanOrgTua" label="PENDIDIKAN ORANG TUA" placeholder="SD/SMP/SMA/S1/S2" />
          </div>
          <div>
            <h3>BAG 3</h3>
            <ProFormText width="md" name="asalSekolah" label="ASAL SMU/SMK/STM" placeholder="Masukkan SMU/SMK/STM" />
            <ProFormText width="md" name="jurusan" label="JURUSAN" placeholder="Masukkan jurusan" />
            <ProFormTextArea width="md" name="alamat" label="ALAMAT SMU/SMK/STM" placeholder="Masukkan" />
            <ProFormText width="md" name="kodePosSekolah" label="KODE POS" placeholder="Masukkan" />
            <ProFormText width="md" name="kota" label="KOTA/KABUPATEN" placeholder="Masukkan" />
            <ProFormText width="md" name="provinsi" label="PROVINSI" placeholder="Masukkan" />
            <ProFormText width="md" name="tahunLulus" label="TAHUN LULUS" placeholder="Masukkan" />
            <ProFormText width="md" name="noSTTB" label="NO. STTB / IJAZAH" placeholder="Masukkan" />
            <ProFormText width="md" name="tglSTTB" label="TANGGAL STTB / IJAZAH" placeholder="Masukkan" />
          </div>
          <div>
            <h3>BAG 4</h3>
            <ProFormText width="md" name="biayaKuliah" label="BIAYA KULIAH PER TAHUN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
            <ProFormText width="md" name="diskon" label="DISKON" fieldProps={{ suffix: "%" }} placeholder="" disabled />
            <ol className={styles.m}>
              <li>
                <ProFormText width="md" name="pembayaranCicilan" label="PEMBAYARAN CICILAN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
              </li>
              <li>
                <ProFormText width="md" name="uangPendaftaran" label="UANG PENDAFTARAN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
              </li>
              <li>
                <ProFormText width="md" name="biayaLain" label="BIAYA LAIN-LAIN" fieldProps={{ prefix: "Rp" }} placeholder="" disabled />
              </li>
            </ol>
          </div>

        </div>
      </ProForm>
    </>
  )
}

export default FormEdit
