import { Header } from './components/Header'
import { Information } from './components/Information'
import { SectionButtons } from './components/SectionButtons'
import { Stats } from './components/Stats'
import { EnergyForm } from './forms/energy/EnergyForm'
import { ContentLayout } from './layouts/content/ContentLayout'
import { LeftLayout } from './layouts/content/LeftLayout'
import { MiddleLayout } from './layouts/content/MiddleLayout'
import { RightLayout } from './layouts/content/RightLayout'

/**
  type EnergyProps = {
    nextStep: (value?: number) => void
    backStep: (value?: number) => void
  }
 */

export const Energy = ({ nextStep, backStep }) => {
  return (
    <>
      <Header
        title="Sección N° 2 - Energía"
        subtitle="            Tus emisiones dependerán de las personas que viven contigo. Ingresa
            los datos totales de tu hogar para cada pregunta y nosotros al
            calcular dividiremos esas emisiones por la cantidad de personas que
            viven contigo. Así podrás saber las emisiones de cada uno."
      />
      <ContentLayout>
        <LeftLayout>
          <Stats />
        </LeftLayout>
        <MiddleLayout>
          <EnergyForm />
          <SectionButtons nextStep={nextStep} backStep={backStep} />
        </MiddleLayout>
        <RightLayout>
          <Information index={1} />
        </RightLayout>
      </ContentLayout>
    </>
  )
}
