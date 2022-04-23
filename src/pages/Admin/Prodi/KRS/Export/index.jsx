import { Card, Button } from 'antd'
import ProForm, {
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-form'
import { useConcent } from 'concent'
import KRSPrint from './KRSPrint'

const MenuFilter = () => {
  const ProdiOption = [
    {
      value: 'TEKNIK INFORMATIKA',
      label: 'TEKNIK INFORMATIKA'
    },
    {
      value: 'SISTEM INFORMASI',
      label: 'SISTEM INFORMASI'
    }
  ]
  return (
    <Card>
      <ProForm
        layout="horizontal"
        onFinish={async () => {
          console.log('submit')
        }}
      >
        <ProFormSelect
          options={ProdiOption}
          width="md"
          name="prodi"
          label="Pilih Program Studi"
        />
        <ProFormText width="md" name="title" label="Cari Mahasiswa" placeholder="" rules={[{ required: true, message: 'Masukkan Nama Mahasiswa' }]} />
        <ProFormSelect
          options={[
            
          ]}
          width="md"
          name="semester"
          label="Pilih Kelas"
        />
        <ProFormSelect
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 5, label: 5 },
            { value: 6, label: 6 },
            { value: 7, label: 7 }
          ]}
          width="md"
          name="semester"
          label="Pilih Semester"
        />
      </ProForm>
    </Card>
  )
}

const Export = ({ isAjuKrs = true }) => {
  const { state } = useConcent('krsStore')
  const { list } = state
  return (
    <>
      <MenuFilter />
      <br />
      {isAjuKrs ?
        <Button type="primary" onClick={() => AjuKrs()}>Aju KRS</Button>
        : null}
      <br />
      <KRSPrint />

      {list && list.length > 0 ?
        <KRSPrint />
        : null}
    </>
  )
}

export default Export