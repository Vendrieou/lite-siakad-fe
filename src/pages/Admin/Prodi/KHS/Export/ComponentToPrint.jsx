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
    width: 210
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
    width: 200
  },
  {
    title: 'NILAI (N)',
    dataIndex: 'nilai',
    key: 'nilai',
    align: 'center',
    width: 200
  },
  {
    title: '(K x N)',
    dataIndex: 'kxn',
    key: 'kxn',
    align: 'center',
    width: 200
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
            <th align="left" style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <img src={logoTIME} alt="logoTime" />
              </div>
              <div>

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
            <td align="left" style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              />
            </td>
          </tr>
          <br /><br />
          <tr>
            <td>
              <Title level={5} style={{ margin: 0 }}>Medan, {dateTimeToFull(new Date())}</Title>
              <Title level={5} style={{ margin: 0 }}>Dibuat oleh</Title>
              <Title level={5} style={{ margin: 0 }}>Ketua Program Studi</Title><br /><br /><br /><br /><br /><br />
              <Title level={5} style={{ margin: 0 }}>{`(${assignData.kaProdi})`}</Title>
            </td>
            <td>
              <Title level={5} style={{ margin: 0 }}>Diketahui oleh,</Title>
              <Title level={5} style={{ margin: 0 }}>Pembantu Ketua I</Title><br /><br /><br /><br /><br /><br />
              <Title level={5} style={{ margin: 0 }}>{`(${assignData.puket})`}</Title>
            </td>
          </tr>
        </table>
      </Card>
    )
  }
}

export default ComponentToPrint
