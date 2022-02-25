import { AnimateSharedLayout } from 'framer-motion'

import GeneralLayout from './GeneralLayout'

export const MainLayout = ({ children, NETWORKCHECK, price }) => {
  return (
    <AnimateSharedLayout>
      <GeneralLayout NETWORKCHECK={NETWORKCHECK} price={price}>
        {children}
      </GeneralLayout>
    </AnimateSharedLayout>
  )
}
