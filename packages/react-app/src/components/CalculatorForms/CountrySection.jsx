import { StyledButton } from '../../components/common/StyledButton'

/**
  type CountrySectionProps = {
    nextStep: (value?: number) => void
  }
*/

const CountrySection = ({ nextStep }) => {
  return (
    <>
      <h1>Pagina 2</h1>
      <StyledButton $type="primary" onClick={() => nextStep()}>
        Continuar
      </StyledButton>
    </>
  )
}

export default CountrySection
