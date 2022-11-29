import React from 'react'
import { IconButton, Box, ButtonGroup, Tooltip } from '@chakra-ui/react'
import { FaParking, FaRestroom } from 'react-icons/fa'
import { AiOutlineWifi } from 'react-icons/ai'
import { MdOutlineChairAlt, MdWaterDrop } from 'react-icons/md'
import { useToast } from '@chakra-ui/react'


export const Filters = (props) => {
    const { markerDataMapping, onFilterToggle } = props;
    const toast = useToast();

    return (
        <div>
            <Box padding={5}
                pt={{ base: '20', sm: '20', md: '20', lg: '5', xl: '5' }}
            >
                <ButtonGroup>

                    {/* Toilets */}
                    <Tooltip hasArrow label='Filter Toilets' placement='bottom' openDelay="750">
                        <IconButton
                            colorScheme='green'
                            aria-label='toilet'
                            icon={<FaRestroom />}
                            isActive={!markerDataMapping['toilet']['visibilityFilter']}
                            onClick={() => {
                                if (markerDataMapping['toilet']['amenities']?.length === 0 && markerDataMapping['toilet']['visibilityFilter'] === false) {
                                    toast({
                                        title: 'No toilet data for this area',
                                        status: 'warning', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                                    })
                                }
                                onFilterToggle('toilet');
                            }}
                        />
                    </Tooltip>

                    {/* Water */}
                    <Tooltip hasArrow label='Filter Water' placement='bottom' openDelay="750">
                        <IconButton
                            colorScheme='green'
                            aria-label='water'
                            icon={<MdWaterDrop />}
                            isActive={!markerDataMapping['water']['visibilityFilter']}
                            onClick={() => {
                                if (markerDataMapping['water']['amenities']?.length === 0 && markerDataMapping['water']['visibilityFilter'] === false) {
                                    toast({
                                        title: 'No water data for this area',
                                        status: 'warning', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                                    })
                                }
                                onFilterToggle('water');
                            }}
                        />
                    </Tooltip>

                    {/* Parking */}
                    <Tooltip hasArrow label='Filter Parking' placement='bottom' openDelay="750">
                        <IconButton
                            colorScheme='green'
                            aria-label='parking'
                            icon={<FaParking />}
                            isActive={!markerDataMapping['parking']['visibilityFilter']}
                            onClick={() => {
                                if (markerDataMapping['parking']['amenities']?.length === 0 && markerDataMapping['parking']['visibilityFilter'] === false) {
                                    toast({
                                        title: 'No parking data for this area',
                                        status: 'warning', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                                    })
                                }
                                onFilterToggle('parking');
                            }}
                        />
                    </Tooltip>

                    {/* Benches */}
                    <Tooltip hasArrow label='Filter Benches' placement='bottom' openDelay="750">
                        <IconButton
                            colorScheme='green'
                            aria-label='bench'
                            icon={<MdOutlineChairAlt />}
                            isActive={!markerDataMapping['bench']['visibilityFilter']}
                            onClick={() => {
                                if (markerDataMapping['bench']['amenities']?.length === 0 && markerDataMapping['bench']['visibilityFilter'] === false) {
                                    toast({
                                        title: 'No bench data for this area',
                                        status: 'warning', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                                    })
                                }
                                onFilterToggle('bench');
                            }}
                        />
                    </Tooltip>

                    {/* Wifi */}
                    <Tooltip hasArrow label='Filter Wifi' placement='bottom' openDelay="750">
                        <IconButton
                            colorScheme='green'
                            aria-label='wifi'
                            icon={<AiOutlineWifi />}
                            isActive={!markerDataMapping['wifi']['visibilityFilter']}
                            onClick={() => {
                                if (markerDataMapping['wifi']['amenities']?.length === 0 && markerDataMapping['wifi']['visibilityFilter'] === false) {
                                    toast({
                                        title: 'No wifi data for this area',
                                        status: 'warning', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
                                    })
                                }
                                onFilterToggle('wifi');
                            }}
                        />
                    </Tooltip>
                </ButtonGroup>
            </Box>
        </div>
    )
}