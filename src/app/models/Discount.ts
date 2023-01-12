import { provideCloudflareLoader } from "@angular/common";

export interface Discount {
  id: string;
  title: string;
  categories: string;
  expirydate: string;
  content: string;
  user: string | null;
  newprice: string;
  oldprice: string;
  shop: string;
  location: string;
  imagePath: string | File;
} 
