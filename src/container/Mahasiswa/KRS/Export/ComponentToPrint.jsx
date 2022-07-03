// import React from 'react'
import { Typography, Table, Card } from 'antd'
import logoTIME from 'static/logo/bwLogoTIME.png'
import { dateTimeToFull } from 'utils/time'

const { Title } = Typography
const columns = [
  {
    title: 'Kode MK',
    dataIndex: 'kodeMatkul',
    key: 'kodeMatkul',
    width: 350
  },
  {
    title: 'Mata Kuliah',
    dataIndex: 'matkul',
    key: 'matkul',
    width: 600
  },
  {
    title: 'SKS',
    dataIndex: 'sks',
    key: 'sks',
    align: 'center'
  },
  {
    title: 'Semester',
    dataIndex: 'semester',
    key: 'semester',
    align: 'center'
  },
  {
    title: 'Kelas',
    dataIndex: 'kelas',
    key: 'kelas',
    width: 250
  },
  {
    title: 'Nama Dosen',
    dataIndex: 'namaDosen',
    key: 'namaDosen',
    width: 1200
  }
]

class ComponentToPrint extends React.PureComponent {
  render () {
    const {
      data,
      assignData
    } = this.props
    return (
      <Card>
        <table>
          <tr>
            <th align="left" style={{ display: 'grid', 'grid-template-columns': '50px 1fr', 'grid-template-rows': '1fr' }}>
              <div>
                <img src={logoTIME} alt="logoTime" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <span>
                  SEKOLAH TINGGI MANAJEMEN INFORMATIKA &amp; KOMPUTER - TIME
                </span>
                <br />
                <span>Jl. Merbabu No. 32 AA - BB. Telp 061 - 4561932, 4533676</span>
                <br /><br />
                <Title>KARTU RENCANA STUDI</Title>
                <span>TA. {assignData.tahunAjaran}</span>
              </div>
            </th>
          </tr>
          <tr>
            <td style={{ display: 'grid', 'grid-template-columns': '3fr 1fr', 'grid-template-rows': '1fr' }}>
              <div>
                <Title level={5} style={{ margin: 0 }}>Nama : {assignData.name}</Title>
                <Title level={5} style={{ margin: 0 }}>NIM : {assignData.nim}</Title>
                <Title level={5} style={{ margin: 0 }}>Program Studi : {assignData.programStudi}</Title>
                <Title level={5} style={{ margin: 0 }}>Semester : {assignData.semester}</Title>
              </div>
              <div style={{ 'align-self': 'end' }}>
                <Title level={5} style={{ textAlign: 'end' }}>Kelas : {assignData.kelas}</Title>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <Table dataSource={data} columns={columns} pagination={false} size="small" />
            </td>
          </tr>
          <br /><br /><br /><br /><br /><br />
          <tr>
            <td style={{ display: 'grid', 'grid-template-columns': 'repeat(3, 1fr)', 'grid-template-rows': '1fr', textAlign: 'center' }}>
              <div>
                <Title level={5} style={{ margin: 0 }}>Diketahui</Title>
                <Title level={5} style={{ margin: 0 }}>Ka. Prodi</Title><br /><br /><br /><br /><br /><br />
                <Title level={5} style={{ margin: 0 }}>{`(${assignData.kaprodi})`}</Title>
              </div>
              <div>
                <Title level={5} style={{ margin: 0 }}>Disetujui</Title>
                <Title level={5} style={{ margin: 0 }}>Dosen Wali</Title><br /><br /><br /><br /><br /><br />
                <Title level={5} style={{ margin: 0 }}>{`(${assignData.dosenWali})`}</Title>
              </div>
              <div>
                <Title level={5} style={{ margin: 0 }}>Medan, {dateTimeToFull(new Date())}</Title>
                <Title level={5} style={{ margin: 0 }}>Mahasiswa</Title><br /><br /><br /><br /><br /><br />
                <Title level={5} style={{ margin: 0 }}>{`(${assignData.name})`}</Title>
              </div>
            </td>
          </tr>
        </table>
      </Card>
    )
  }
}

export default ComponentToPrint
