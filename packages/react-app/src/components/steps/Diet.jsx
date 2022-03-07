import { useContext, useState } from 'react'

import CalculatorContext from '../../contexts/CalculatorContext'
import { useForm } from '../../hooks/useForm'

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
  const { advanced, accessToken } = useContext(CalculatorContext)
  const [loading, setLoading] = useState(false)

  const {
    formData,
    onChange,
  } = useForm({})

  const handleNext = () => {
    const data = {
      'average_diet': formData?.averageDiet,
      'goods': advanced ? 'Detallada' : 'Simplificada',
      'bearerToken': accessToken,
    }

    setLoading(true)

    const endpoint = advanced ? 'diet-detailed' : 'dieta-simplificada'

    fetch(`http://koywecalc.herokuapp.com/api/v1/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async res => {
      const responseData = await res.json()

      if (responseData.success)
        nextStep()
      else
        return Promise.reject(responseData.message)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  }

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
          {!advanced && <DietForm formData={formData} onChange={onChange} />}
          {advanced && <DietFormAdvanced formData={formData} onChange={onChange} />}
          <SectionButtons nextStep={handleNext} backStep={backStep} loading={loading} />
        </MiddleLayout>
        <RightLayout>
          <Information index={2} />
        </RightLayout>
      </ContentLayout>
    </>
  )
}
