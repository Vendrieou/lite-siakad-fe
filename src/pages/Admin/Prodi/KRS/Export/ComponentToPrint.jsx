import { Typography, Table, Card} from 'antd'
import logoTIME from 'static/logo/bwLogoTIME.png'
import { dateTimeToFull } from 'utils/time'

const { Title } = Typography
const columns = [
  {
    title: 'Kode MK',
    dataIndex: 'kodeMK',
    key: 'name',
    width: 200
  },
  {
    title: 'Mata Kuliah',
    dataIndex: 'matkul',
    key: 'name',
    width: 400
  },
  {
    title: 'SKS',
    dataIndex: 'sks',
    key: 'name',
    width: 20
  },
  {
    title: 'Semester',
    dataIndex: 'semester',
    key: 'name',
    width: 20
  },
  {
    title: 'Kelas',
    dataIndex: 'kelas',
    key: 'name',
    width: 150
  },
  {
    title: 'Nama Dosen',
    dataIndex: 'namaDosen',
    key: 'name',
    width: 600
  }
]

const data = [
  {
    key: '1',
    kodeMK: 'TI 2639',
    matkul: 'PRAKTIKUM STATISTIKA',
    sks: 1,
    semester: 6,
    kelas: 'TI C 18',
    namaDosen: 'EMMA ROSINTA, S.SI, S.KOM, M.KOM'
  },
  {
    key: '2',
    kodeMK: 'TI 2639',
    matkul: 'PRAKTIKUM 3D MODELING',
    sks: 1,
    semester: 6,
    kelas: 'TI C 18',
    namaDosen: 'JOHANNES TERANG KITA PERANGIN ANGIN'
  }
]

const assignData = {
  kaProdi: 'Robert, M.KOM',
  name: 'VENDRIE YULMAN',
  nim: '1844017',
  kelas: 'TI C 18',
  tahunAjaran: '2021 - 2022',
  programStudi: 'TI',
  semester: '6',
  dosenWali: 'Didik Aryanto'
}

class ComponentToPrint extends React.PureComponent {
  render () {
    return (
      <Card>
        <table>
          <tr>
            <th align="left">
              <img src={logoTIME} alt="logoTime" />
            </th>
            <th width={1000} align="center">
              <span>
                SEKOLAH TINGGI MANAJEMEN INFORMATIKA &amp; KOMPUTER - TIME
              </span>
              <br />
              <span>Jl. Merbabu No. 32 AA - BB. Telp 061 - 4561932, 4533676</span>
              <br /><br />
              <Title>KARTU RENCANA STUDI</Title>
              <br />
              <span>TA. {assignData.tahunAjaran}</span>
            </th>
            <th />
          </tr>
          <br /><br />
          <tr>
            <td colSpan={2}>
              <Title level={5} style={{ margin: 0 }}>Nama : {assignData.name}</Title>
              <Title level={5} style={{ margin: 0 }}>NIM : {assignData.nim}</Title>
              <Title level={5} style={{ margin: 0 }}>Program Studi : {assignData.programStudi}</Title>
              <Title level={5} style={{ margin: 0 }}>Semester : {assignData.semester}</Title>
            </td>
            <td align="right">
              <Title level={5} style={{ marginRight: '2em' }}>Kelas : {assignData.kelas}</Title>
            </td>
          </tr>
          <br /><br />
          <tr>
            <td colSpan={3}>
              <Table dataSource={data} columns={columns} pagination={false} />
            </td>
          </tr>
          <br /><br />
          <tr>
            <td width="400px" align="center">
              <Title level={5} style={{ margin: 0 }}>Diketahui</Title>
              <Title level={5} style={{ margin: 0 }}>Ka. Prodi</Title><br /><br /><br /><br /><br /><br />
              <Title level={5} style={{ margin: 0 }}>{`(${assignData.kaProdi})`}</Title>
            </td>
            <td align="center">
              <Title level={5} style={{ margin: 0 }}>Disetujui</Title>
              <Title level={5} style={{ margin: 0 }}>Dosen Wali</Title><br /><br /><br /><br /><br /><br />
              <Title level={5} style={{ margin: 0 }}>{`(${assignData.dosenWali})`}</Title>
            </td>
            <td width="400px" align="center">
              <Title level={5} style={{ margin: 0 }}>Medan, {dateTimeToFull(new Date())}</Title>
              <Title level={5} style={{ margin: 0 }}>Mahasiswa</Title><br /><br /><br /><br /><br /><br />
              <Title level={5} style={{ margin: 0 }}>{`(${assignData.name})`}</Title>
            </td>
          </tr>
        </table>
      </Card>
    )
  }
}

export default ComponentToPrint
