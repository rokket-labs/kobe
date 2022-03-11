import { InputPrice } from '../../../InputPrice'
import { StyledDivider } from '../../components/StyledDivider'
import { InputLayout } from '../../layouts/InputLayout'
import { RowLayout } from '../../layouts/RowLayout'

export const ExpenceFormFirst = ({
  formData,
  onChange,
}) => {
  const {
    health,
    information,
    doctor,
    autoService,
  } = formData

  return (
    <>
      <RowLayout align="middle" icon="icon/ambulance.svg" title="Salud">
        <InputLayout
          label="¿Cuánto gastas en salud por mes? (Incluye seguros y otros)"
          tooltip
          tooltipText="">
          <InputPrice
            placeholder="150.000 CLP"
            value={health}
            onChange={value => onChange(value, 'health')}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/cellphone-notebook.svg"
        title="Teléfonía e internet">
        <InputLayout
          label="¿Cuánto gastas por mes? (Incluye internet, celular, suscripciones, etc.)"
          tooltip
          tooltipText="">
          <InputPrice
            placeholder="50.000 CLP"
            value={information}
            onChange={value => onChange(value, 'information')}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/medical-kit.svg"
        title="Visitas médicas">
        <InputLayout label="¿Cuánto gastas por mes?" tooltip tooltipText="">
          <InputPrice
            placeholder="30.000 CLP"
            value={doctor}
            onChange={value => onChange(value, 'doctor')}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/car-repair.svg"
        title="Servicio técnico">
        <InputLayout label="¿Cuánto gastas por mes?" tooltip tooltipText="">
          <InputPrice
            placeholder="30.000 CLP"
            value={autoService}
            onChange={value => onChange(value, 'autoService')}
          />
        </InputLayout>
      </RowLayout>
    </>
  )
}

export const ExpenseFormAdvanced = ({
  formData,
  onChange,
}) => {
  const {
    financialServices,
    homeMaintenance,
    donations,
    otherServices,
  } = formData

  return (
    <>
      <ExpenceFormFirst formData={formData} onChange={onChange} />
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/financial-card.svg"
        title="Servicios financieros">
        <InputLayout label="¿Cuánto gastas por mes?" tooltip tooltipText="">
          <InputPrice
            placeholder="30.000 CLP"
            value={financialServices}
            onChange={value => onChange(value, 'financialServices')}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/roller.svg" title="Mantención hogar">
        <InputLayout label="¿Cuánto gastas al mes?" tooltip tooltipText="">
          <InputPrice
            placeholder="30.000 CLP"
            value={homeMaintenance}
            onChange={value => onChange(value, 'homeMaintenance')}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/handshake.svg" title="Donaciones">
        <InputLayout label="¿Cuánto gastas al mes?" tooltip tooltipText="">
          <InputPrice
            placeholder="30.000 CLP"
            value={donations}
            onChange={value => onChange(value, 'donations')}
          />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/headset.svg" title="Otros servicios">
        <InputLayout label="¿Cuánto gastas al mes?" tooltip tooltipText="">
          <InputPrice
            placeholder="30.000 CLP"
            value={otherServices}
            onChange={value => onChange(value, 'otherServices')}
          />
        </InputLayout>
      </RowLayout>
    </>
  )
}
