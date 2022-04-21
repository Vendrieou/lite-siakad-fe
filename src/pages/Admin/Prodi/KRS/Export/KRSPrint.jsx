import { useState, useRef, useEffect, useCallback } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Button } from 'antd'

import ComponentToPrint from './ComponentToPrint'

const KRSPrint = () => {
  const componentRef = useRef(null)

  const onBeforeGetContentResolve = useRef(null)

  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('old boring text')

  const handleAfterPrint = useCallback(() => {
    console.log('`onAfterPrint` called') // tslint:disable-line no-console
  }, [])

  const handleBeforePrint = useCallback(() => {
    console.log('`onBeforePrint` called') // tslint:disable-line no-console
  }, [])

  const handleOnBeforeGetContent = useCallback(() => {
    console.log('`onBeforeGetContent` called') // tslint:disable-line no-console
    setLoading(true)
    setText('Loading new text...')

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve

      setTimeout(() => {
        setLoading(false)
        setText('New, Updated Text!')
        resolve()
      }, 2000)
    })
  }, [setLoading, setText])

  const reactToPrintContent = useCallback(() => {
    return componentRef.current
  }, [componentRef.current])

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: 'AwesomeFileName',
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true
  })

  useEffect(() => {
    if (
      text === 'New, Updated Text!' &&
      typeof onBeforeGetContentResolve.current === 'function'
    ) {
      onBeforeGetContentResolve.current()
    }
  }, [onBeforeGetContentResolve.current, text])


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

  const PrintProps = {
    data,
    assignData,
    text
  }

  return (
    <div>
      {loading && <p className='indicator'>onBeforeGetContent: Loading...</p>}
      <Button type="danger" onClick={handlePrint}>
        Print
      </Button>
      <ComponentToPrint ref={componentRef} {...PrintProps} />
    </div>
  )
}

export default KRSPrint
