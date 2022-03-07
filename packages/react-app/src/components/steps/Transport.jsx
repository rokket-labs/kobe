import { useContext, useState } from 'react'

import CalculatorContext from '../../contexts/CalculatorContext'
import { useForm } from '../../hooks/useForm'

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
  const { advanced, accessToken } = useContext(CalculatorContext)
  const [loading, setLoading] = useState(false)

  const {
    formData,
    onChange,
  } = useForm({})

  const handleNext = () => {
    const data = {
      'kms_per_month': formData?.monthlyKms,
      'fuel_type_auto': formData?.fuelType,
      'weekly_kms_by_bus': formData?.weeklyBusKms,
      'plane_trips_per_year': formData?.planeTrips,
      'airplane_trips_per_year': formData.airplaneTrips,
      'bearerToken': accessToken,
    }

    setLoading(true)

    const endpoint = advanced ? 'transportation-detailed' : 'transporte-simplificada'

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
        title="Sección N° 1 - Transporte"
        subtitle="Esta sección es muy importante, los medios de transporte son los que
            más aportan a nuestras emisiones anuales."
      />
      <ContentLayout>
        <LeftLayout>
          <Stats />
        </LeftLayout>
        <MiddleLayout>
          {!advanced && <TransportForm formData={formData} onChange={onChange} />}
          {advanced && <TransportFormAdvanced formData={formData} onChange={onChange} />}
          <SectionButtons nextStep={handleNext} backStep={backStep} loading={loading} />
        </MiddleLayout>
        <RightLayout>
          <Information />
        </RightLayout>
      </ContentLayout>
    </>
  )
}
