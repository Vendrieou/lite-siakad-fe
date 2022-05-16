import { useEffect } from 'react';
import { ProFormCheckbox } from '@ant-design/pro-form';
import { useConcent } from 'concent';

// const optionListKRSTemplate = list.map((item) => {
//   return {
//     label: newLabel,
//     value: item
//   }
// })
const ChecboxListMataKuliah = ({ name, item }) => {
  item.type = 'krs';
  let newLabel = `
      Mata Kuliah: ${item.nama}
      Kode MK: ${item.kodeMatkul}
      SKS: ${item.sks}
    `;
  return (
    <ProFormCheckbox.Group
      key='id'
      name={`Semester${name}`}
      label={`Semester ${name}`}
      layout='vertical'
      options={[
        {
          label: newLabel,
          value: item,
        },
      ]}
    />
  );
};

const KRSTemplate = () => {
  const { mr, state } = useConcent('krsStore');
  const { list } = state;
  useEffect(() => {
    mr.get();
  }, []);

  return (
    <>
      {list && list.length > 0
        ? list.map((item) => {
            return (
              <>
                <h5>{`Semester ${item.parentSemester}`}</h5>
                <span>{`Total SKS ${item.totalSks}`}</span>
                {item.listMataKuliah && item.listMataKuliah.length > 0
                  ? item.listMataKuliah.map((itemMatkul) => (
                      <ChecboxListMataKuliah name={item.parentSemester} item={itemMatkul} />
                    ))
                  : []}
              </>
            );
          })
        : null}
    </>
  );
};

export default KRSTemplate;
