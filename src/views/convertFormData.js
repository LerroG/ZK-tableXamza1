export default function convertToFormdata (item )  {
  const form_data = new FormData()

  // console.log('item', item)

  for (const key in item) {
    if (Array.isArray(item[key])) {
      item[key].forEach((e) => {
        form_data.append(key, e)
      })
    } else {
      form_data.append(key, item[key])
    }
  }
  return form_data
}