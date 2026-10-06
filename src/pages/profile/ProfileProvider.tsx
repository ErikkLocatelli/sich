const ProfileProvider = ({userLogout}: {userLogout: () => void}) => {
  return (
    <div>
        Perfil do provider funciona
        <button onClick={userLogout} className="bg-red-500 text-white py-2 px-4 rounded">
          Logout
        </button>
    </div>
  )
}

export default ProfileProvider
