import QRCode from 'qrcode'

export const generateToCanvas = (data, id = 'canvas') => {
  if (typeof data === 'string') {
    let canvasElement = document.getElementById(id)
    QRCode.toCanvas(canvasElement, data, { errorCorrectionLevel: 'H' }, (
      err
    ) => {
      if (err) throw err
    })
  }
  return null
}
