// import React from 'react'
import usePrintPdf from 'components/hooks/usePrintPdf'
import { Button } from 'antd'

import { setTahunAjaran, setBobotNilai } from 'utils/variable'
import ComponentToPrint from './ComponentToPrint'

const KRSPrint = ({ list, assign }) => {
  const {
    handlePrint,
    componentRef,
    text,
    loading
  } = usePrintPdf({ documentTitle: 'KHS' })

  const data = list && list.length > 0 ? list.map(item => {

    return ({
      ...item,
      key: item.key,
      kodeMatkul: item.kodeMatkul,
      matkul: item.matkul,
      semester: item.semester,
      kelas: item.kelas,
      namaDosen: item.namaDosen,
      nilai: item.nilai,
      sks: item.sks,
      kxn: setBobotNilai(item.nilai) * item.sks,
      status: item.status
    })
  }) : []

  const assignList = {
    semester: list && list.length > 0 && list[0].semester
  }

  const assignData = {
    name: assign.nama || '',
    nim: assign.nim || '',
    kelas: assign.kelas || '',
    kaprodi: assign.kaprodi || '',
    semester: assignList.semester,
    tahunAjaran: setTahunAjaran(assign),
    programStudi: assign.programStudi || '',
    dosenWali: assign.dosenWali,
    puket: assign.puket || 'HENDRI, S.KOM, M.KOM',
    tempatLahir: assign.tempatLahir || '',
    tanggalLahir: assign.tanggalLahir || ''
  }

  const PrintProps = {
    data,
    assignData,
    text
  }

  return (
    <div>
      {loading && <p className='indicator'>Loading...</p>}
      <Button type="danger" onClick={handlePrint}>
        Print
      </Button>
      <ComponentToPrint ref={componentRef} {...PrintProps} />
    </div>
  )
}

export default KRSPrint

// const dataOld = [
//   {
//     key: '1',
//     kodeMatkul: 'TI 2639',
//     matkul: 'PRAKTIKUM STATISTIKA',
//     semester: 6,
//     kelas: 'TI C 18',
//     namaDosen: 'EMMA ROSINTA, S.SI, S.KOM, M.KOM',
//     tempatLahir: 'Medan',
//     tanggalLahir: new Date(),
//     kxn: setBobotNilai('A') * 3,
//     nilai: 'A',
//     sks: 3,
//     status: 'LULUS'
//   },
//   {
//     key: '2',
//     kodeMatkul: 'TI 2639',
//     matkul: 'PRAKTIKUM 3D MODELING',
//     semester: 6,
//     kelas: 'TI C 18',
//     namaDosen: 'JOHANNES TERANG KITA PERANGIN ANGIN',
//     kxn: 2,
//     nilai: 'A',
//     sks: 3,
//     status: 'LULUS'
//   },
//   {
//     key: '3',
//     kodeMatkul: 'TI 2639',
//     matkul: 'PRAKTIKUM SISTEM INFORMASI GEOGRAFIS	',
//     semester: 6,
//     kelas: 'TI C 18',
//     namaDosen: 'JOHANNES TERANG KITA PERANGIN ANGIN',
//     kxn: 2,
//     nilai: 'A',
//     sks: 3,
//     status: 'LULUS'
//   }
// ]
// const assignData = {
//   kaprodi: 'Robert, M.KOM',
//   name: 'VENDRIE YULMAN',
//   nim: '1844017',
//   kelas: 'TI C 18',
//   tahunAjaran: '2021 - 2022',
//   programStudi: 'TI',
//   semester: '6',
//   dosenWali: 'Didik Aryanto',
//   puket: 'HENDRI, S.KOM, M.KOM',
//   tempatLahir: 'Medan',
//   tanggalLahir: new Date()
// }
