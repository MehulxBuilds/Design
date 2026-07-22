import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      {children}
    </div>
  )
}

export default RootLayout;
