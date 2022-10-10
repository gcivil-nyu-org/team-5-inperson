import React from 'react'
import { IconButton, Box, ButtonGroup } from '@chakra-ui/react'
import { FaToilet, FaParking} from 'react-icons/fa'
import { IoMdWater } from 'react-icons/io'
import { GiParkBench } from 'react-icons/gi'
import { AiOutlineWifi} from 'react-icons/ai'

export const Filters = () => {
    return (
        <div>
            <Box padding = {4}> 
                <ButtonGroup> 
                    <IconButton
                    colorScheme='cyan'
                    aria-label='Search For Bathrooms'
                    icon={<FaToilet />}/>

                    <IconButton
                    colorScheme='blue'
                    aria-label='Search For Water'
                    icon={<IoMdWater />}/>

                    <IconButton
                    colorScheme='gray'
                    aria-label='Search For Parking'
                    icon={<FaParking />}/>

                    <IconButton
                    colorScheme='green'
                    aria-label='Search for Benches'
                    icon={<GiParkBench />}/>

                    <IconButton
                    colorScheme='blackAlpha'
                    aria-label='Search for Wifi'
                    icon={<AiOutlineWifi />}/>
                </ButtonGroup>
            </Box>
        </div>


        
    )
}