import { ReactNode } from "react";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export interface MainContentProps {
  children?: ReactNode;
}

export interface User {
  id: number;
  name: string;
  photo: string;
  breed: string;
  color: string;
  gender: string;
  birthDate: string;
  ownerName: string;
  feedType: string;
  feedFrequency: string;
  serveSnack: boolean;
}

export interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

export interface Feeding {
  foodType: string;
  feedingFrequency: string;
  serveSnack: boolean;
  snackName: string;
}

export interface Dog {
  _id: string;
  name: string;
  breed: string;
  color: string;
  gender: string;
  birthDate: string;
  age: string;
  selectedImageName: string;
  ownerName: string;
  profileImage: string;
  feeding: Feeding;
  __v: number;
}

export interface PetCardProps {
  dog: Dog;
}

export interface ModalPropsPet {
  isOpen: boolean;
  closeModal: () => void;
  user: User | null;
}

export interface Menu {
  title: string;
  icon: JSX.Element;
  link: string;
  gap?: boolean;
}

export interface SidebarProps {
  children?: ReactNode;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IDogs {
  _id: string;
  name: string;
  breed: string;
  color: string;
  gender: string;
  birthDate: string;
  age: string;
  selectedImageName: string;
  ownerName: string;
  feeding: {
    foodType: string;
    feedingFrequency: string;
    serveSnack: boolean;
    snackName: string;
  };
  profileImage: File | null | undefined;
}

export interface FormState {
  dog: IDogs;
}
