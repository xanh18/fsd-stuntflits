import { provideCloudflareLoader } from "@angular/common";

export interface Discount {
  id: string;
  title: string;
  category: string;
  expirydate: string;
  content: string;
  newprice: string;
  oldprice: string;
  shop: string;
  location: string;
}
