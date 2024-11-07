import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { PALETTE } from '../../consts'

const BackArrowSvg = ({ width = 24, height = 24, color = PALETTE.primary }: SVGProps) => {
    return (
        <Svg clipRule='evenodd' fillRule='evenodd' strokeLinejoin='round' strokeMiterlimit='2' viewBox='0 0 24 24' width={width} height={height} fill={color}>
            <Path d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z" />
        </Svg>
    )
}

export default BackArrowSvg