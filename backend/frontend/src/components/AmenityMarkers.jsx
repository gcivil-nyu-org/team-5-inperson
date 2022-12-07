import React from 'react';
import { Marker } from '@react-google-maps/api';

const codepoints = {
    water: "\ue798",
    wifi: "\ue63e",
    bench: "\uefee",
    toilet: "\ue63d",
    parking: "\ue54f"
};

export const AmenityMarkers = (props) => {
    const { amenityType, visibilityFilter, amenities, onMarkerClick, selectedAmenityType, selectedAmenityId, showDetailPanel } = props;

    return (
        <>
            {visibilityFilter
                ? amenities.map((amenity) => (
                    <Marker
                        key={amenity.id}
                        label={{
                            text: codepoints[amenityType],
                            fontFamily: "Material Icons",
                            color: selectedAmenityType === amenityType && selectedAmenityId === amenity.id && showDetailPanel ? "black" : "white",
                            fontSize: "16px",
                            border: '3px solid white'
                        }}
                        position={{ lat: amenity[`${amenityType}_latitude`], lng: amenity[`${amenityType}_longitude`] }}
                        onClick={() => onMarkerClick(amenity, amenityType)}
                    />
                ))
                : null}
        </>
    );
};
