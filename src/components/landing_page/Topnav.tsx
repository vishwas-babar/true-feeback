import React from 'react'
import TruefeebackLogo from './TruefeebackLogo'
import { Button } from '../ui/button'

const Topnav = () => {
  return (
      <div className="w-full shadow- shadow-[0px_0px_1px_0px_#f7fafc] flex justify-center">
          <nav className="flex justify-between w-2/3 h-16 items-center  ">

              <TruefeebackLogo />

              <div className="">
                  <Button className="rounded-full font-medium">
                      Sign in
                  </Button>
              </div>
          </nav>
      </div>
  )
}

export default Topnav