import React, { ReactNode } from "react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
};

const HomeModal: React.FC<ModalProps> = ({ open, onClose, children }: ModalProps) => {
    return (
        <div
            className={`fixed inset-0 flex justify-center items-start pt-6
        transition-colors ${open ? "visible bg-black/50" : "invisible"}`}
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-md 
          transition-all ${open ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">
                        Bem vindo(a), ao ambiente administrativo do tutor.
                    </h2>
                    <button
                        className="text-gray-600 hover:text-gray-800 focus:outline-none pb-12"
                        onClick={onClose}
                    >
                        X
                    </button>
                </div>
                <hr className="mb-3 sm:mb-6 border-gray-300" />
                {children}
            </div>
        </div>
    );
};

export default HomeModal;
