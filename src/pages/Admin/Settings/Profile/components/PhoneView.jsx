import { Input } from 'antd'
import styles from './PhoneView.module.less'

const PhoneView = (props) => {
  const { value, onChange } = props
  let values = ['', '']

  if (value) {
    values = value.split('-')
  }

  return (
    <div className={styles.container}>
      <Input
        value={values[0]}
        onChange={(e) => {
          if (onChange) {
            onChange(`${e.target.value}-${values[1]}`)
          }
        }}
        className={styles.area_code}
      />
      <Input
        className={styles.phone_number}
        onChange={(e) => {
          if (onChange) {
            onChange(`${values[0]}-${e.target.value}`)
          }
        }}
        value={values[1]}
      />
    </div>
  )
}

export default PhoneView
