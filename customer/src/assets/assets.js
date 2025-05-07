// Import all images from the assets folder

// Import the images available in the src/assets directory
import bag_icon from './bag_icon.png';
import basket_icon from './basket_icon.png';
import facebook_icon from './facebook_icon.png';
import header_img from './header_img.png';
import linkedin_icon from './linkedin_icon.png';
import parcel_icon from './parcel_icon.png';
import profile_icon from './profile_icon.png';
import search_icon from './search_icon.png';
import twitter_icon from './twitter_icon.png';
import main_logo from './logo.png';
import pizza from './food_pizza.png';
import manage_account_icon from './manage_account.png';
import logout_icon from './logout_icon.png';
import addIconWhite from './add_icon_white.png';
import addIconGreen from './add_icon_green.png';
import removeIcon from './remove_icon_red.png';

import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'

// Export all assets as a single object for easy access
export const assets = {
    // Icons
    bag_icon,
    basket_icon,
    parcel_icon,
    profile_icon,
    search_icon,
    main_logo,
    manage_account_icon,
    logout_icon,
    addIconWhite,
    addIconGreen,
    removeIcon,
    
    // Social media icons
    facebook_icon,
    twitter_icon,
    linkedin_icon,
    
    // Images
    header_img,

    // Food images
    // TODO: it should fetch from server not hard code but it's only example data
    pizza,
};

export const menu_list = [
    {
        menu_name: "Salad",
        menu_image: menu_1
    },
    {
        menu_name: "Rolls",
        menu_image: menu_2
    },
    {
        menu_name: "Deserts",
        menu_image: menu_3
    },
    {
        menu_name: "Sandwich",
        menu_image: menu_4
    },
    {
        menu_name: "Cake",
        menu_image: menu_5
    },
    {
        menu_name: "Pure Veg",
        menu_image: menu_6
    },
    {
        menu_name: "Pasta",
        menu_image: menu_7
    },
    {
        menu_name: "Noodles",
        menu_image: menu_8
    }
]