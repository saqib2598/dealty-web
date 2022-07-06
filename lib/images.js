export const base64Image = (e, callback) => {
  const reader = new FileReader();
  let result = null;
  reader.readAsDataURL(e.target.files[0])
  reader.addEventListener("load", () => {
    callback(reader.result)
  }, false);
}
