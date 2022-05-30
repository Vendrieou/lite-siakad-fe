// import React, { useState } from 'react'
import { useState, useEffect } from 'react'
import { Modal, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import csv from 'csvtojson'
const FormCreate = ({
  onCreate,
  currentItem
}) => {
  // const [formValue, setFormValue] = useState({
  //   idDosen: null
  // })
  const [csvData, setCsvData] = useState('')
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  // const { state, mr } = useConcent('nilaiStore')
  useEffect(() => {
    Array.prototype.extend = function (other_array) {
      /* You should include a test to check whether other_array really is an array */
      other_array.forEach(function (v) { this.push(v) }, this);
    }
  }, [])

  const handleSubmit = async () => {
    let arr = [];
    let normalCsv = csvData.replace(/;/g, ',')
    arr = await csv()
      .fromString(normalCsv)
      .then((res) => {
        return res
      });

    let newArrUTS = arr
      .filter((filtered) => filtered.uts)
      .map((item) => {
        return {
          nim: item.nim,
          value: item.uts,
          type: "uts"
        }
      })

    let newArrUAS = arr
      .filter((filtered) => filtered.uas)
      .map((item) => {
        return {
          nim: item.nim,
          value: item.uas,
          type: "uas"
        }
      })

    let newArrTugas = arr
      .filter((filtered) => filtered.tugas)
      .map((item) => {
        return {
          nim: item.nim,
          value: item.tugas,
          type: "tugas"
        }
      })
    let nilai = [];
    nilai.extend(newArrUAS)
    nilai.extend(newArrUTS)
    nilai.extend(newArrTugas)

    let data = {
      idMataKuliah: currentItem.id,
      idDosen: currentItem.idDosen,
      nilai
    }
    onCreate(data)
  };
  const onSave = () => {
    handleSubmit()
    setModalVerification({ active: false })
  }

  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification.active}
        onCancel={() => setModalVerification({ active: false })}
        onOk={() => onSave(modalVerification.data)}
      >
        <p>Anda akan menyimpan data</p>
      </Modal>
      <Upload
        multiple={false}
        accept='.csv'
        onRemove={() => {
          setCsvData('')
        }}
        beforeUpload={async (file) => {
          if (file) {
            let fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = e => {
              setCsvData(fileReader.result)
            }
          }
        }}>
        <Button icon={<UploadOutlined />}>Upload Nilai (csv)</Button>
      </Upload>
      <Button disabled={!csvData.length} type="primary" onClick={() => onSave()}>Save</Button>
      <pre>{csvData}</pre>
    </>
  )
}

export default FormCreate
