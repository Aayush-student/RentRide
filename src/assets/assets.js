import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import car_icon from "./car_icon.svg"
import location_icon from "./location_icon.svg"
import fuel_icon from "./fuel_icon.svg"
import addIcon from "./addIcon.svg"
import carIcon from "./carIcon.svg"
import carIconColored from "./carIconColored.svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import testimonial_image_1 from "./testimonial_image_1.png"
import testimonial_image_2 from "./testimonial_image_2.png"
import main_car from "./main_car.png"
import banner_car_image from "./banner_car_image.png"
import user_profile from "./user_profile.png"
import upload_icon from "./upload_icon.svg"
import car_image1 from "./car_image1.png"
import car_image2 from "./car_image2.png"
import car_image3 from "./car_image3.png"
import car_image4 from "./car_image4.png"
import Car from "./Car.png"
import carlogo from "./Carlogo.png"
import AnanyaSharma from "./Ananya-Sharma.jpg"
import RohanMalhotra from "./Rohan-Malhotra.jpg"
import SiddharthGupta from "./Siddharth-Gupta.jpg"
import toyota from "./toyota.jpg"
import g_wagon from "./g_wagon.jpg"
import audi_a8 from "./audi_a8.jpg"
import tesla_plaid from "./tesla_plaid.jpg"
import porsche_911 from "./porsche.jpeg"
import range_rover from './range_rover.jpg'
import group from "./group.png"
import splender from "./splendor.jpeg"
import classic350 from "./classic350.jpg"
import activa6g from "./activa6g.webp"
import jupiter125 from './jupiter125.webp'
import himalayan from "./himalyan.jpg"
import access125 from "./access125.jpg"
import fz_s from './fz_s.jpeg'
import dio from "./dio.jpeg"
import pulsar_ns200 from "./pulsor_ns200.jpeg"
import ola_s1 from "./ola_s1.jpeg"
import bannerimage from './bannerimage.png'

export const cityList = [
  "Goa",
  "Manali",
  "Leh Ladakh",
  "Rishikesh",
  "Pondicherry",
  "Bangalore",
  "Udaipur",
  "Pune",
  "Jaipur",
  "Hampi",
  "Varkala",
  "Mumbai",
  "New Delhi"
];

export const assets = {
    logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    main_car,
    banner_car_image,
    car_image1,
    upload_icon,
    user_profile,
    car_image2,
    car_image3,
    car_image4,
    Car,
    carlogo,
    AnanyaSharma,
    SiddharthGupta,
    RohanMalhotra,
    toyota,
    audi_a8,
    g_wagon,
    tesla_plaid,
    range_rover,
    porsche_911,
    group,
    splender,
    classic350,
    activa6g,
    jupiter125,
    himalayan,
    access125,
    fz_s,
    dio,
    pulsar_ns200,
    ola_s1,
    bannerimage
}


export const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Bikes", path: "/bikes" },
    { name: "My Bookings", path: "/my-bookings" },
]


export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add Bike", path: "/owner/add-bike", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Bikes", path: "/owner/manage-bikes", icon: carIcon, coloredIcon: carIconColored },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
]

export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb517095",
  "name": "GreatStack",
  "email": "admin@example.com",
  "role": "owner",
  "image": user_profile,
}


