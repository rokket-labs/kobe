import { InputPrice } from '../../../InputPrice'
import { StyledDivider } from '../../components/StyledDivider'
import { InputLayout } from '../../layouts/InputLayout'
import { RowLayout } from '../../layouts/RowLayout'

export const ExpenceFormFirst = () => {
  return (
    <>
      <RowLayout align="middle" icon="icon/ambulance.svg" title="Salud">
        <InputLayout
          label="¿Cuánto gastas en salud por mes? (Incluye seguros y otros)"
          tooltip
          tooltipText="">
          <InputPrice placeholder="150.000 CLP" />
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
          <InputPrice placeholder="50.000 CLP" />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/medical-kit.svg"
        title="Visitas médicas">
        <InputLayout label="¿Cuánto gastas por mes?" tooltip tooltipText="">
          <InputPrice placeholder="30.000 CLP" />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/car-repair.svg"
        title="Servicio técnico">
        <InputLayout label="¿Cuánto gastas por mes?" tooltip tooltipText="">
          <InputPrice placeholder="30.000 CLP" />
        </InputLayout>
      </RowLayout>
    </>
  )
}

export const ExpenseFormAdvanced = () => {
  return (
    <>
      <ExpenceFormFirst />
      <StyledDivider />
      <RowLayout
        align="middle"
        icon="icon/financial-card.svg"
        title="Servicios financieros">
        <InputLayout label="¿Cuánto gastas por mes?" tooltip tooltipText="">
          <InputPrice placeholder="30.000 CLP" />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/roller.svg" title="Mantención hogar">
        <InputLayout label="¿Cuánto gastas al mes?" tooltip tooltipText="">
          <InputPrice placeholder="30.000 CLP" />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/handshake.svg" title="Donaciones">
        <InputLayout label="¿Cuánto gastas al mes?" tooltip tooltipText="">
          <InputPrice placeholder="30.000 CLP" />
        </InputLayout>
      </RowLayout>
      <StyledDivider />
      <RowLayout align="middle" icon="icon/headset.svg" title="Otros servicios">
        <InputLayout label="¿Cuánto gastas al mes?" tooltip tooltipText="">
          <InputPrice placeholder="30.000 CLP" />
        </InputLayout>
      </RowLayout>
    </>
  )
}
