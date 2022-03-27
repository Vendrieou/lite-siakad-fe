const setType = (tab) => {
  switch (tab) {
    case 0:
    case '0':
      return 'upcoming'
    case 1:
    case '1':
      return 'past'
    case 2:
    case '2':
      return 'draft'
    default:
      return 'upcoming'
  }
}

const setDate = (term) => {
  switch (term) {
    case 1:
      return 'This Week'
    case 2:
      return 'This Month'
    default:
      return 'This Week'
  }
}

export {
  setType,
  setDate
}
