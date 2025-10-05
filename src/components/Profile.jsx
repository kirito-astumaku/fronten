import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='bg-zinc-900 w-[475px] h-[217px] p-5'>
      {isAuthenticated && user ? (
        <div className='w-full h-max border-4 border-sky-700 text-center rounded-lg p-4 text-white text-lg'>
          <h1>User: {user?.username}</h1>
          <h1>Email: {user?.email}</h1>
          <h1>Password: ********</h1>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className='bg-sky-700 p-2 mt-3 rounded-lg'
          >
            Logout
          </button>
        </div>
      ) : (
        <div className='text-white text-center'>
          <h1>No has iniciado sesión</h1>
          <p>
            <a href="/login" className="text-sky-500 underline">Inicia sesión</a> para ver tu perfil.
          </p>
        </div>
      )}
    </div>
  );
}

export default Profile;
