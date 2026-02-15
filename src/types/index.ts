export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  category: string | ICategory;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IHeroSlide {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  image: string;
  imageMobile?: string;
  order?: number;
  isActive?: boolean;
}

export interface ITestimonial {
  _id?: string;
  id?: string;
  name: string;
  role?: string;
  review: string;
  rating?: number;
  image?: string;
  isActive?: boolean;
}

export interface IContact {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface ISiteSettings {
  companyName: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  phonePrimary: string;
  phoneSecondary?: string;
  emailPrimary: string;
  addressStreet: string;
  addressArea?: string;
  addressCity: string;
  addressState: string;
  addressPincode: string;
  googleMapsEmbed?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}
