import React from 'react'

import { HGroup } from 'v-block.lite/layout'
import History from '@modules/history'

export default function HistoryView() {
  return (
    <HGroup flex>
        <History></History>
    </HGroup>
  )
}
