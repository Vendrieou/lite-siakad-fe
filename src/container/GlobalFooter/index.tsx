import { DefaultFooter } from '@ant-design/pro-layout'

export default function GlobalFooter () {
  return (
    <DefaultFooter
      copyright={`${new Date().getFullYear()} STMIK TIME`}
      links={[
        {
          key: 'Developed by Vendrie Apps',
          title: 'Developed by Vendrie Apps',
          href: 'https://github.com/Vendrieou',
          blankTarget: true
        }
      ]}
    />
  )
}
