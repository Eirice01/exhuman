import './style.less'

import React from 'react'
import { VGroup } from 'v-block.lite/layout'

export default function TitleLine({ title }) {
    return (
        <VGroup padding="20px 0">
            <div className="title-line">{title}</div>
        </VGroup>
    )
}
