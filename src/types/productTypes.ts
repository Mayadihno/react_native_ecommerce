export interface IProductProps {
  item: {
    _id: string;
    images: [string];
    name: string;
    price: number;
    quantity?: number;
    category?: string;
  };
  productProps: {
    onPress?: () => void;
    imageBg?: string;
    percentageWidth?: number;
  };
  pStylesProp: {
    width?: number;
    height?: number;
    resizeMode?: "contain" | "cover" | "stretch";
    marginBottom?: number;
    marginHorizontal?: number;
  };
}
