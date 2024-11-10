import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  //const [userData, setUserData] = useState(null);
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);

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
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
          <p>Nombre de usuario: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default Profile;
