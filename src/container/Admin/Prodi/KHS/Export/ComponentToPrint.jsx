// import React from 'react'
import { Typography, Table, Card } from 'antd'
import logoTIME from 'static/logo/bwLogoTIME.png'
import { dateTimeToFull } from 'utils/time'
import { Capitalize } from 'utils/string'

const { Title, Text } = Typography
const columns = [
  {
    title: 'Kode MK',
    dataIndex: 'kodeMK',
    key: 'kodeMk',
    width: 350
  },
  {
    title: 'Mata Kuliah',
    dataIndex: 'matkul',
    key: 'matkul',
    width: 2000
  },
  {
    title: 'KREDIT (K)',
    dataIndex: 'kredit',
    key: 'kredit',
    align: 'center',
    width: 400
  },
  {
    title: 'NILAI (N)',
    dataIndex: 'nilai',
    key: 'nilai',
    align: 'center',
    width: 400
  },
  {
    title: '(K x N)',
    dataIndex: 'kxn',
    key: 'kxn',
    align: 'center',
    width: 400
  },
  {
    title: 'KETERANGAN',
    dataIndex: 'keterangam',
    key: 'keterangam',
    width: 600
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
                <Title>KARTU HASIL STUDI</Title>
                <br />
              </div>
            </th>
          </tr>
          <tr>
            <td style={{ display: 'grid', 'grid-template-columns': '1.5fr 1fr', 'grid-template-rows': '1fr' }}>
              <div>
                <Title level={5} style={{ margin: 0 }}>NIM : {assignData.nim}</Title>
                <Title level={5} style={{ margin: 0 }}>NAMA : {assignData.name}</Title>
                <Title level={5} style={{ margin: 0 }}>{`TEMPAT/TGL.LAHIR : ${Capitalize(assignData.tempatLahir)} / ${dateTimeToFull(assignData.tanggalLahir)}`}</Title>
                <Title level={5} style={{ margin: 0 }}>KELAS : {assignData.kelas}</Title>
              </div>
              <div>
                <Title level={5} style={{ margin: 0 }}>TAHUN AJARAN : {assignData.tahunAjaran}</Title>
                <Title level={5} style={{ margin: 0 }}>PROGRAM STUDI : {assignData.programStudi}</Title>
                <Title level={5} style={{ margin: 0 }}>SEMESTER : {assignData.semester}</Title>
                <Title level={5} style={{ margin: 0 }}>DOSEN WALI : {assignData.dosenWali}</Title>
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                size="small"
                summary={(currentData) => (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} />
                    <Table.Summary.Cell index={1} />
                    <Table.Summary.Cell index={2} align="center">
                      <Text className="jumlahKredit">{currentData.map(item => item.kredit).reduce((prev, curr) => prev + curr, 0)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} />
                    <Table.Summary.Cell index={4} align="center">
                      <Text className="jumlahKxn">{currentData.map(item => item.kxn).reduce((prev, curr) => prev + curr, 0)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
                footer={(currentData) => {
                  let jumlahKxn = currentData.map(item => item.kredit).reduce((prev, curr) => prev + curr, 0)
                  let jumlahKredit = currentData.map(item => item.kxn).reduce((prev, curr) => prev + curr, 0)
                  let ipValue = jumlahKxn / jumlahKredit
                  return (
                    <Text className="IP">{`IP: ${ipValue.toFixed(2)}`}</Text>
                  )
                }}
              />
            </td>
          </tr>
          <br /><br />
          <tr>
            <td style={{ display: 'grid', 'grid-template-columns': '2fr 1fr', 'grid-template-rows': '1fr' }}>
              <div>
                <Title level={5} style={{ margin: 0 }}>Medan, {dateTimeToFull(new Date())}</Title>
                <Title level={5} style={{ margin: 0 }}>Dibuat oleh</Title>
                <Title level={5} style={{ margin: 0 }}>Ketua Program Studi</Title><br /><br /><br /><br /><br /><br />
                <Title level={5} style={{ margin: 0 }}>{`(${assignData.kaProdi})`}</Title>
              </div>
              <div>
                <br />
                <Title level={5} style={{ margin: 0 }}>Diketahui oleh,</Title>
                <Title level={5} style={{ margin: 0 }}>Pembantu Ketua I</Title><br /><br /><br /><br /><br /><br />
                <Title level={5} style={{ margin: 0 }}>{`(${assignData.puket})`}</Title>
              </div>
            </td>
          </tr>
        </table>
      </Card>
    )
  }
}

export default ComponentToPrint
