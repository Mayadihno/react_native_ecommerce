export interface ICatProps {
  item: {
    _id: string;
    images: [string];
    name: string;
  };
  catProps: {
    activeCat?: string;
    onPress?: () => void;
    imageBg?: string;
  };
  catStylesProp: {
    imageBgHt?: string;
    width?: number;
    height?: number;
    radius?: number;
    resizeMode?: "contain" | "cover" | "stretch";
  };
}
