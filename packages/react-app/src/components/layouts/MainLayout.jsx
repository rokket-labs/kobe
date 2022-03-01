import { AnimateSharedLayout } from 'framer-motion'

import GeneralLayout from './GeneralLayout'

export const MainLayout = ({ children, NETWORKCHECK }) => {
  return (
    <AnimateSharedLayout>
      <GeneralLayout NETWORKCHECK={NETWORKCHECK}>{children}</GeneralLayout>
    </AnimateSharedLayout>
  )
}
