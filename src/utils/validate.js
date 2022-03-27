const validateFileSize = async ({ uri, limit }) => {
  let fileSize = (uri / (1024 * 1024)).toFixed(2)
  return fileSize < limit
}

const validateTypeFile = async (file) => {
  // check type file
  switch (file) {
    case 'pdf':
    case 'application/pdf':
      return 'pdf'

    case 'doc':
    case 'ms-doc':
    case 'msword':
    case 'application/doc':
    case 'application/ms-doc':
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'doc'

    case 'pptx':
    case 'ppt':
    case 'application/ppt':
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return 'present'

    case 'png':
    case 'jpeg':
    case 'jpg':
    case 'image/jpeg':
    case 'image/png':
    case 'image/x-png':
    case 'image/jpg':
      return 'image'

    default:
      return null
  }
}

export {
  validateFileSize,
  validateTypeFile
}
