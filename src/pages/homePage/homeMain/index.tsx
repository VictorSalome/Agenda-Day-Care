import React, { useState } from 'react';
import dogHome from '../../../assets/dogHome.png'
import HomeModal from './homeModal';

const HomeMain = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);


    const backgroundStyle: React.CSSProperties = {
        position: 'relative',
        backgroundImage: `url(${dogHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const titleStyle: React.CSSProperties = {
        fontFamily: 'Josefin Sans, sans-serif',
        fontSize: '1.5rem',
        color: 'black',
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex h-screen p-10" style={backgroundStyle}>
            {isModalOpen && (
                <HomeModal open={isModalOpen} onClose={handleCloseModal}>


                    <h1 style={titleStyle}>
                        Olá, Rebeca! Como está? Ao lado, você encontrará o painel de funcionalidades. Sinta-se à vontade para explorar de acordo com as suas necessidades.
                    </h1>
                </HomeModal>
            )}

        </div>
    );
};

export default HomeMain;
