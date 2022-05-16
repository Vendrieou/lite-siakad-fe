import { useState } from 'react'
import Excel from 'exceljs'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const UploadExcel = () => {
  const [file, setFile] = useState(false)
  const onSetFile = async (file) => {
    console.log('file', file)
    const workbook = new Excel.Workbook()
    const reader = new FileReader()
    if (file) {
      console.log('reader', reader)
      reader.readAsArrayBuffer(file)
    }

    // reader.onload = () => {
    //   const buffer = reader.result;
    //   wb.xlsx.load(buffer).then(workbook => {
    //     console.log(workbook, 'workbook instance')
    //     workbook.eachSheet((sheet, id) => {
    //       sheet.eachRow((row, rowIndex) => {
    //         console.log(row.values, rowIndex)
    //       })
    //     })
    //   })
    // }
    const worksheet = await workbook.csv.read(reader).then(workbook => {
      console.log(workbook, 'workbook instance')
      workbook.eachSheet((sheet, id) => {
        sheet.eachRow((row, rowIndex) => {
          // console.log('log:', row.values, rowIndex)
          return { row, rowIndex }
        })
      })
    })
    console.log('reader', reader)
    console.log('worksheet', worksheet)
  }
  const listMataKuliah = []
  // group by semester
  // display item of matkul in listview
  // return 'p'
  const props = {
    name: 'file',
    multiple: false,
    accept: '.csv',
    onChange(info) {
      console.log('info: ', info)
      console.log('info state', info.file)
      if (info && info.file) {
        info.file.status = 'done'
      }
      onSetFile(info.file.originFileObj)
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer)
      // onSetFile(e.dataTransfer.files)
      setFile(true)
    },
  }

  return (
    <>
      {file ?
        <>
          {/* {listMataKuliah && listMataKuliah.length > 0 ? ( ) : []} */}
          <p>list</p>
          <Button type="primary" onClick={() => setFile(false)}>re-upload</Button>
        </>
        : (
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        )}
    </>
  )
}

export default UploadExcel
