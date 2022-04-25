import React from 'react'
import usePrintPdf from 'components/hooks/usePrintPdf'
import { Button } from 'antd'

import ComponentToPrint from './ComponentToPrint'

const KRSPrint = () => {
  const { 
    handlePrint,
    componentRef,
    text,
    loading
  } = usePrintPdf({ documentTitle: 'KRS' })

  const data = [
    {
      key: '1',
      kodeMK: 'TI 2639',
      matkul: 'PRAKTIKUM STATISTIKA',
      sks: 1,
      semester: 6,
      kelas: 'TI C 18',
      namaDosen: 'EMMA ROSINTA, S.SI, S.KOM, M.KOM',
      tempatLahir: 'Medan',
      tanggalLahir: new Date(),
      kxn: 2,
      nilai: 'A',
      kredit: 3,
      keterangan: 'LULUS'
    },
    {
      key: '2',
      kodeMK: 'TI 2639',
      matkul: 'PRAKTIKUM 3D MODELING',
      sks: 1,
      semester: 6,
      kelas: 'TI C 18',
      namaDosen: 'JOHANNES TERANG KITA PERANGIN ANGIN',
    
      kxn: 2,
      nilai: 'A',
      kredit: 3,
      keterangan: 'LULUS'
    },
    {
      key: '3',
      kodeMK: 'TI 2639',
      matkul: 'PRAKTIKUM SISTEM INFORMASI GEOGRAFIS	',
      sks: 1,
      semester: 6,
      kelas: 'TI C 18',
      namaDosen: 'JOHANNES TERANG KITA PERANGIN ANGIN',
      kxn: 2,
      nilai: 'A',
      kredit: 3,
      keterangan: 'LULUS'
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
    dosenWali: 'Didik Aryanto',
    puket: 'HENDRI, S.KOM, M.KOM',
    tempatLahir: 'Medan',
    tanggalLahir: new Date()
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
