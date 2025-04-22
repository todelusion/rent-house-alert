import type { Property, Review, Landlord } from "@/lib/types";

// Mock landlords
export const mockLandlords: Landlord[] = [
  {
    id: "landlord-1",
    name: "張先生",
    properties: 5,
    averageRating: 2.3,
    reviewCount: 12,
    riskScore: 85,
    riskLevel: "high",
    riskFactors: ["多起租金糾紛紀錄", "未依約返還押金", "私自進入房屋"],
  },
  {
    id: "landlord-2",
    name: "李小姐",
    properties: 3,
    averageRating: 3.7,
    reviewCount: 8,
    riskScore: 45,
    riskLevel: "medium",
    riskFactors: ["拒絕修繕房屋問題", "租約內容不合理"],
  },
  {
    id: "landlord-3",
    name: "王先生",
    properties: 8,
    averageRating: 4.5,
    reviewCount: 15,
    riskScore: 15,
    riskLevel: "low",
    riskFactors: ["偶有溝通不良情況"],
  },
];

// Mock properties
export const mockProperties: Property[] = [
  {
    id: "property-1",
    title: "信義區豪華兩房公寓",
    address: "台北市信義區松仁路100號",
    price: 35000,
    size: 25,
    rooms: 2,
    bathrooms: 1,
    description:
      "位於信義區核心地段的豪華公寓，鄰近捷運站，生活機能完善，附近有百貨公司、超市和各式餐廳。\n\n公寓內部裝潢精美，採光良好，設備齊全，包含冷氣、洗衣機、冰箱等家電。\n\n社區環境安全寧靜，設有24小時保全和監控系統。",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    landlordId: "landlord-1",
    landlordName: "張先生",
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-15"),
    riskScore: 85,
    riskLevel: "high",
    riskFactors: ["房東有多起租金糾紛紀錄", "建築結構安全疑慮", "多次淹水紀錄"],
  },
  {
    id: "property-2",
    title: "大安區溫馨三房套房",
    address: "台北市大安區 XX 路",
    price: 42000,
    size: 30,
    rooms: 3,
    bathrooms: 2,
    description:
      "位於大安區的舒適三房套房，鄰近大安森林公園，環境清幽。步行可達捷運站，交通便利。\n\n室內空間寬敞，採光良好，附有陽台。家具家電齊全，可立即入住。\n\n社區管理完善，有門禁系統和管理員。",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    landlordId: "landlord-2",
    landlordName: "李小姐",
    createdAt: new Date("2023-06-20"),
    updatedAt: new Date("2023-06-20"),
    riskScore: 45,
    riskLevel: "medium",
    riskFactors: ["噪音問題", "管線老舊"],
  },
  {
    id: "property-3",
    title: "中山區現代風格一房",
    address: "台北市中山區 XX 路",
    price: 28000,
    size: 18,
    rooms: 1,
    bathrooms: 1,
    description:
      "位於中山區的現代風格一房，裝潢簡約時尚，空間規劃合理。\n\n鄰近捷運中山站，周邊商圈繁華，生活便利。\n\n公寓大廳有管理員，安全有保障。適合單身或小家庭入住。",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    landlordId: "landlord-3",
    landlordName: "王先生",
    createdAt: new Date("2023-07-05"),
    updatedAt: new Date("2023-07-05"),
    riskScore: 15,
    riskLevel: "low",
    riskFactors: ["社區管理不佳"],
  },
  {
    id: "property-4",
    title: "松山區精緻兩房",
    address: "台北市松山區 XX 路",
    price: 32000,
    size: 22,
    rooms: 2,
    bathrooms: 1,
    description:
      "松山區精緻兩房，近捷運站，交通便利。\n\n室內裝修精美，家具家電齊全。\n\n社區環境優美，適合小家庭居住。",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    landlordId: "landlord-2",
    landlordName: "李小姐",
    createdAt: new Date("2023-08-10"),
    updatedAt: new Date("2023-08-10"),
    riskScore: 30,
    riskLevel: "low",
    riskFactors: ["偶有噪音問題"],
  },
  {
    id: "property-5",
    title: "內湖區河景三房",
    address: "台北市內湖區 XX 路",
    price: 38000,
    size: 28,
    rooms: 3,
    bathrooms: 2,
    description:
      "內湖區河景三房，視野開闊，環境清幽。\n\n室內空間寬敞，採光良好，附有大陽台。\n\n社區設有健身房和游泳池，生活品質高。",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    landlordId: "landlord-3",
    landlordName: "王先生",
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-09-15"),
    riskScore: 20,
    riskLevel: "low",
    riskFactors: ["偶有停車位不足問題"],
  },
];

// Mock reviews
export const mockReviews: Review[] = [
  {
    id: "review-1",
    propertyId: "property-1",
    userId: "user-1",
    userName: "陳小明",
    rating: 2,
    content: "房東態度不佳，退租時刁難扣押金，房屋漏水問題一直沒修好。",
    pros: "交通便利，生活機能好",
    cons: "房東不負責任，房屋有漏水問題",
    images: [
      "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    createdAt: new Date("2023-06-10"),
    updatedAt: new Date("2023-06-10"),
    helpful: 15,
    reported: false,
  },
  {
    id: "review-2",
    propertyId: "property-1",
    userId: "user-2",
    userName: "林小華",
    rating: 1,
    content: "房東私自進入房屋，嚴重侵犯隱私，而且房屋有嚴重的霉味問題。",
    pros: "地點方便",
    cons: "房東侵犯隱私，房屋有霉味",
    images: [],
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2023-07-15"),
    helpful: 20,
    reported: false,
  },
  {
    id: "review-3",
    propertyId: "property-2",
    userId: "user-3",
    userName: "張小芳",
    rating: 4,
    content: "整體居住體驗不錯，房東回應迅速，但偶有噪音問題。",
    pros: "房東回應迅速，環境整潔",
    cons: "偶有噪音問題",
    images: [],
    createdAt: new Date("2023-08-20"),
    updatedAt: new Date("2023-08-20"),
    helpful: 8,
    reported: false,
  },
  {
    id: "review-4",
    propertyId: "property-3",
    userId: "user-4",
    userName: "王小明",
    rating: 5,
    content: "非常滿意的租屋體驗，房東友善，房屋狀況良好，生活機能佳。",
    pros: "房東友善，房屋狀況良好，生活機能佳",
    cons: "無",
    images: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    createdAt: new Date("2023-09-25"),
    updatedAt: new Date("2023-09-25"),
    helpful: 12,
    reported: false,
  },
];

// Helper function to get reviews for a specific property
export function getMockPropertyReviews(propertyId: string): Review[] {
  return mockReviews.filter((review) => review.propertyId === propertyId);
}

// Helper function to get a property by ID
export function getMockPropertyById(id: string): Property | undefined {
  return mockProperties.find((property) => property.id === id);
}
