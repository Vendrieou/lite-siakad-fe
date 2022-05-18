// import React from 'react'
import usePrintPdf from 'components/hooks/usePrintPdf'
import { Button } from 'antd'
import { setIntervalTahunAjaran } from '@/utils/variable'
import ComponentToPrint from './ComponentToPrint'

const KRSPrint = ({ list, assign }) => {
  const {
    handlePrint,
    componentRef,
    text,
    loading
  } = usePrintPdf({ documentTitle: 'KRS' })

  const data = list && list.length > 0 ? list.map(item => {

    const dosenProfile = {
      gelarDepan: item.dosenProfile && item.dosenProfile.gelarDepan || '',
      nama: item.dosenProfile && item.dosenProfile.nama || '',
      gelarBelakang: item.dosenProfile && item.dosenProfile.gelarBelakang || ''
    }
    return ({
      ...item,
      namaDosen: `${dosenProfile.gelarDepan} ${dosenProfile.nama} ${dosenProfile.gelarBelakang}`
    })
  }) : []

  const assignList = {
    semester: list && list.length > 0 && list[0].semester,
    programStudi: list && list.length > 0 && list[0].jurusan && list[0].jurusan.nama,
  }
  
  // let currentSemester = 6
  // let inYear = 2022
  let currentSemester = assign.currentSemester
  let inYear = assign.tahunAngkatan
  let start = inYear + setIntervalTahunAjaran(currentSemester)
  let end = start + 1
  let tahunAjaran = `${start}-${end}`

  const assignData = {
    name: assign.nama || '',
    nim: assign.nim || '',
    kelas: assign.kelas || '',
    kaprodi: 'Robert, M.KOM',
    semester: assignList.semester,
    tahunAjaran: tahunAjaran || '',
    programStudi: assignList.programStudi,
    dosenWali: assign.dosenWali
  }

  console.log('assign', assign)
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

// const data = [
//   {
//     key: '1',
//     kodeMK: 'TI 2639',
//     matkul: 'PRAKTIKUM STATISTIKA',
//     sks: 1,
//     semester: 6,
//     kelas: 'TI C 18',
//     namaDosen: 'EMMA ROSINTA, S.SI, S.KOM, M.KOM'
//   },
//   {
//     key: '2',
//     kodeMK: 'TI 2639',
//     matkul: 'PRAKTIKUM 3D MODELING',
//     sks: 1,
//     semester: 6,
//     kelas: 'TI C 18',
//     namaDosen: 'JOHANNES TERANG KITA PERANGIN ANGIN'
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
//   dosenWali: 'Didik Aryanto'
// }