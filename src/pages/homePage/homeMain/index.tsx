import React, { useState } from 'react';
import dogHome from '../../../assets/dogHome.png';
import HomeModal from './homeModal';

const HomeMain = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const backgroundStyle: React.CSSProperties = {
        position: 'relative',
        backgroundImage: `url(${dogHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',  // Adiciona altura total da viewport
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '1rem',  // Ajusta o tamanho da fonte para dispositivos menores
        color: 'black',
        maxWidth: '300px',  // Limita a largura para melhor legibilidade
        margin: 'auto',  // Centraliza o texto horizontalmente
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex items-center justify-center" style={backgroundStyle}>
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
