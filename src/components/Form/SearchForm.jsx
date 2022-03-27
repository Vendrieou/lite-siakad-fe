import ProForm, { ProFormText } from '@ant-design/pro-form'

const SearchForm = ({ ...props }) => {
  return (
    <div style={{ 
      backgroundColor: 'white',
      marginBottom: 16,
      padding: 24,
      paddingBottom: 0
    }}>
      <ProForm
        style={{ display: 'flex', justifyContent: 'space-between' }}
        {...props}
      >
        <ProFormText name="q" label="Search" placeholder="Search" />
      </ProForm>
    </div>
  )
}

export default SearchForm
