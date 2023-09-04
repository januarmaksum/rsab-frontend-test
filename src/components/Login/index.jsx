import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDataUser = async () => {
    const requestOptions = {
      headers: {
        'X-Username': username,
        'X-Password': password
      }
    };
    await fetch(
      `${import.meta.env.VITE_BASE_URL}/antreanrs/login`, requestOptions
    )
    .then(response => response.json())
    .then(data => {
      setIsSubmitting(false)
      if (data.metadata.code == 200) {
        localStorage.setItem('access_token', data.response.access_token)
        location.reload()
      } else {
        alert(data.metadata.message)
        localStorage.removeItem('access_token')
      }
    })
    .catch(error => {
      console.log(error);
      setIsSubmitting(false);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    fetchDataUser()
  }

  return (
    <div className='w-96 h-screen flex justify-center items-center mx-auto'>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
          <input onChange={(e) => setUsername(e.target.value)} type="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your username" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your password" required />
        </div>
        <button disabled={isSubmitting} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Login</button>
      </form>
    </div>
  )
}

export default Login