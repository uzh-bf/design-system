import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export const Default = () => (
  <Popover>
    <PopoverTrigger>Open</PopoverTrigger>
    <PopoverContent>Place content for the popover here.</PopoverContent>
  </Popover>
)
