import React, { useEffect, useState } from 'react'

function Dashboard() {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const accessToken = localStorage.getItem('access_token') || ''
  const [healthUnitData, setHealthUnitData] = useState([])
  const [addData, setAddData] = useState(false)
  const [unitCode, setUnitCode] = useState('')
  const [unitName, setUnitName] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    location.reload();
  }

  const fetchHealtUnitData = async () => {
    try {
      const requestOptions = {
        headers: {
          'X-Token': accessToken
        }
      }; accessToken
      accessToken
      accessToken
      await fetch(
        `${BASE_URL}/antreanrs/health-unit/list?page=0&size=5`,
        requestOptions
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('gagal memuat data');
        })
        .then(data => {
          setHealthUnitData(data.response.content)
        })
    } catch (error) {
      localStorage.removeItem('access_token')
      alert('Token sudah expired: silakan login ulang.');
    }
  }

  const handleEdit = (item) => {
    // setUnitCodeEdit(item)
  }

  const handleNewData = async (e) => {
    e.preventDefault()
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'X-Token': accessToken
        },
        body: JSON.stringify({ unitCode: unitCode, unitName: unitName })
      };
      await fetch(`${import.meta.env.VITE_BASE_URL}/antreanrs/health-unit/save`, requestOptions)
        .then(response => {
          if (response.ok) {
            alert('Data berhasil disimpan')
          }
          throw new Error('gagal menyimpan data');
        })
    } catch (error) {

    }
  }

  const handleDelete = async (item, index) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'X-Token': accessToken
        }
      };
      await fetch(`${BASE_URL}/antreanrs/health-unit/delete/${item.id}`, requestOptions)
        .then(response => {
          if (response.ok) {
            alert('Data ', item.unitName, ' berhasil dihapus')
            setHealthUnitData([
              ...healthUnitData.slice(0, index),
              ...healthUnitData.slice(index + 1)
            ])
          } else {
            alert('Cannot be deleted, Klinik already used')
          }
          throw new Error('gagal hapus data');
        })
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchHealtUnitData()
  }, [])

  return (
    <div>
      <aside className='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'>
        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <ul className="space-y-2 font-medium">
            <li>
              <a className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Health Unit</span>
              </a>
            </li>
            <li>
              <a onClick={handleLogout} className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"> <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" /> </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className='flex justify-between items-center border-b border-slate-200 pb-3'>
          <h1 className='text-xl font-bold'>Health Unit</h1>
          <button onClick={() => setAddData(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Tambah Data</button>
        </div>
        {addData && (
          <>
            <form className='w-[700px] gap-3 flex items-center mx-auto' onSubmit={handleNewData}>
              <div className="my-6">
                <input onChange={(e) => setUnitCode(e.target.value)} type="text" id="unitCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Kode Unit" required />
              </div>
              <div className="my-6">
                <input onChange={(e) => setUnitName(e.target.value)} type="text" id="unitName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Nama Unit" required />
              </div>
              <div className='flex items-center'>
                <button type="submit" className="text-white h-[42px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Simpan</button>
              </div>
              <div className='flex items-center'>
                <button onClick={() => setAddData(false)} type="button" className="text-white h-[42px] bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Batal</button>
              </div>
            </form>
          </>
        )}
        <ul className="py-6 divide-y divide-slate-200">
          {healthUnitData?.map((item, index) => {
            return (
              <li key={item.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="overflow-hidden">
                  <p className="text-sm font-medium text-slate-900 uppercase">{index + 1}. {item.unitName}</p>
                  <p className="text-xs font-medium text-slate-500 uppercase">Code unit: {item.unitCode}</p>
                </div>
                <div className='flex gap-1'>
                  <button onClick={() => handleEdit(item)} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit</button>
                  <button onClick={() => handleDelete(item, index)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard