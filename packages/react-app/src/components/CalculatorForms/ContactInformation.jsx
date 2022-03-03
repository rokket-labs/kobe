import { StyledButton } from '../../components/common/StyledButton'

/**
  type CalculatorFormData = {
    email: string
    country: string
  }

  type ContactInformationProps = {
    nextStep: (value?: number) => void
    onChange: (value: string, key: keyof CalculatorFormData) => void
    formData: CalculatorFormData
  }
*/

const ContactInformation = ({
  nextStep,
  formData,
  onChange,
}) => {
  return (
    <>
      <h1>Calculadora</h1>
      <input
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={({ target }) => onChange(target.value, 'email')}
      />
      <StyledButton $type="primary" onClick={() => nextStep()}>
        Siguiente
      </StyledButton>
    </>
  )
}

export default ContactInformation
