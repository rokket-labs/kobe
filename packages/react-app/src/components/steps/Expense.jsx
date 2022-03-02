import { useState } from 'react'

import { Advanced } from './components/Advanced'
import { Header } from './components/Header'
import { Information } from './components/Information'
import { SectionButtons } from './components/SectionButtons'
import { Stats } from './components/Stats'
import { ExpenseForm } from './forms/expense/ExpenseForm'
import { ExpenseFormAdvanced } from './forms/expense/ExperenceFormAdvanced'
import { ContentLayout } from './layouts/content/ContentLayout'
import { LeftLayout } from './layouts/content/LeftLayout'
import { MiddleLayout } from './layouts/content/MiddleLayout'
import { RightLayout } from './layouts/content/RightLayout'

/**
  type ExpenseProps = {
    nextStep: (value?: number) => void
    backStep: (value?: number) => void
  }
*/

const Expense = ({ nextStep, backStep }) => {
  const [isAdvanced, setIsAdvanced] = useState(false)

  return (
    <>
      <Header
        title="Sección N° 5 - Servicios"
        subtitle="Igual que con los bienes, la simple sólo pregunta el gasto mensual total en CLP, mientras que la detallada es sobre cada tipo de servicio."
      />
      <ContentLayout>
        <LeftLayout>
          <Stats />
        </LeftLayout>
        <MiddleLayout>
          {process.env.advanced && (
            <Advanced isAdvanced={isAdvanced} handleAdvanced={setIsAdvanced} />
          )}
          {!isAdvanced && <ExpenseForm />}
          {isAdvanced && <ExpenseFormAdvanced />}
          <SectionButtons nextStep={nextStep} backStep={backStep} />
        </MiddleLayout>
        <RightLayout>
          <Information index={4} />
        </RightLayout>
      </ContentLayout>
    </>
  )
}

export default Expense
