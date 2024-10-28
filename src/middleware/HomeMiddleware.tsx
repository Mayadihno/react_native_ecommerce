import axios from "axios";
import { FetchProductParams, ProductListParams } from "../types/Hometypes";

interface ICatProp {
  setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}
interface IProProp {
  setTrendingDeals: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}
interface IFProProp {
  setFeaturedproduct: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

interface IProdByCatProps {
  setGetCategoryCatId: React.Dispatch<
    React.SetStateAction<ProductListParams[]>
  >;
  catId: string;
}

export const customAxios = axios.create({
  baseURL: "http://192.168.43.206:8084",
  withCredentials: true,
});

export const fetchCategories = async ({ setGetCategory }: ICatProp) => {
  try {
    const res: FetchProductParams = await customAxios.get(
      "/category/getAllCategories"
    );
    const { data } = res.data;
    setGetCategory(data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchProductByCatId = async ({
  setGetCategoryCatId,
  catId,
}: IProdByCatProps) => {
  try {
    let res: FetchProductParams;
    if (catId) {
      res = await customAxios.get(`/product/getProductByCatId/${catId}`);
    } else {
      res = await customAxios.get(`/product/getAllProduct`);
    }
    const { data } = res.data;
    setGetCategoryCatId(data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchTrendingDeals = async ({ setTrendingDeals }: IProProp) => {
  try {
    const res: FetchProductParams = await customAxios.get(
      "/product/trendingProduct"
    );
    const { data } = res.data;
    setTrendingDeals(data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchFeaturedProduct = async ({
  setFeaturedproduct,
}: IFProProp) => {
  try {
    const res: FetchProductParams = await customAxios.get(
      "/product/featuredProduct"
    );
    const { data } = res.data;
    setFeaturedproduct(data);
  } catch (error) {
    console.error(error);
  }
};
