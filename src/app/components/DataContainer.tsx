import { cn } from '@/lib/cn'
import React from 'react'

const DataContainer = (props : React.HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className={cn("w-full flex py-4  bg-white shadow-lg rounded-xl ", props.className)} />
      
  )
}

export default DataContainer