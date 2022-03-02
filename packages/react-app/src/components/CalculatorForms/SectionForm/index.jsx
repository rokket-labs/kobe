import { StyledButton } from '../../components/common/StyledButton'

/**
  type SectionFormProps = {
    nextStep: (value?: number) => void
    backStep: (value?: number) => void
  }
*/

const SectionForm = ({ backStep, nextStep }) => {
  return (
    <>
      <h1>Pagina 3</h1>
      {/* TODO: submenu */}
      <StyledButton onClick={() => backStep()}>Volver</StyledButton>
      <StyledButton $type="primary" onClick={() => nextStep()}>
        Siguiente
      </StyledButton>
    </>
  )
}

export default SectionForm
