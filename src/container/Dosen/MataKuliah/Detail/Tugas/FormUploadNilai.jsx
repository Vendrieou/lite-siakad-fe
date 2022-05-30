// import React, { useState } from 'react'
import { useState } from 'react'
import { Modal, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import csv from 'csvtojson'

Array.prototype.extend = function (other_array) {
  /* You should include a test to check whether other_array really is an array */
  other_array.forEach(function (v) { this.push(v) }, this);
}

const FormCreate = ({
  onCreate,
  currentItem
}) => {
  // const [formValue, setFormValue] = useState({
  //   idDosen: null
  // })
  const [csvData, setCsvData] = useState(null)
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  // const { state, mr } = useConcent('nilaiStore')

  const handleSubmit = async () => {
    let arr = [];
    let normalCsv = csvData.replace(/;/g, ',')
    arr = await csv()
      .fromString(normalCsv)
      .then((res) => {
        console.log("res", res);
        return res;
      });
    console.log("arr: ", arr);

    let newArrUTS = arr
      .filter((filtered) => filtered.uts)
      .map((item) => {
        return {
          nim: item.nim,
          value: item.uts,
          type: "uts"
        };
      });

    let newArrUAS = arr
      .filter((filtered) => filtered.uas)
      .map((item) => {
        return {
          nim: item.nim,
          value: item.uas,
          type: "uas"
        };
      });

    let newArrTugas = arr
      .filter((filtered) => filtered.tugas)
      .map((item) => {
        return {
          nim: item.nim,
          value: item.tugas,
          type: "tugas"
        };
      });
    let nilai = [];
    nilai.extend(newArrUAS);
    nilai.extend(newArrUTS);
    nilai.extend(newArrTugas);
    let data = {
      idMataKuliah: currentItem.idMataKuliah,
      idDosen: currentItem.idDosen,
      nilai
    };
    console.log("data", data);
    // console.log('nilai', nilai)
    // console.log('nilai', nilai.length)
    // onCreate(data)
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
      <Button type="primary" onClick={() => onSave()}>Save</Button>
      {/* <pre>{JSON.stringify(modalVerification.data, null, 2)}</pre> */}
      <pre>{JSON.stringify(csvData, null, 2)}</pre>
    </>
  )
}

export default FormCreate
