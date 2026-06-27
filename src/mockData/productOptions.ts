export type ProductOption = {
  id: string;
  productId: string;
  color: string;
  icon: string;
};

const CAM_V4 = "/products/wyze-cam-v4.png";
const CAM_PAN_V3 = "/products/wyze-cam-pan-v3.png";
const CAM_FLOODLIGHT = "/products/wyze-cam-floodlight-v2.png";
const CAM_BATTERY_PRO = "/products/wyze-battery-cam-pro.png";

export const PRODUCT_OPTIONS_DATA: ProductOption[] = [
  // Wyze Cam v4
  {
    id: "wyze-cam-v4-white",
    productId: "wyze-cam-v4",
    color: "White",
    icon: CAM_V4,
  },
  {
    id: "wyze-cam-v4-grey",
    productId: "wyze-cam-v4",
    color: "Grey",
    icon: CAM_V4,
  },
  {
    id: "wyze-cam-v4-black",
    productId: "wyze-cam-v4",
    color: "Black",
    icon: CAM_V4,
  },

  // Wyze Cam Pan v3
  {
    id: "wyze-cam-pan-v3-white",
    productId: "wyze-cam-pan-v3",
    color: "White",
    icon: CAM_PAN_V3,
  },
  {
    id: "wyze-cam-pan-v3-black",
    productId: "wyze-cam-pan-v3",
    color: "Black",
    icon: CAM_PAN_V3,
  },

  // Wyze Cam Floodlight v2
  {
    id: "wyze-cam-floodlight-v2-white",
    productId: "wyze-cam-floodlight-v2",
    color: "White",
    icon: CAM_FLOODLIGHT,
  },
  {
    id: "wyze-cam-floodlight-v2-black",
    productId: "wyze-cam-floodlight-v2",
    color: "Black",
    icon: CAM_FLOODLIGHT,
  },

  // Wyze Battery Cam Pro
  {
    id: "wyze-battery-cam-pro-white",
    productId: "wyze-battery-cam-pro",
    color: "White",
    icon: CAM_BATTERY_PRO,
  },
  {
    id: "wyze-battery-cam-pro-black",
    productId: "wyze-battery-cam-pro",
    color: "Black",
    icon: CAM_BATTERY_PRO,
  },

  // Wyze Sense Entry Sensor
  {
    id: "wyze-sense-entry-white",
    productId: "wyze-sense-entry",
    color: "White",
    icon: CAM_V4,
  },
  {
    id: "wyze-sense-entry-black",
    productId: "wyze-sense-entry",
    color: "Black",
    icon: CAM_V4,
  },

  // Wyze Cam Outdoor Cover
  {
    id: "wyze-cam-cover-white",
    productId: "wyze-cam-cover",
    color: "White",
    icon: CAM_V4,
  },
  {
    id: "wyze-cam-cover-black",
    productId: "wyze-cam-cover",
    color: "Black",
    icon: CAM_V4,
  },
  {
    id: "wyze-cam-cover-camo",
    productId: "wyze-cam-cover",
    color: "Camo",
    icon: CAM_V4,
  },
];
