import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Profile.module.scss';
import profilePic from '../assets/images/profile-pic.jpg';

const Profile: React.FC = () => {
  //const [userData, setUserData] = useState(null);
  const [userData, setUserData] = useState<{ name: string; lastname: string; username: string; email: string } | null>(null);

   useEffect(() => {
    const token = localStorage.getItem('token'); // Obtener el token desde el almacenamiento local
    if (token) {
      axios
        .get('http://localhost:5001/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en los encabezados
          },
        })
        .then((response) => {
          setUserData(response.data); // Establecer los datos del perfil
        })
        .catch((error) => {
          console.error('Error al obtener el perfil:', error);
        });
    }
  }, []);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileLeft}>
        <img src={profilePic} alt="Foto de perfil" className={styles.profilePic} />
      </div>

       <div className={styles.profileRight}>
        <div className={styles.profileHeader}>
          <h2>Mi Perfil</h2>
        </div>

      {userData ? (
          <div className={styles.profileInfo}>
            <p><strong>Nombre Completo:</strong> {userData?.username || 'N/A'}</p>
            <p><strong>Nick:</strong> {userData?.username || 'N/A'}</p>
            <p><strong>Email:</strong> {userData?.email || 'N/A'}</p>
            <p><strong>Teléfono:</strong> 981723090</p>
          </div>
      ) : (
        <p>Cargando datos...</p>
      )}
      </div>
    </div>
  );
};

export default Profile;
