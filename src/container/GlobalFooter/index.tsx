import { DefaultFooter } from '@ant-design/pro-layout'

export default function GlobalFooter () {
  return (
    <DefaultFooter
      copyright={`${new Date().getFullYear()} Vendrie`}
    />
  )
}
