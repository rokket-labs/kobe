import { useState } from 'react'

import { Advanced } from './components/Advanced'
import { Header } from './components/Header'
import { Information } from './components/Information'
import { SectionButtons } from './components/SectionButtons'
import { Stats } from './components/Stats'
import { TransportForm } from './forms/transport/TransportForm'
import { TransportFormAdvanced } from './forms/transport/TransportFormAdvanced'
import { ContentLayout } from './layouts/content/ContentLayout'
import { LeftLayout } from './layouts/content/LeftLayout'
import { MiddleLayout } from './layouts/content/MiddleLayout'
import { RightLayout } from './layouts/content/RightLayout'

/**
  type TransportProps = {
    nextStep: (value?: number) => void
    backStep: (value?: number) => void
  }
*/

export const Transport = ({ nextStep, backStep }) => {
  const [isAdvanced, setIsAdvanced] = useState(false)

  return (
    <>
      <Header
        title="Sección N° 1 - Transporte"
        subtitle="Esta sección es muy importante, los medios de transporte son los que
            más aportan a nuestras emisiones anuales."
      />
      <ContentLayout>
        <LeftLayout>
          <Stats />
        </LeftLayout>
        <MiddleLayout>
          {process.env.advanced && (
            <Advanced isAdvanced={isAdvanced} handleAdvanced={setIsAdvanced} />
          )}
          {!isAdvanced && <TransportForm />}
          {isAdvanced && <TransportFormAdvanced />}
          <SectionButtons nextStep={nextStep} backStep={backStep} />
        </MiddleLayout>
        <RightLayout>
          <Information />
        </RightLayout>
      </ContentLayout>
    </>
  )
}
