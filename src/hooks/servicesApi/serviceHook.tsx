import { useQuery } from "react-query";
import { HTTPService } from "../../services";

export interface IApiDogs {
  dogs: Dog[];
}

export interface Dog {
  feeding: Feeding;
  _id: string;
  name: string;
  breed: string;
  color: string;
  gender: string;
  birthDate: Date;
  age: string;
  selectedImageName: string;
  ownerName: string;
  profileImage: string;
}

export interface Feeding {
  foodType: string;
  feedingFrequency: string;
  serveSnack: boolean;
  snackName: string;
}

export const useGetDogs = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["dogs"],
    queryFn: () => {
      const response = HTTPService.get<IApiDogs>(
        "http://localhost:8000/register/dogs"
      ).then((res) => res.data);
      return response;
    },
  });

  return { data, error, isLoading };
};
