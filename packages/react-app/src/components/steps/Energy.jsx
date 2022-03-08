import { useContext, useState } from 'react'

import CalculatorContext from '../../contexts/CalculatorContext'
import { useForm } from '../../hooks/useForm'

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
  const { advanced, accessToken } = useContext(CalculatorContext)
  const [loading, setLoading] = useState(false)

  const {
    formData,
    onChange,
  } = useForm({})

  const handleNext = () => {
    const data = {
      'people_live': formData?.peopleLive,
      'home_big': formData?.homeBig,
      'electricity_consume': formData?.electricityConsume,
      'liquefied_gas_consume': formData?.liquefiedGasConsume,
      'natural_gas_consume': formData?.naturalGasConsume,
      'water_consume': formData?.waterConsume,
      'food_type': advanced ? 'Detallada' : 'Simplificada',
      'bearerToken': accessToken,
    }

    setLoading(true)

    const endpoint = advanced ? 'energy-home-detailed' : 'energy-home-simplificada'

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
          <EnergyForm formData={formData} onChange={onChange} />
          <SectionButtons nextStep={handleNext} backStep={backStep} loading={loading} />
        </MiddleLayout>
        <RightLayout>
          <Information index={1} />
        </RightLayout>
      </ContentLayout>
    </>
  )
}
