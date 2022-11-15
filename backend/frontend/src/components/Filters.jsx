import React from 'react'
import { IconButton, Box, ButtonGroup, Tooltip } from '@chakra-ui/react'
import { FaParking, FaRestroom } from 'react-icons/fa'
import { AiOutlineWifi } from 'react-icons/ai'
import { MdOutlineChairAlt, MdWaterDrop } from 'react-icons/md'


export const Filters = (props) => {
    const { waterOn, wifiOn, benchOn, parkingOn, toiletOn,
        setWaterOn, setWifiOn, setBenchOn, setParkingOn, setToiletOn } = props;

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
                            aria-label='Search For Bathrooms'
                            icon={<FaRestroom />}
                            isActive={!toiletOn}
                            onClick={() => setToiletOn(!toiletOn)}
                        />
                    </Tooltip>

                    {/* Water */}
                    <Tooltip hasArrow label='Filter Water' placement='bottom' openDelay="750">
                        <IconButton
                            colorScheme='green'
                            aria-label='Search For Water'
                            icon={<MdWaterDrop />}
                            isActive={!waterOn}
                            onClick={() => setWaterOn(!waterOn)}
                        />
                    </Tooltip>

                    {/* Parking */}
                    <Tooltip hasArrow label='Filter Parking' placement='bottom' openDelay="750">
                        <IconButton
                            colorScheme='green'
                            aria-label='Search For Parking'
                            icon={<FaParking />}
                            isActive={!parkingOn}
                            onClick={() => setParkingOn(!parkingOn)}
                        />
                    </Tooltip>

                    {/* Benches */}
                    <Tooltip hasArrow label='Filter Benches' placement='bottom' openDelay="750">
                        <IconButton
                            colorScheme='green'
                            aria-label='Search for Benches'
                            icon={<MdOutlineChairAlt />}
                            isActive={!benchOn}
                            onClick={() => setBenchOn(!benchOn)}
                        />
                    </Tooltip>

                    {/* Wifi */}
                    <Tooltip hasArrow label='Filter Wifi' placement='bottom' openDelay="750">
                        <IconButton
                            colorScheme='green'
                            aria-label='Search for Wifi'
                            icon={<AiOutlineWifi />}
                            isActive={!wifiOn}
                            onClick={() => setWifiOn(!wifiOn)}
                        />
                    </Tooltip>
                </ButtonGroup>
            </Box>
        </div>
    )
}