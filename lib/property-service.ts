import type { Property, Review } from "@/lib/types";

// Mock data imports - remove when connecting to real database
import {
  mockProperties,
  getMockPropertyById,
  getMockPropertyReviews,
} from "@/lib/mock-data";

// Get properties
export async function getProperties(
  lastVisible: any = null,
  pageSize = 10,
  filters: any = {}
) {
  try {
    // Use mock data instead of Firestore
    let properties = [...mockProperties];

    // Apply filters
    if (filters.minPrice) {
      properties = properties.filter((p) => p.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      properties = properties.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters.rooms && filters.rooms > 0) {
      properties = properties.filter((p) => p.rooms >= filters.rooms);
    }

    if (filters.riskLevel && filters.riskLevel !== "any") {
      properties = properties.filter((p) => p.riskLevel === filters.riskLevel);
    }

    // Sort by createdAt (newest first)
    properties.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Simulate pagination
    const startIndex = lastVisible
      ? mockProperties.findIndex((p) => p.id === lastVisible.id) + 1
      : 0;
    const paginatedProperties = properties.slice(
      startIndex,
      startIndex + pageSize
    );

    const lastDoc =
      paginatedProperties.length > 0
        ? paginatedProperties[paginatedProperties.length - 1]
        : null;

    return {
      properties: paginatedProperties,
      lastVisible: lastDoc,
      hasMore: startIndex + pageSize < properties.length,
    };
  } catch (error) {
    console.error("Error getting properties:", error);
    throw error;
  }
}

// Search properties
export async function searchProperties(query: string) {
  try {
    if (!query) return [];

    const lowercaseQuery = query.toLowerCase();

    return mockProperties.filter(
      (property) =>
        property.address.toLowerCase().includes(lowercaseQuery) ||
        property.landlordName.toLowerCase().includes(lowercaseQuery) ||
        property.title.toLowerCase().includes(lowercaseQuery)
    );
  } catch (error) {
    console.error("Error searching properties:", error);
    throw error;
  }
}

// Get property by ID
export async function getPropertyById(id: string) {
  try {
    const property = getMockPropertyById(id);

    if (property) {
      return property;
    } else {
      throw new Error("Property not found");
    }
  } catch (error) {
    console.error("Error getting property:", error);
    throw error;
  }
}

// Get property reviews
export async function getPropertyReviews(propertyId: string) {
  try {
    return getMockPropertyReviews(propertyId);
  } catch (error) {
    console.error("Error getting property reviews:", error);
    throw error;
  }
}

// Add a new review
export async function addReview(
  review: Omit<
    Review,
    "id" | "createdAt" | "updatedAt" | "helpful" | "reported"
  >
) {
  try {
    // Create a new review with mock data
    const newReview: Review = {
      id: `review-${Date.now()}`,
      ...review,
      createdAt: new Date(),
      updatedAt: new Date(),
      helpful: 0,
      reported: false,
    };

    // In a real app, we would add this to Firestore
    // For now, we'll just log it
    console.log("New review added:", newReview);

    // Return the new review
    return newReview;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}

// Add a new property
export async function addProperty(
  property: Omit<Property, "id" | "createdAt" | "updatedAt">
) {
  try {
    // Create a new property with mock data
    const newProperty: Property = {
      id: `property-${Date.now()}`,
      ...property,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Property;

    // In a real app, we would add this to Firestore
    // For now, we'll just log it
    console.log("New property added:", newProperty);

    // Return the new property
    return newProperty;
  } catch (error) {
    console.error("Error adding property:", error);
    throw error;
  }
}

// Update an existing property
export async function updateProperty(id: string, updates: Partial<Property>) {
  try {
    // In a real app, we would update this in Firestore
    // For now, we'll just log it
    console.log(`Property ${id} updated with:`, updates);

    // Return the updated property
    return {
      id,
      ...updates,
    };
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
}

// Delete a property
export async function deleteProperty(id: string) {
  try {
    // In a real app, we would delete this from Firestore
    // For now, we'll just log it
    console.log(`Property ${id} deleted`);
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
}
