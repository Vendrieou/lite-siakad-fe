import { saveAs } from 'file-saver'

export const Download = (data, filename) => {
  return saveAs(data, filename)
}
