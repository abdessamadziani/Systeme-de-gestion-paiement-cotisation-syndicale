import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
 import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
 import SideBar from './SideBar'
 import { useGetAllPaymentsQuery } from '../redux/paymentsAPI';
 import { useGetAllAppartementsQuery,useGetAppartementNumberByBuildingQuery } from '../redux/appartementsAPI';
//  import { useGetAllOwnersQuery } from '../redux/clientsAPI';


import { useDispatch } from 'react-redux';

 const Payment = () => {

   
    const [open, setOpen] = useState(false)
    const handleModal=()=>{
      setOpen(true)
    }
      const cancelButtonRef = useRef(null)
    
  
   const { data: dataPayments, isLoading:isLoadingPayment,error: errorPayment} = useGetAllPaymentsQuery();
   const { data: dataAppartements, isLoading:isLoadingAppartement,error: errorAppartement} = useGetAllAppartementsQuery();
  //  const { data: dataOwners, isLoading:isLoadingOwner,error: errorOwner} = useGetAllOwnersQuery();
  const [buildingName,setBuildingName]=useState('argana')
   const { data: roomData, isLoading: isLoadingRoom, error: errorRoom } = useGetAppartementNumberByBuildingQuery(buildingName);

   console.log(roomData)
    console.log(dataPayments)
    if (isLoadingPayment) {
     return <div>Loading products...</div>;
   }
 
   if (errorPayment) {
     return <div>Error: Unable to fetch products. Please try again later.</div>;
   }


   const handleBuildingChange = (e) => {
    // getRoomByBuildingName(e.target.value); 
    // setBuildingName(e.target.value)
    useEffect(() => {
      setBuildingName(e.target.value)
       alert("tt")
      console.log(buildingName);
    }, [buildingName]);
    // console.log(buildingName)
};

// console.log("*******",roomData,"************")

  return (
    <>
      <SideBar/>
      <div>Payment</div>
      {/* <h2 className=' w-full text-red-500 mx-auto bg-red-200 mt-96 text-center'>Payments</h2> */}
      <div className='mt-24 flex w-full justify-end'>
         <button onClick={handleModal}   type="button" className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5   text-center mx-4 ">Add New Payment</button>
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
                                  Appartement Number
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Building
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Owner
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Status
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Action
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                      {dataPayments.payments?.map((payment) => (
                          <tr key={payment.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {payment._id}
                              </th>
                              <td className="px-6 py-4">
                              {payment.appartementId.nb}
                              </td>
                             
                              <td className="px-6 py-4">
                              {payment.appartementId.building}
                              </td>
                              <td className="px-6 py-4">
                              {payment.ownerId.name}
                              </td>
                              <td className="px-6 py-4">
                              {payment.status ? 'paid' : 'Not paid'}
                              </td>
                              <td className="px-6 py-4">
                                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                              </td>
                          </tr>
                      ))}
                      </tbody>
                  </table>
              </div>
    </div>










    

    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All of your data will be permanently
                          removed. This action cannot be undone.
                        </p>
                        <div class="p-4 md:p-5">
                <form class="space-y-4"  method="POST" id="myForm" action="/updateUser/?_method=POST"  enctype="multipart/form-data">
                   <div>
                        <label for="building" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Building Name</label>
                        <select id="buildingId" name="buildingId" onChange={handleBuildingChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {/* <select id="buildingId" name="buildingId"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> */}
                            <option selected>Choose the Building</option>
                            {dataAppartements.appartements?.map((appartement) => (
                            <option key={appartement.id} value={appartement._id}>{appartement.building}</option>
                            ))}

                       </select> 
                   </div>
                    <div>
                        <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Appartement Number</label>
                        <select id="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose the Room Number</option>
                            {roomData.appartementsNumber?.map((appartement) => (

                            <option key={appartement.id} value={appartement.nb}>{appartement.nb}</option>
                            ))}
                        </select>           
                     </div>
                   
                    <div>
                        <label for="owner" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner Name</label>
                        <input type="text" name="owner" id="owner" placeholder=" owner name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    <div>
                        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                       <select id="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Not Paid</option>
                            <option value="US">Paid</option>
                       </select> 
                    </div>
                 
       
                </form>
            </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    </>
  )
}
export default Payment