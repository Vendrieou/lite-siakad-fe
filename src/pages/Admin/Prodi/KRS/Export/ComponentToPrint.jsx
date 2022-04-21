import { Typography, Table }  from 'antd'
import clsx from 'clsx'
import logoTIME from 'static/logo/bwLogoTime.png'
import styles from './ComponentToPrint.module.less'
import { dateTimeToFull } from 'utils/time'

const { Title, Paragraph } = Typography
const columns = [
  {
    title: 'Kode MK',
    dataIndex: 'kodeMK',
    key: 'name',
    width: 200,
  },
  {
    title: 'Mata Kuliah',
    dataIndex: 'matkul',
    key: 'name',
    width: 400,
  },
  {
    title: 'SKS',
    dataIndex: 'sks',
    key: 'name',
    width: 20,
  },
  {
    title: 'Semester',
    dataIndex: 'semester',
    key: 'name',
    width: 20,
  },
  {
    title: 'Kelas',
    dataIndex: 'kelas',
    key: 'name',
    width: 150,
  },
  {
    title: 'Nama Dosen',
    dataIndex: 'namaDosen',
    key: 'name',
    width: 600,
  },
];

const data = [
  {
    key: '1',
    kodeMK: 'TI 2639',
    matkul: 'PRAKTIKUM STATISTIKA',
    sks: 1,
    semester: 6,
    kelas: 'TI C 18',
    namaDosen: 'EMMA ROSINTA, S.SI, S.KOM, M.KOM',
  },
  {
    key: '2',
    kodeMK: 'TI 2639',
    matkul: 'PRAKTIKUM 3D MODELING',
    sks: 1,
    semester: 6,
    kelas: 'TI C 18',
    namaDosen: 'JOHANNES TERANG KITA PERANGIN ANGIN',
  },
]

const assignData = {
  kaProdi: 'Robert, M.KOM',
  name: 'VENDRIE YULMAN',
  nim: '1844017',
  kelas: 'TI C 18',
  tahunAjaran: '2021 - 2022',
  programStudi: 'TI',
  semester: '6',
  dosenWali: 'Didik Aryanto',
}

class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div>
        <div className={styles['group24566519768']}>
          <div className={styles['group24466519770']}>

          <span className={styles['text065']}>
              <Title level={5} style={{ margin: 0 }}>Nama : {assignData.name}</Title>
              <Title level={5} style={{ margin: 0 }}>NIM : {assignData.nim}</Title>
              <Title level={5} style={{ margin: 0 }}>Program Studi : {assignData.programStudi}</Title>
              <Title level={5} style={{ margin: 0 }}>Semester : {assignData.semester}</Title>
            </span>
            <Title level={5} style={{ margin: 0 }} className={styles['text073']}>Kelas : {assignData.kelas}</Title>
            <span className={styles['text074']}>
              <span>
                SEKOLAH TINGGI MANAJEMEN INFORMATIKA &amp; KOMPUTER - TIME
              </span>
              <br></br>
              <span>Jl. Merbabu No. 32 AA - BB. Telp 061 - 4561932, 4533676</span>
              <br></br>
              <Title>KARTU RENCANA STUDI</Title>
              <br></br>
              <span>TA. {assignData.tahunAjaran}</span>
            </span>
            <img
              src={logoTIME}
              alt="logoTime166519861"
              className={styles['image15']}
            />
            <Table dataSource={data} columns={columns} pagination={false} className={styles['groupTable']} />
          </div>
          <div className={styles['group24366519862']}>
            <span className={styles['text082']}>
              <span>Medan, {dateTimeToFull(new Date())}</span>
              <p>Mahasiswa</p>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span>{`(${assignData.name})`}</span>
            </span>
            <span className={styles['text104']}>
              <span>Disetujui</span>
              <p>Dosen Wali</p>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span>{`(${assignData.dosenWali})`}</span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
            </span>
            <span className={styles['text130']}>
              <span>Diketahui</span>
              <p>Ka. Prodi</p>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span></span>
              <br></br>
              <span>{`(${assignData.kaProdi})`}</span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default ComponentToPrint
