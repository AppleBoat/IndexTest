import React from 'react';
import {
  ComposableMap, Geographies, Geography, Marker, ZoomableGroup,
} from 'react-simple-maps';
import locations from './Fakecountry';

const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

const l = locations;

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
    };
  }

  componentDidMount() {
    this.setState({
      locations: l,
    });
  }

  render() {
    return (
      <ComposableMap>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) => geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />
            ))}
          </Geographies>
          {locations.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates} onClick={() => { console.log('abc'); }}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
              </g>
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: 'system-ui', fill: '#5D5A6D', fontSize: 'small' }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}

export default Map;
