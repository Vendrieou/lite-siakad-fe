// import React, { useState } from 'react'
import { useState } from 'react'
import { Modal, Row, Col, Space, Tag, Button } from 'antd'
import ProForm, {
  ProFormText,
  ProFormUploadButton,
  ProFormSelect
} from '@ant-design/pro-form'
import { cookieGet } from 'utils/storage'
import { getBase64 } from 'utils/file'
import { useConcent } from 'concent'
import EmptyPerson from 'static/assets/empty-state/person.png'
import styles from './FormEdit.module.less'

const FormEdit = ({
  setRow,
  params
}) => {
  const [openModalPenerimaanBarang, setOpenModalPenerimaanBarang] = useState(false)
  const [openBtnValidate, setOpenBtnValidate] = useState(false)
  const [modalVerification, setModalVerification] = useState({
    data: {},
    active: false
  })
  const [modalVerificationPenerimaanBarang, setModalVerificationPenerimaanBarang] = useState({
    data: {},
    active: false
  })
  const [preview, setPreview] = useState({
    image: '',
    title: '',
    active: false
  })

  const { mr, state } = useConcent('pemintaStore')
  const { currentItem: row } = state
  const role = cookieGet('role')

  let optionListAdminOpt = [
    {
      value: 'approvement',
      label: 'approvement'
    },
    {
      value: 'cancel',
      label: 'cancel'
    },
    {
      value: 'delivery',
      label: 'delivery'
    },
    {
      value: 'donated',
      label: 'donated'
    }
  ]

  let optionListAdminSpv = [
    {
      value: 'approvement',
      label: 'approvement'
    },
    {
      value: 'approved',
      label: 'approved'
    },
    {
      value: 'cancel',
      label: 'cancel'
    },
    {
      value: 'delivery',
      label: 'delivery'
    },
    {
      value: 'donated',
      label: 'donated'
    }
  ]

  const optionListCancel = [
    {
      value: 'approvement',
      label: 'approvement'
    },
    {
      value: 'delivery',
      label: 'delivery'
    },
    {
      value: 'donated',
      label: 'donated'
    },
    {
      value: 'cancel',
      label: 'cancel'
    }
  ]

  const optionList = role === 'adminOpt' && row?.firstApprovedBy
    ? optionListCancel
    : role === 'adminOpt'
      ? optionListAdminOpt
      : role === 'adminSpv' && row?.secondApprovedBy && row?.isAccepted
        ? optionListCancel
        : role === 'adminSpv'
          ? optionListAdminSpv
          : []

  const handleSubmit = (data) => {
    mr.update(data)
  }

  const onSave = (data) => {
    handleSubmit(data)
    setModalVerification({ active: false })
    setRow(undefined)
  }

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreview({
      image: file.url || file.preview,
      active: true,
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    })
  }
  const handleCancelPreview = () => setPreview(!preview.active)

  const onOpenBtnValidate = () => setOpenBtnValidate(true)
  const onCloseBtnValidate = () => setOpenBtnValidate(false)
  
  const onOpenModalPenerimaanBarang = () => setOpenModalPenerimaanBarang(true)
  const onCloseModalPenerimaanBarang = () => setOpenModalPenerimaanBarang(false)
  const onSaveValidasiPenerimaanBarang = (data) => {
    data.acceptDonasiImage = data.acceptDonasiImage && data.acceptDonasiImage.length > 0 ? data.acceptDonasiImage[0].originFileObj : null
    data.acceptSelfieImage = data.acceptSelfieImage && data.acceptSelfieImage.length > 0 ? data.acceptSelfieImage[0].originFileObj : null
    mr.accept(data)
    setModalVerificationPenerimaanBarang({ active: false })
    onCloseModalPenerimaanBarang()
    onCloseBtnValidate()
    setRow(undefined)
  }
  
  if(row.id !== params.id ) return null
  return (
    <>
      <Modal
        title="Simpan"
        visible={modalVerification.active}
        onCancel={() => setModalVerification({ active: false })}
        onOk={() => onSave(modalVerification.data)}
      >
        <p>{`Anda akan menyimpan data peminta: ${row?.userName}`}</p>
      </Modal>
      <Modal
        title="Simpan Validasi Penerimaan Barang"
        visible={modalVerificationPenerimaanBarang.active}
        onCancel={() => setModalVerificationPenerimaanBarang({ active: false })}
        onOk={() => onSaveValidasiPenerimaanBarang(modalVerificationPenerimaanBarang.data)}
      >
        <p>Anda akan menyimpan data Penerimaan Barang</p>
      </Modal>
      <Modal
        visible={preview.active}
        title={preview.title}
        footer={null}
        onCancel={() => handleCancelPreview()}
      >
        <img alt="preview" style={{ width: '100%' }} src={preview.image} />
      </Modal>
      
      <Modal
        maskClosable={false}
        title="Validasi Penerimaan Barang"
        visible={openModalPenerimaanBarang}
        footer={null}
        onCancel={() => onCloseModalPenerimaanBarang()}
      >
        <ProForm
          onFinish={async (values) => {
            setModalVerificationPenerimaanBarang({ data: {
              ...values,
              fireToken: row?.user?.fireToken
            }, active: true })
          }}
          initialValues={{
            id: row?.id,
            donasiId: row?.donasiId,
            donasiName: row?.donasi?.name
          }}
        >
          <ProFormText readonly="readonly" name="id" label="ID" placeholder="" />
          <ProFormText readonly="readonly" name="donasiId" label="donasiId" placeholder="" />
          <ProFormText readonly="readonly" name="donasiName" label="donasiName" placeholder="" />
          <ProFormUploadButton
            rules={[{ required: true, message: 'Masukkan foto donasi' }]}
            name="acceptDonasiImage"
            label="acceptDonasiImage"
            max={1}
            title="click to upload"
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
              onPreview: handlePreview
            }}
          />
          <ProFormUploadButton
            name="acceptSelfieImage"
            label="acceptSelfieImage"
            max={1}
            title="click to upload"
            fieldProps={{
              name: 'file',
              listType: 'picture-card',
              onPreview: handlePreview
            }}
          />
        </ProForm>
      </Modal>
      <ProForm
        onFinish={async (values) => {
          setModalVerification({ data: values, active: true })
        }}
        initialValues={{
          id: row?.id,
          userId: row?.userId,
          userName: row?.userName,
          userImage: row?.userImage,
          userEmail: row?.userEmail,
          userPhone: row?.userPhone,
          donasiId: row?.donasiId,
          quantity: row?.quantity,
          isAccepted: Number(row?.isAccepted),
          firstApprovedBy: row?.firstApprovedBy,
          secondApprovedBy: row?.secondApprovedBy,
          statusApproved: row?.statusApproved,
          donasiName: row?.donasi?.name,
          status: row?.status
        }}
        params={{}}
      >
        <Row>
          <Col xs={8}>
            <ProFormText readonly="readonly" name="id" label="ID" placeholder="" />
            <ProFormText readonly="readonly" name="userId" label="userId" placeholder="" />
            <ProFormText readonly="readonly" name="userName" label="userName" placeholder="" />
            <ProFormText readonly="readonly" name="userEmail" label="userEmail" placeholder="" />
            <ProFormText readonly="readonly" name="userPhone" label="userPhone" placeholder="" />
          </Col>
          <Col xs={8} className={styles.col}>
            <ProFormText readonly="readonly" name="isAccepted" label="isAccepted" placeholder="" />
            <ProFormText readonly="readonly" name="firstApprovedBy" label="firstApprovedBy" placeholder="" />
            <ProFormText readonly="readonly" name="secondApprovedBy" label="secondApprovedBy" placeholder="" />
            {row?.statusApproved === 'donated' ? (
              <>
                <p><b>statusApproved</b></p>
                <Space>
                  <Tag
                    color={
                      row?.statusApproved === 'donated'
                        ? 'cyan'
                        : 'error'
                    }
                  >
                    {row?.statusApproved}
                  </Tag>
                </Space>
              </>
            ) : (
              <ProFormSelect
                proFieldProps={{
                  onChange: (e) => e === 'donated' ? onOpenBtnValidate() : onCloseBtnValidate()
                }}
                options={optionList}
                width="md"
                name="statusApproved"
                label="statusApproved"
              />
            )}
            {openBtnValidate &&  <Button type="primary" onClick={() => onOpenModalPenerimaanBarang()}>Penerimaan Barang</Button>}
          </Col>
          <Col xs={8}>
            <ProFormText readonly="readonly" name="donasiId" label="donasiId" placeholder="" />
            <ProFormText readonly="readonly" name="donasiName" label="donasiName" placeholder="" />
            <ProFormText readonly="readonly" name="quantity" label="quantity" placeholder="" />
            <img
              src={row?.userImage?.url
                ? row?.userImage?.url
                : EmptyPerson}
              alt="userImage.url"
              style={{ objectFit: 'cover' }}
              width={120}
              height={120}
            />
          </Col>
        </Row>
      </ProForm>
    </>
  )
}

export default FormEdit
