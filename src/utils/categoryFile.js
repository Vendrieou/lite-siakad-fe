export const MimeTypesMap = {
  png: 'png',
  gif: 'gif',
  jpg: 'jpg',
  jpeg: 'jpeg',
  pdf: 'pdf',
  mp4: 'mp4',
  doc: 'doc',
  docx: 'docx',
  ppt: 'ppt',
  pptx: 'pptx',
  xls: 'xls',
  xlsx: 'xlsx'
}

export const getFileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename
}

export const categoryFile = (data) => {
  if (typeof data === 'string' || typeof data === 'number') {
    const extension = getFileExtension(data)
    const mimeType = MimeTypesMap[extension]
    return mimeType
  }
  return ''
}
