import { useState } from 'react'

/**
  type UseFormStepReturnValue = {
    nextStep: (value?: number) => void
    backStep: (value?: number) => void
    step: number
  }
*/

const useFormStep = (initialStep = 0) => {
  const [formStep, setFormStep] = useState(initialStep)

  const nextStep = (n = 1) => {
    setFormStep(step => step + n)
  }

  const backStep = (n = 1) => {
    if (formStep > 0) setFormStep(step => step - n)
  }

  return {
    step: formStep,
    nextStep,
    backStep,
  }
}

export default useFormStep
