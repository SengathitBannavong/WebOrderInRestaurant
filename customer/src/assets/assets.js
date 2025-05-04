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