export type Product = {
  id: string;
  stepId: string;
  name: string;
  productIcon: string;
  description: string;
  discountPercent?: number;
  priceBefore?: number;
  priceAfter: number;
};

const CAM_V4 = "/products/wyze-cam-v4.png";
const CAM_PAN_V3 = "/products/wyze-cam-pan-v3.png";
const CAM_FLOODLIGHT = "/products/wyze-cam-floodlight-v2.png";
const CAM_DUO_DOORBELL = "/products/wyze-duo-cam-doorbell.png";
const CAM_BATTERY_PRO = "/products/wyze-battery-cam-pro.png";
const MICROSD_256 = "/products/wyze-microsd-256.png";
const SENSE_HUB = "/products/wyze-sense-hub.png";
const SENSE_SMALL = "/products/wyze-sense-motion.png";
const PLAN_ICON = "/products/wyze-plan.png";

export const PRODUCTS_DATA: Product[] = [
  // ---------- Cameras ----------
  {
    id: "wyze-cam-v4",
    stepId: "cameras",
    name: "Wyze Cam v4",
    productIcon: CAM_V4,
    description: "The clearest Wyze Cam ever made.",
    discountPercent: 22,
    priceBefore: 35.98,
    priceAfter: 27.98,
  },
  {
    id: "wyze-cam-pan-v3",
    stepId: "cameras",
    name: "Wyze Cam Pan v3",
    productIcon: CAM_PAN_V3,
    description: "360° pan and 180° tilt security camera.",
    discountPercent: 12,
    priceBefore: 39.98,
    priceAfter: 34.98,
  },
  {
    id: "wyze-cam-floodlight-v2",
    stepId: "cameras",
    name: "Wyze Cam Floodlight v2",
    productIcon: CAM_FLOODLIGHT,
    description:
      "2K floodlight camera with a 160° wide-angle view for your garage.",
    discountPercent: 22,
    priceBefore: 89.98,
    priceAfter: 69.98,
  },
  {
    id: "wyze-duo-cam-doorbell",
    stepId: "cameras",
    name: "Wyze Duo Cam Doorbell",
    productIcon: CAM_DUO_DOORBELL,
    description: "Two cameras. Two views. Double the porch protection.",
    priceAfter: 69.98,
  },
  {
    id: "wyze-battery-cam-pro",
    stepId: "cameras",
    name: "Wyze Battery Cam Pro",
    productIcon: CAM_BATTERY_PRO,
    description:
      "Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.",
    priceAfter: 89.98,
  },

  // ---------- Plan ----------
  {
    id: "cam-unlimited-monthly",
    stepId: "plan",
    name: "Cam Unlimited (Monthly)",
    productIcon: PLAN_ICON,
    description:
      "Unlimited cameras, 14-day cloud history, person & package detection.",
    discountPercent: 23,
    priceBefore: 12.99,
    priceAfter: 9.99,
  },
  {
    id: "cam-unlimited-annual",
    stepId: "plan",
    name: "Cam Unlimited (Annual)",
    productIcon: PLAN_ICON,
    description: "Same features as monthly — save more when you pay yearly.",
    discountPercent: 35,
    priceBefore: 155.88,
    priceAfter: 99.99,
  },
  {
    id: "cam-plus-lite",
    stepId: "plan",
    name: "Cam Plus Lite",
    productIcon: PLAN_ICON,
    description: "Pay-what-you-want plan with basic event recording.",
    priceAfter: 0,
  },

  // ---------- Sensors ----------
  {
    id: "wyze-sense-hub",
    stepId: "sensors",
    name: "Wyze Sense Hub (Required)",
    productIcon: SENSE_HUB,
    description:
      "The brain of your sensor network. Required for sensors to work.",
    discountPercent: 100,
    priceBefore: 29.92,
    priceAfter: 0,
  },
  {
    id: "wyze-sense-motion",
    stepId: "sensors",
    name: "Wyze Sense Motion Sensor",
    productIcon: SENSE_SMALL,
    description:
      "Detects motion in a 25-foot range and triggers actions in seconds.",
    priceAfter: 29.99,
  },
  {
    id: "wyze-sense-entry",
    stepId: "sensors",
    name: "Wyze Sense Entry Sensor",
    productIcon: SENSE_SMALL,
    description:
      "Know the moment a door or window opens — magnet-paired contact sensor.",
    priceAfter: 19.99,
  },
  {
    id: "wyze-sense-climate",
    stepId: "sensors",
    name: "Wyze Climate Sensor",
    productIcon: SENSE_SMALL,
    description: "Track temperature and humidity in any room of your home.",
    priceAfter: 24.99,
  },

  // ---------- Extras ----------
  {
    id: "wyze-microsd-256",
    stepId: "extras",
    name: "Wyze MicroSD Card (256GB)",
    productIcon: MICROSD_256,
    description: "High-endurance local storage for continuous recording.",
    discountPercent: 15,
    priceBefore: 49.99,
    priceAfter: 41.96,
  },
  {
    id: "wyze-solar-panel",
    stepId: "extras",
    name: "Wyze Solar Panel",
    productIcon: CAM_BATTERY_PRO,
    description: "Keep Battery Cam Pro charged with continuous solar power.",
    priceAfter: 39.99,
  },
  {
    id: "wyze-cam-cover",
    stepId: "extras",
    name: "Wyze Cam Outdoor Cover",
    productIcon: CAM_V4,
    description:
      "Weather-resistant silicone cover. Protects from rain and UV.",
    priceAfter: 7.99,
  },
];
