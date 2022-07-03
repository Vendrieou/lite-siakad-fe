import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useReactToPrint } from 'react-to-print'

const usePrintPdf = ({ documentTitle }) => {
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
    documentTitle,
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

  return {
    handlePrint,
    componentRef,
    text,
    loading
  }
  
}

export default usePrintPdf
