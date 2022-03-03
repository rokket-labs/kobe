import { useState } from 'react'

import { Advanced } from './components/Advanced'
import { Header } from './components/Header'
import { Information } from './components/Information'
import { SectionButtons } from './components/SectionButtons'
import { Stats } from './components/Stats'
import { DietForm } from './forms/diet/DietForm'
import { DietFormAdvanced } from './forms/diet/DietFormAdvanced'
import { ContentLayout } from './layouts/content/ContentLayout'
import { LeftLayout } from './layouts/content/LeftLayout'
import { MiddleLayout } from './layouts/content/MiddleLayout'
import { RightLayout } from './layouts/content/RightLayout'

/**
  type DietProps = {
    nextStep: (value?: number) => void
    backStep: (value?: number) => void
  }
*/

export const Diet = ({ nextStep, backStep }) => {
  const [isAdvanced, setIsAdvanced] = useState(false)

  return (
    <>
      <Header
        title="Sección N° 3 - Dieta"
        subtitle="Te vamos a preguntar cuántas veces consumes cada tipo de comida a la semana. Si no estás seguro, en cada pregunta te damos el consumo promedio. Con este dato, asumiremos que cada consumo es una porción promedio para cada alimento, ni mucho ni poco."
      />
      <ContentLayout>
        <LeftLayout>
          <Stats />
        </LeftLayout>
        <MiddleLayout>
          {process.env.advanced && (
            <Advanced isAdvanced={isAdvanced} handleAdvanced={setIsAdvanced} />
          )}
          {!isAdvanced && <DietForm />}
          {isAdvanced && <DietFormAdvanced />}
          <SectionButtons nextStep={nextStep} backStep={backStep} />
        </MiddleLayout>
        <RightLayout>
          <Information index={2} />
        </RightLayout>
      </ContentLayout>
    </>
  )
}
