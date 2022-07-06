import { capitalize } from 'lodash'

export function humanize(string){
  if (!string){
    return null
  } else if (string == '_'){
    return ''
  } else {
    return string.split('_').map((str)=> capitalize(str)).join(' ')
  }
}
