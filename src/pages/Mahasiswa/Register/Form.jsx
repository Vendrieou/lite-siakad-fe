import React from 'react'
import { message, Button, ConfigProvider } from 'antd'
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
import enUSIntl from 'antd/lib/locale/en_US'

export const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

const FormContainer = () => {
  return (
    <ConfigProvider locale={enUSIntl}>
      <ProForm
        submitter={{
          searchConfig: {
            resetText: 'reset',
            submitText: 'submit'
          },
          render: (props) => {
            return [
              <Button key="reset" onClick={() => props.form.resetFields()}>
                Reset
              </Button>,
              <Button type="primary" key="submit" onClick={() => props.form.submit()}>
                Submit
              </Button>
            ]
          }
        }}
        onFinish={async (values) => {
          console.log(values)
          message.success('Berhasil Registrasi')
        }}
        initialValues={{
          //   email: 'example@gmail.com',
          //   name: 'andi',
          //   jurusan: 'SI',
          jenisKelamin: 0
          //   tempatLahir: 'Medan',
          //   // tanggalLahir: '',
          //   // hp: '',
          //   alamat: 'jl listrik gg kontak no 10',
          //   waktuKuliah: 'PAGI',
          //   asalSekolah: 'SMA Swasta Cinta Kasih',
          //   captcha: 'KOTLE'
        }}
      >
        <ProFormText
          width="md"
          name="email"
          label="Email"
          tooltip="Masukkan email anda"
          placeholder="example@gmail.com"
          rules={[{ required: true, message: 'Masukkan email anda' }]}
        />
        <ProFormText
          width="md"
          name="Nama"
          label="name"
          tooltip="Masukkan nama anda"
          placeholder="Nama Lengkap Mahasiswa"
          rules={[{ required: true, message: 'Masukkan nama anda' }]}
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
          rules={[{ required: true, message: 'Pilih Jurusan' }]}
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
          placeholder=""
          rules={[{ required: true, message: 'Pilih Jenis Kelamin' }]}
        />
        <ProFormText
          width="md"
          name="tempatLahir"
          label="Tempat Lahir"
          tooltip="Masukkan tempat lahir anda"
          placeholder="Medan"
          rules={[{ required: true, message: 'Masukkan tempat lahir anda' }]}
        />

        <ProFormDatePicker
          name="tanggalLahir"
          label="Tanggal Lahir"
          placeholder={`${new Date().getFullYear()}-0${new Date().getMonth()}-0${new Date().getDay()}`}
          rules={[{ required: true, message: 'Masukkan Tanggal Lahir' }]}
        />

        <ProFormDigit
          width="md"
          label="No. HP"
          name="hp"
          placeholder="0813111xxxxx"
          min={1}
          max={13}
          rules={[{ required: true, message: 'Masukkan no HP anda' }]}
        />
        <ProFormTextArea
          name="alamat"
          label="Alamat"
          placeholder="Masukkan alamat anda"
          rules={[{ required: true, message: 'Masukkan alamat anda' }]}
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
          placeholder="Pilih Waktu Kuliah"
          rules={[{ required: true, message: 'Pilih Waktu Kuliah' }]}
        />
        <ProFormText
          width="md"
          name="asalSekolah"
          label="Asal Sekolah"
          placeholder="Sekolah"
          tooltip="Masukkan asal sekolah anda"
          rules={[{ required: true, message: 'Masukkan asal sekolah anda' }]}
        />
        <ProFormCaptcha
          captchaProps={{
            size: 'middle'
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
    </ConfigProvider>
  )
}

export default FormContainer