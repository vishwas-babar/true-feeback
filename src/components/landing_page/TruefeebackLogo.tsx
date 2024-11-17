import { Nerko_One } from 'next/font/google';
import React from 'react'


const nerkoone = Nerko_One({ weight: "400", subsets: ["latin"] });

const TruefeebackLogo = () => {
  return (
      <div className={`${nerkoone.className} text-3xl`}>
          True Feedback
      </div>
  )
}

export default TruefeebackLogo