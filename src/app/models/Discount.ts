import { provideCloudflareLoader } from "@angular/common";

export interface Discount {
  id: string;
  title: string;
  categories: string;
  expirydate: string;
  content: string;
  newprice: string;
  oldprice: string;
  shop: string;
  location: string;
  imagePath: string | File;
}
