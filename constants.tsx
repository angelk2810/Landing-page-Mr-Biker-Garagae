
import React from 'react';
import { Wrench, Settings, Droplets, Zap, ShieldCheck, Clock, Users, BadgeCheck, Paintbrush } from 'lucide-react';
import { ServiceCard, FeatureCard, ShowcaseItem } from './types';

export const BUSINESS_INFO = {
  name: "Mr Biker Garage Dindigul",
  phone: "9360992002",
  whatsapp: "9360992002",
  address: "EVR Road, Ashok Nagar, Dindigul – 624001, Tamil Nadu",
  experience: "2 Years in Business",
  hours: "Open until 7:00 PM"
};

export const SERVICES: ServiceCard[] = [
  {
    title: "General Bike Service",
    description: "Complete health check-up and routine maintenance for all bike models.",
    image: "https://thumbs.dreamstime.com/z/chain-tensioning-motorcycle-maintenance-service-essential-smooth-riding-drivetrain-longevity-tuning-improves-torque-387854989.jpg?ct=jpeg"
  },
  {
    title: "Engine Repair",
    description: "Expert engine diagnostics, rebuilds, and performance tuning.",
    image: "https://img.freepik.com/premium-photo/motorcycle-engine-repair_41050-1116.jpg"
  },
  {
    title: "Oil Change",
    description: "Premium synthetic and mineral oil replacements for peak performance.",
    image: "https://i0.wp.com/gandharoil.com/wp-content/uploads/2021/11/Image-1-How-to-Change-Engine-Oil-in-Bikes.webp?w=800&ssl=1"
  },
  {
    title: "Brake Service",
    description: "Disc and drum brake maintenance for ultimate safety on the road.",
    image: "https://mcn-images.bauersecure.com/wp-images/203161/822x548/step_2a.jpg"
  },
  {
    title: "Chain Sprocket Service",
    description: "Cleaning, lubrication, and replacement of drive train components.",
    image: "https://cdn.shopify.com/s/files/1/0257/8956/2977/files/Clean_a_motorcycle.jpg?v=1615627400"
  },
  {
    title: "Lighting Installation",
    description: "When the road goes dark, we light the way.",
    image: "https://images.pexels.com/photos/18865724/pexels-photo-18865724.jpeg?_gl=1*11t4foq*_ga*MTYxMDY0NjIxLjE3NjkyNjg4NDI.*_ga_8JE65Q40S6*czE3NjkyNjg4NDEkbzEkZzAkdDE3NjkyNjg4NDEkajYwJGwwJGgw"
  },
  {
    title: "Custom Paint & Wrap",
    description: "Premium aesthetic upgrades with professional finish and durability.",
    image: "https://www.shutterstock.com/image-photo/car-polish-wax-worker-hands-260nw-1238874430.jpg"
  },
  {
    title: "Bike Modification",
    description: "Transform your ride with custom parts and unique styling.",
    image: "https://cms-img.coverfox.com/things-to-know-before-modifying-your-two-wheeler%20(1).jpg"
  },
  {
    title: "Performance Upgrade",
    description: "Exhaust systems, air filters, and ECU remapping for more power.",
    image: "https://jfgmotor.com/cdn/shop/articles/enhance-your-ride-dirt-bike-parts-and-accessories-guide-jfg-racing_900x.jpg?v=1724295173"
  }
];

export const SHOWCASE: ShowcaseItem[] = [
  {
    before: "https://images.unsplash.com/photo-1595691403533-7f4a52a5b189?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    after: "https://i.pinimg.com/736x/50/91/82/50918280f82a09b5f15327c843ac3f3f.jpg",
    title: "Cafe Racer Conversion"
  },
  {
    before: "https://i.pinimg.com/736x/d2/9e/86/d29e866eac933728d52e2b88e54d3340.jpg",
    after: "https://i.pinimg.com/736x/86/70/2a/86702a48e8f6c67017410952656d7873.jpg",
    title: "Sports Bike Wrap"
  },
  {
    before: "https://i.pinimg.com/1200x/32/3a/63/323a6343f118d772b1eb193b80a088c7.jpg",
    after: "https://i.pinimg.com/736x/45/5d/16/455d16a96b17c51fe204a4ea5bf88deb.jpg",
    title: "Custom Exhaust Fitment"
  }
];

export const FEATURES: FeatureCard[] = [
  {
    title: "Experienced Mechanics",
    icon: "Users",
    description: "Hands-on expertise in multi-brand superbikes and daily commuters."
  },
  {
    title: "Genuine Spare Parts",
    icon: "ShieldCheck",
    description: "We use only authentic OEM parts to ensure your bike's longevity."
  },
  {
    title: "Affordable Pricing",
    icon: "Zap",
    description: "Premium service quality at competitive market rates."
  },
  {
    title: "On-Time Delivery",
    icon: "Clock",
    description: "Respecting your schedule with prompt and efficient service cycles."
  },
  {
    title: "Customer Satisfaction",
    icon: "BadgeCheck",
    description: "A community of happy riders who trust us with their machines."
  }
];
