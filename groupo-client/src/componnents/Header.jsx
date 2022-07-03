import React from 'react'
import { Link } from "react-router-dom";
import { MobileFriendly, TabletTwoTone, LaptopChromebookTwoTone } from '@mui/icons-material';
import useWindowSize from '../hooks/useWindowSize';

function Header({title}) {
  const { width } = useWindowSize()
  return (
    <header>
        <h1><Link to={"/"}>{title}</Link></h1>
         {width < 768 ? <MobileFriendly />
                : width < 992 ? <TabletTwoTone />
                    : <LaptopChromebookTwoTone />}
    </header>
    
  )
}

export default Header