import { useState } from 'react'

export const useForm = initialformData => {
  const [state, setState] = useState(initialformData)

  const onChange = (value, key) => {
    setState({
      ...state,
      [key]: value,
    })
  }

  return {
    ...state,
    formData: state,
    onChange,
  }
}
