const FormatPhone = (phone, format='US' ) =>  {
  if (!phone){
    return null
  }

  let formated_num = formatPhoneNumber(phone) 
  return formated_num
}

function formatPhoneNumber(phoneNumberString) {
  let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    let intlCode = (match[1] ? '+1 ' : '')
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }
  return null
}

export default FormatPhone;
