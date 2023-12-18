import React from 'react'
import SideBar from './SideBar'

const History = () => {
  return (
    <>
    <SideBar/>
    {/* <h2 className=' w-full text-red-500 mx-auto bg-red-200 mt-96 text-center'>History</h2> */}
    <div className='mt-24 flex w-full justify-end'>
         <button   type="button" className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5   text-center mx-4 ">Add New Client</button>
      </div>
      
  <div className='w-4/5 ms-auto me-8 mt-10'>
              <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  id
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Name
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Cin
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Action
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  Apple MacBook Pro 17"
                              </th>
                              <td className="px-6 py-4">
                                  Silver
                              </td>
                              <td className="px-6 py-4">
                                  Laptop
                              </td>
                              <td className="px-6 py-4">
                                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                              </td>
                          </tr>
                      
                      </tbody>
                  </table>
              </div>
    </div>
   </>
     )
}

export default History