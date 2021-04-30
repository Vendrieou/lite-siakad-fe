import { message } from 'antd'
import 
ProForm,
{
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormDatePicker,
  ProFormDigit,
  ProFormCaptcha
} from '@ant-design/pro-form'
import { MailTwoTone } from '@ant-design/icons'

export const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

const FormContainer = () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values)
        message.success('Berhasil Registrasi')
      }}
      initialValues={{
        email: 'example@gmail.com',
        name: 'andi',
        jurusan: 'SI',
        jenisKelamin: 0,
        tempatLahir: 'Medan',
        // tanggalLahir: '',
        hp: '08127878789',
        alamat: 'jl listrik gg kontak no 10',
        waktuKuliah: 'PAGI',
        asalSekolah: 'SMA Swasta Cinta Kasih',
        captcha: 'KOTLE'
      }}
    >
      <ProFormText
        width="md"
        name="email"
        label="Email"
        tooltip="Masukkan email anda"
        placeholder="example@gmail.com"
      />
      <ProFormText
        width="md"
        name="name"
        label="name"
        tooltip="Masukkan nama anda"
        placeholder="Nama Lengkap Mahasiswa"
      />
      <ProFormSelect
        options={[
          {
            value: 'SI',
            label: 'SISTEM INFORMASI'
          },
          {
            value: 'TI',
            label: 'TEKNIK INFORMATIKA'
          }
        ]}
        width="md"
        placeholder="Pilih jurusan"
        name="jurusan"
        label="Jurusan"
      />
      <ProFormSelect
        options={[
          {
            value: 0,
            label: 'Perempuan'
          },
          {
            value: 1,
            label: 'Laki-laki'
          }
        ]}
        width="md"
        name="jenisKelamin"
        label="Jenis Kelamin"
      />
      <ProFormText
        width="md"
        name="tempatLahir"
        label="Tempat Lahir"
        tooltip="Masukkan tempat lahir anda"
        placeholder="Medan"
      />
      
      <ProFormDatePicker
        name="tanggalLahir"
        label="Tanggal Lahir" 
      />
      
      <ProFormDigit
        width="md"
        label="No. HP"
        name="hp"
        placeholder="0813111xxxxx"
        min={1}
        max={13}
      />
      <ProFormTextArea
        name="alamat"
        label="Alamat"
        placeholder="Masukkan alamat anda"
      />

      <ProFormSelect
        options={[
          {
            value: 'PAGI',
            label: 'PAGI'
          },
          {
            value: 'SORE',
            label: 'SORE'
          }
        ]}
        width="md"
        name="waktuKuliah"
        label="Waktu Kuliah"
      />
      <ProFormText
        width="md"
        name="asalSekolah"
        label="Asal Sekolah"
        tooltip="Masukkan asal sekolah anda"
      />
      <ProFormCaptcha
        fieldProps={{
          size: 'large',
          prefix: <MailTwoTone />
        }}
        captchaProps={{
          size: 'large'
        }}
        // The name of the phone number, which is injected by onGetCaptcha
        phoneName="phone"
        name="captcha"
        rules={[
          {
            required: true,
            message: 'Please enter the verification code'
          }
        ]}
        placeholder="Please enter a captcha"
        // If you need to fail, you can throw an error and onGetCaptcha will stop automatically
        // throw new Error("Error getting captcha")
        onGetCaptcha={async (phone) => {
          await waitTime(1000)
          message.success(`phone number ${phone} Verification code sent successfully! `)
        }}
      />
    </ProForm>
  )
}

export default FormContainer