import { useEffect } from 'react'
import { ProFormCheckbox } from '@ant-design/pro-form'
import { Row, Col } from 'antd'
import { useConcent } from 'concent'

const ChecboxListMataKuliah = ({ name, list, item }) => {
  const optionList = list.map((item) => {
    item.type = 'krs'
    let newLabel = `
      Mata Kuliah: ${item.nama}
      Kode MK: ${item.kodeMatkul}
      SKS: ${item.sks}
    `
    //   dosen: ${item.dosen.nama}
    return {
      label: newLabel,
      value: JSON.stringify(item),
    }
  })
  return (
    <ProFormCheckbox.Group
      key='id'
      name={`semester${name}`}
      label={
        <Row key={item.id}>
          <Col>
            <h4>{`Semester ${item.parentSemester}`}</h4>
          </Col>
          {/* <Col>
            <h5>{`Total SKS ${item.totalSks}`}</h5>
          </Col> */}
        </Row>
      }
      layout='vertical'
      options={optionList}
    />
  )
}

const KRSTemplate = () => {
  const { mr, state } = useConcent('krsStore')
  const { list } = state
  useEffect(() => {
    mr.get()
  }, [])
  return (
    <>
      {list && list.length > 0
        ? list.map((item) => {
            return (
              <div>
                {item.listMataKuliah && item.listMataKuliah.length > 0 ? (
                  <ChecboxListMataKuliah
                    name={item.parentSemester}
                    list={item.listMataKuliah}
                    item={item}
                  />
                ) : (
                  []
                )}
              </div>
            )
          })
        : null}
    </>
  )
}

export default KRSTemplate
