const ShortenText = (text, len, suffix) =>  {

    if (!text){
      return null
    }
    if (!len){
      return text
    }
    let sliced = text.substring(0, len)
    if (suffix){
      return text.length > sliced.length ? concatSuffix(sliced, suffix) : text
    } else {
      return sliced
    }

}

function concatSuffix(string,suffix)
{
  return string.concat(suffix)
}

export default ShortenText;
