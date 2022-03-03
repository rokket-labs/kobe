import { useState } from 'react'

import { Advanced } from './components/Advanced'
import { Header } from './components/Header'
import { Information } from './components/Information'
import { SectionButtons } from './components/SectionButtons'
import { Stats } from './components/Stats'
import { PropertyForm } from './forms/property/PropertyForm'
import { PropertyFormAdvanced } from './forms/property/PropertyFormAdvanced'
import { ContentLayout } from './layouts/content/ContentLayout'
import { LeftLayout } from './layouts/content/LeftLayout'
import { MiddleLayout } from './layouts/content/MiddleLayout'
import { RightLayout } from './layouts/content/RightLayout'

/**
  type PropertyProps = {
    nextStep: (value?: number) => void
    backStep: (value?: number) => void
  }
*/

export const Property = ({ nextStep, backStep }) => {
  const [isAdvanced, setIsAdvanced] = useState(false)

  return (
    <>
      <Header
        title="Sección N° 4 - Bienes"
        subtitle="En la versión simplificada te preguntamos simplemente cuánto gastas al año en comprar bienes. Asumiremos una canasta promedio de compras. En la versión detallada, te preguntaremos cuánto gastas en cada cosa."
      />
      <ContentLayout>
        <LeftLayout>
          <Stats />
        </LeftLayout>
        <MiddleLayout>
          {process.env.advanced && (
            <Advanced isAdvanced={isAdvanced} handleAdvanced={setIsAdvanced} />
          )}
          {!isAdvanced && <PropertyForm />}
          {isAdvanced && <PropertyFormAdvanced />}
          <SectionButtons nextStep={nextStep} backStep={backStep} />
        </MiddleLayout>
        <RightLayout>
          <Information index={3} />
        </RightLayout>
      </ContentLayout>
    </>
  )
}