export const dummyBikeData = [
    {
        "_id": "68009c93a3f5fc6338ea7e39",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Bajaj",
        "model": "Pulsar NS200",
        "image": pulsar_ns200,
        "year": 2024,
        "category": "Street Bike",
        "seating_capacity": 2,
        "fuel_type": "Petrol",
        "transmission": "Manual",
        "pricePerDay": 600,
        "location": "Delhi",
        "description": "Raw power and aggression. The NS200 is a favorite for those who want performance on a budget.",
        "features": [
            "Liquid Cooled Engine",
            "Perimeter Frame",
            "Dual Channel ABS",
            "Nitrox Mono Suspension",
            "Split Seats",
            "Clip-on Handlebars"
        ],
        "isAvailable": true,
        "createdAt": "2025-09-01T08:15:00.000Z"
    },
    {
        "_id": "68009c93a3f5fc6338ea7e40",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Ola",
        "model": "S1 Pro",
        "image": ola_s1,
        "year": 2024,
        "category": "Electric Scooter",
        "seating_capacity": 2,
        "fuel_type": "Electric",
        "transmission": "Automatic",
        "pricePerDay": 450,
        "location": "Bangalore",
        "description": "Smart, fast, and eco-friendly. Experience hyper mode acceleration and music on the go with built-in speakers.",
        "features": [
            "Touchscreen Display",
            "Cruise Control",
            "Hyper Mode",
            "Built-in Speakers",
            "Reverse Mode",
            "Keyless Unlock"
        ],
        "isAvailable": true,
        "createdAt": "2025-10-01T08:15:00.000Z"
    },
    {
        "_id": "67ff6b9f8f1b3684286a2a68",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Royal Enfield",
        "model": "Classic 350",
        "image": classic350,
        "year": 2023,
        "category": "Cruiser",
        "seating_capacity": 2,
        "fuel_type": "Petrol",
        "transmission": "Manual",
        "pricePerDay": 800,
        "location": "Manali",
        "description": "The legend reborn. Ideal for long rides and mountain terrains, offering that signature thump and rock-solid stability.",
        "features": [
            "Dual Channel ABS",
            "Digital-Analogue Cluster",
            "Tripper Navigation",
            "USB Charging Port",
            "Split Seats",
            "Halogen Headlamp"
        ],
        "isAvailable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
    {
        "_id": "68009c93a3f5fc6338ea7e34",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Hero",
        "model": "Splendor Plus",
        "image": splender,
        "year": 2022,
        "category": "Commuter",
        "seating_capacity": 2,
        "fuel_type": "Petrol",
        "transmission": "Manual",
        "pricePerDay": 250,
        "location": "Pune",
        "description": "India's mileage king. Extremely lightweight, easy to handle, and the most budget-friendly option for daily travel.",
        "features": [
            "xSens Technology",
            "i3S Start/Stop System",
            "Long Seat Comfort",
            "Tubeless Tyres",
            "Integrated Braking System",
            "High Mileage (65+ kmpl)"
        ],
        "isAvailable": true,
        "createdAt": "2025-04-17T06:15:47.318Z",
    },
    {
        "_id": "68009c93a3f5fc6338ea7e35",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Royal Enfield",
        "model": "Himalayan 411",
        "image": himalayan, 
        "year": 2024,
        "category": "Adventure",
        "seating_capacity": 2,
        "fuel_type": "Petrol",
        "transmission": "Manual",
        "pricePerDay": 1200,
        "location": "Leh Ladakh",
        "description": "Built for all roads and no roads. The Himalayan is the ultimate choice for off-road adventures and high-altitude touring.",
        "features": [
            "Switchable ABS",
            "Tripper Navigation",
            "Long Travel Suspension",
            "Hazard Lights",
            "Luggage Mounting Points",
            "Windshield Protection"
        ],
        "isAvailable": true,
        "createdAt": "2025-05-10T10:15:47.318Z",
    },
    {
        "_id": "68009c93a3f5fc6338ea7e36",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Suzuki",
        "model": "Access 125",
        "image": access125, 
        "year": 2023,
        "category": "Scooter",
        "seating_capacity": 2,
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "pricePerDay": 350,
        "location": "Hyderabad",
        "description": "A perfect blend of power and style. The Access 125 offers peppy acceleration and a retro-modern look.",
        "features": [
            "Bluetooth Connect",
            "Turn-by-Turn Navigation",
            "LED Headlamp",
            "External Fuel Lid",
            "One Push Start",
            "Chrome Mirrors"
        ],
        "isAvailable": true,
        "createdAt": "2025-06-12T12:00:00.318Z",
    },
    {
        "_id": "68009c93a3f5fc6338ea7e37",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Yamaha",
        "model": "FZ-S V3",
        "image": fz_s,
        "year": 2022,
        "category": "Street Bike",
        "seating_capacity": 2,
        "fuel_type": "Petrol",
        "transmission": "Manual",
        "pricePerDay": 500,
        "location": "Mumbai",
        "description": "Muscular styling with excellent control. The FZ-S is great for city traffic thanks to its wide handlebars and upright posture.",
        "features": [
            "Bluetooth Connectivity",
            "Single Channel ABS",
            "Wide Rear Radial Tyre",
            "LED Headlight",
            "Engine Cut-off Stand",
            "Negative LCD Console"
        ],
        "isAvailable": true,
        "createdAt": "2025-07-20T09:00:00.000Z"
    },
    {
        "_id": "68009c93a3f5fc6338ea7e38",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Honda",
        "model": "Dio",
        "image": dio,
        "year": 2023,
        "category": "Scooter",
        "seating_capacity": 2,
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "pricePerDay": 300,
        "location": "Pondicherry",
        "description": "The sporty scooter for the youth. Lightweight, nimble, and stylish, it's perfect for zipping around narrow streets.",
        "features": [
            "Digital Meter",
            "LED Headlamp",
            "Engine Start/Stop",
            "Side Stand Cut-off",
            "External Fuel Fill",
            "Sporty Graphics"
        ],
        "isAvailable": true,
        "createdAt": "2025-08-15T10:30:00.000Z"
    },
     {
        "_id": "67ff5bc069c03d4e45f30b77",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "Honda",
        "model": "Activa 6G",
        "image": activa6g,
        "year": 2023,
        "category": "Scooter",
        "seating_capacity": 2,
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "pricePerDay": 350, // Affordable daily rate
        "location": "Goa",
        "description": "The most reliable scooter in India. Perfect for city hopping and beach runs with excellent mileage and storage space.",
        "features": [
            "Silent Start System",
            "External Fuel Fill",
            "Telescopic Suspension",
            "LED Headlamp",
            "Engine Start/Stop Switch",
            "18L Under-seat Storage"
        ],
        "isAvailable": true,
        "createdAt": "2025-04-16T07:26:56.215Z",
    }, {
        "_id": "67ff6b758f1b3684286a2a65",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "brand": "TVS",
        "model": "Jupiter 125",
        "image": jupiter125,
        "year": 2022,
        "category": "Scooter",
        "seating_capacity": 2,
        "fuel_type": "Petrol",
        "transmission": "Automatic",
        "pricePerDay": 300,
        "location": "Bangalore",
        "description": "Known for its superior comfort and 'Zyada' features. The Jupiter offers the largest under-seat storage in its class.",
        "features": [
            "33L Under-seat Storage",
            "Front Fuel Fill",
            "Mobile Charging Port",
            "Adjustable Rear Shocks",
            "IntelliGO Start/Stop",
            "Metal Body Durability"
        ],
        "isAvailable": true,
        "createdAt": "2025-04-16T08:33:57.993Z",
    }
];

export const CustomerData = [
  {
    "id": 1,
    "name": "Ananya Sharma",
    "location": "Vasant Kunj, Delhi",
    "image": AnanyaSharma,
    "testimonial": "I've rented scooters from various places, but RentRide offers the best condition two-wheelers. Exploring the city was a breeze!"
  },
  {
    "id": 2,
    "name": "Siddharth Gupta",
    "location": "Gurugram, Haryana",
    "image": SiddharthGupta,
    "testimonial": "RentRide made my weekend trip so much easier. The bike was delivered right to my doorstep, and the mileage was fantastic."
  },
  {
    "id": 3,
    "name": "Rohan Malhotra",
    "location": "Mumbai, Maharashtra",
    "image": RohanMalhotra,
    "testimonial": "I highly recommend RentRide! Beating Mumbai traffic is only possible on two wheels, and their premium bikes made it stylish too."
  }
]


export const dummyMyBookingsData = [
    {
        "_id": "68482bcc98eb9722b7751f70",
        "bike": dummyBikeData[0], // Updated key from 'car' to 'bike'
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-13T00:00:00.000Z",
        "returnDate": "2025-06-14T00:00:00.000Z",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T12:57:48.244Z",
    },
    {
        "_id": "68482bb598eb9722b7751f60",
        "bike": dummyBikeData[1],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-12T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 130,
        "createdAt": "2025-06-10T12:57:25.613Z",
    },
    {
        "_id": "684800fa0fb481c5cfd92e56",
        "bike": dummyBikeData[2],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 600,
        "createdAt": "2025-06-10T09:55:06.379Z",
    },
    {
        "_id": "6847fe790fb481c5cfd92d94",
        "bike": dummyBikeData[3],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "confirmed",
        "price": 440,
        "createdAt": "2025-06-10T09:44:25.410Z",
    }
]


export const dummyDashboardData = {
    "totalBikes": 10, // Updated key
    "totalBookings": 2,
    "pendingBookings": 0,
    "completedBookings": 2,
    "recentBookings": [
        dummyMyBookingsData[0],
        dummyMyBookingsData[1]
    ],
    "monthlyRevenue": 840
}