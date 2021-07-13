import React from "react";
import Svg, { 
    Ellipse , 
    Path, 
    Defs, 
    Stop , 
    LinearGradient 
} from 'react-native-svg';

const EmptyBagIcon = (props) => {

    return(
        <Svg
            {...props}
            viewBox="0 0 78 79" 
            fill="none"
        >
            <Ellipse cx="38.5" cy="39.5" rx="38.5" ry="39.5" fill="#CAF2FD"/>
            <Path d="M3.05447 56.5976L10 12H63.5L67 72L17.0982 72.7504C8.42318 72.8809 1.71938 65.1703 3.05447 56.5976Z" fill="url(#paint0_linear)"/>
            <Path d="M54.8138 60.9488L62.5 12H68L75.6862 60.9488C76.6388 67.0158 71.9486 72.5 65.8072 72.5H64.6928C58.5514 72.5 53.8612 67.0158 54.8138 60.9488Z" fill="#115374"/>
            <Path d="M74 8.04712C69.9712 8.04712 68.3357 11.1859 68 12.5L4 11.9893L8.02878 8.04712H74Z" fill="#115374"/>
            <Path d="M62.7926 12.0813L61.2286 20H50L52.5 8.5H59.8495C61.7397 8.5 63.1589 10.2269 62.7926 12.0813Z" fill="#4EC4FF"/>
            <Path d="M52 20C52 12 56.6667 9 59 8.5H8C2.8 10.5 1.16667 17 1 20H52Z" fill="#B1EBFF"/>
            <Path d="M52 20C52 12 56.6667 9 59 8.5H8C2.8 10.5 1.16667 17 1 20H52Z" fill="url(#paint1_linear)"/>
            <Path d="M41 73C45.6667 67.1667 55.6 52.7 58 41.5" stroke="#B1EBFF"/>
            <Path d="M58 42C55.5 49.6667 51.1 66.5 53.5 72.5" stroke="#B1EBFF"/>
            <Path d="M58 41.5C57.3334 51.1667 58.4 70.9 68 72.5" stroke="#B1EBFF"/>
            <Path d="M51 58.5C51.1667 59 51.9 59.9 53.5 59.5" stroke="#B1EBFF"/>
            <Path d="M59.5 61.5C59 62.3333 57 63.7 53 62.5" stroke="#B1EBFF"/>
            <Path d="M46.5 65.5C46.8333 66.3333 48.5 67.9 52.5 67.5" stroke="#B1EBFF"/>
            <Path d="M53 70C54.8333 71.1667 59.4 72.7 63 69.5" stroke="#B1EBFF"/>
            <Path d="M13 70.5L12 72C14.8 73.6 17.8333 73.3333 19 73L18 70.5L16.5 71.5L16 71L14.5 71.5L14 70.5L13.5 71.5L13 70.5Z" fill="white"/>
            <Path d="M7 39.5L6 38L5 44L7 41.5L6.5 40.5L7 39.5Z" fill="#CAF2FD"/>
            <Defs>
                <LinearGradient id="paint0_linear" x1="53" y1="19" x2="33.75" y2="73" gradientUnits="userSpaceOnUse">
                <Stop stopColor="#4EC4FF"/>
                <Stop offset="1" stopColor="#A2C9DD" stopOpacity="0.94"/>
                </LinearGradient>
                <LinearGradient id="paint1_linear" x1="30" y1="8.5" x2="30" y2="20" gradientUnits="userSpaceOnUse">
                <Stop stopColor="white"/>
                <Stop offset="1" stopColor="white" stopOpacity="0"/>
                </LinearGradient>
            </Defs>
        </Svg>
    )

}


export const EmptyBag = EmptyBagIcon;
