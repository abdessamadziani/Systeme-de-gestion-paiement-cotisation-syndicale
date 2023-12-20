import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
 import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
 import SideBar from './SideBar'
 import jsPDF from 'jspdf'
 import { useGetAllPaymentsQuery,useCreatePaymentMutation,useGetPaymentByIdQuery,useUpdatePaymentMutation,useDeletePaymentMutation } from '../redux/paymentsAPI';
 import { useGetAllAppartementsQuery,useGetAppartementNumberByBuildingQuery,useGetOwnerByAppartementNumberQuery} from '../redux/appartementsAPI';
  import { useGetAllOwnersQuery } from '../redux/clientsAPI';

 const Payment = () => {
  const [isPaymentAdded, setIsPaymentAdded] = useState(false);
  const [isPaymentDeleted,setIsPaymentDeleted] = useState(false);
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [buildingName,setBuildingName]=useState('noting')
  const [roomNumber,setRoomNumber]=useState(1)
  const [paymentId,setPaymentId]=useState("")
  useEffect(() => {
    if (isPaymentAdded || isPaymentDeleted) {
      window.location.reload();
    }
  }, [isPaymentAdded,isPaymentDeleted]);


    const handleModal=()=>{
      setOpen(true)
    }
    const handleModalEdit=(id)=>{
      setPaymentId(id)
      setOpenEdit(true)
    }

  


  const cancelButtonRef = useRef(null)
    
  
  const { data: dataPayments, isLoading:isLoadingPayments,error: errorPayments} = useGetAllPaymentsQuery();
  const { data: dataAppartements, isLoading:isLoadingAppartement,error: errorAppartement} = useGetAllAppartementsQuery();
   const { data: ownersData, isLoading: isLoadingOwners, error: errorOwners} = useGetAllOwnersQuery();
  const { data: roomData, isLoading: isLoadingRoom, error: errorRoom } = useGetAppartementNumberByBuildingQuery(buildingName);
   const { data: ownerData, isLoading: isLoadingOwner, error: errorOwner } = useGetOwnerByAppartementNumberQuery(roomNumber);
   const { data:paymentData, isLoading: isLoadingPayment,error: errorPayment} = useGetPaymentByIdQuery(paymentId);

console.log("******",paymentData)
  const [createPayment] = useCreatePaymentMutation()
  const [updatePaymentById] = useUpdatePaymentMutation();
  const [deletePaymentById] = useDeletePaymentMutation();



    if (isLoadingPayment) {
     return <div>Loading products...</div>;
   }
    if (errorPayment) {
     return <div>Error: Unable to fetch products. Please try again later.</div>;
   }



   
  
   const handleBuildingChange = (e) => {
  
    setBuildingName(e.target.value)

  
};
const handleRoomNumberChange = (e) => {
  const selectedIndex = e.target.selectedIndex;
  const selectedOption = e.target.options[selectedIndex];
  const customAttribute = selectedOption.getAttribute('roomNb'); 
  setRoomNumber(customAttribute)

};






const handleSubmit = async(event) => {
  event.preventDefault();
  
  const newPayment = {
    ownerId: event.target.ownerId.value,
    appartementId: event.target.appartementId.value,
    status: event.target.status.value,
   
  };

  await createPayment(newPayment)
  //  setIsPaymentAdded(true);

  setOpen(false); // Close the modal
};




    // const handleSubmitEdit = async(event) => {
    //   event.preventDefault();
      
    //   const updatedPayment = {
    //     nb: event.target.number.value,
    //     building: event.target.building.value,
    //     appartementId:event.target.appartementId.value,
    //     ownerId: event.target.ownerId.value,
    //     status: event.target.status.value,
    //     paymentId: paymentId

    //   };

    //    await updatePaymentById(updatedPayment)
    //    console.log(updatedPayment)
    //   //  setIsOwnerUpdated(true);

    //    setOpenEdit(false);
    // };




    const handleSubmitEdit = async (event) => {
      event.preventDefault();
      
      const updatedPayment = {
        appartementId: {
          _id: event.target.appartementId.value, // Assuming appartementId is an input field
          nb: event.target.number.value, // Assuming number is the input field for nb
          building: event.target.building.value // Assuming building is an input field
        },
        ownerId: event.target.ownerId.value,
        status: event.target.status.checked, // Assuming status is a checkbox
        paymentId: paymentId // Assuming this is defined elsewhere
      };
    
      await updatePaymentById(updatedPayment);
      console.log(updatedPayment);
      setOpenEdit(false);
    };
    


    const handleSubmitDelete = async(id) => {
      await deletePaymentById(id)
       setIsPaymentDeleted(true);
  
  
  };

 



// const handlePrintAllPaidTenants = (paidPayments) => {
  
//   const pdf = new jsPDF();
//   // const logoWidth = 40;
//   const logoHeight = 40;
//   const logoMargin = 10; 

//   // pdf.addImage(logo, 'PNG', 150, 10, logoWidth, logoHeight);

//   pdf.setFontSize(12); 
//   pdf.setFont('helvetica', 'bold');
//   pdf.text('All Paid Tenants Receipt', 20, 20);

//   const startY = 30 + logoHeight + logoMargin; 
//   const columnWidths = [20, 30, 30, 30]; 
//   const columnOffsets = [0, 20, 20, 30]; 
//   const headers = [' room number  ', ' building   ','owner name' ,  'Status'];


//   pdf.setFillColor(200, 220, 255); 
//   pdf.rect(20, startY, pdf.internal.pageSize.width - 25, 20, 'F');
//   pdf.setTextColor(0, 0, 0); 
//   pdf.setFont('helvetica', 'bold');
//   headers.forEach((header, index) => {
//     pdf.text(header, 20 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0) + columnOffsets[index], startY + 16);
//   });

//   // Draw data rows
//   pdf.setFont('helvetica', 'normal');
//   pdf.setTextColor(0, 0, 0); // Data text color
//   paidPayments.payments.forEach((payment, index) => {
//     const rowData = [
//       payment.appartementId.nb,
//       payment.appartementId.building,
//       payment.ownerId.name,
//       payment.status,

//     ];

//     // Draw data row background
//     const rowHeight = 20; // Adjust row height
//     pdf.setFillColor(index % 2 === 0 ? 245 : 255, 255, 255); // Alternate row colors
//     pdf.rect(20, startY + (index + 1) * rowHeight, pdf.internal.pageSize.width - 40, rowHeight, 'F');

//     // Draw data row text
//     rowData.forEach((data, i) => {
//       pdf.text(String(data), 20 + columnOffsets[i] + columnWidths.slice(0, i).reduce((a, b) => a + b, 0), startY + (index + 1) * rowHeight + 16);
//     });

//     // Separator line
//     pdf.setDrawColor(200, 200, 200); // Line color
//     pdf.line(20, startY + (index + 2) * rowHeight, pdf.internal.pageSize.width - 20, startY + (index + 2) * rowHeight);
//   });

//   // Calculate the end position of the table
//   const endY = pdf.internal.pageSize.height - 20;

//   // Add a margin to avoid overlapping with the footer
//   const marginBottom = 10;

//   // If the table goes beyond the end position, add a new page
//   if (startY + (paidPayments.length + 2) * 20 + marginBottom > endY) {
//     pdf.addPage();
//   }

//   pdf.save('All_Paid_Tenants_Receipt.pdf');
// };





const handlePrintAllPaidTenants = (paidPayments) => {
  const pdf = new jsPDF();
  const logoHeight = 40;
  const logoMargin = 10; 

  setupPDFStyles(pdf);
  addHeader(pdf, 'All Paid Tenants Receipt', 20, 20);

  const startY = calculateStartY(logoHeight, logoMargin); 
  const columnWidths = [40, 40, 40, 40]; // Adjusted for equal spacing
  const headers = ['Room Number', 'Building', 'Owner Name', 'Status'];

  drawTableHeader(pdf, startY, headers, columnWidths);

  paidPayments.payments.forEach((payment, index) => {
    const rowData = [
      payment.appartementId.nb,
      payment.appartementId.building,
      payment.ownerId.name,
      payment.status,
    ];

    drawDataRow(pdf, startY, index, rowData, columnWidths);
  });

  drawTableBorders(pdf, startY, paidPayments.payments.length, columnWidths);
  checkAndAddNewPageIfNeeded(pdf, startY, paidPayments.payments.length);
  pdf.save('All_Paid_Tenants_Receipt.pdf');
};

function setupPDFStyles(pdf) {
  pdf.setFontSize(12); 
  pdf.setFont('helvetica', 'bold');
}

function addHeader(pdf, title, x, y) {
  pdf.text(title, x, y);
}

function calculateStartY(logoHeight, logoMargin) {
  return 30 + logoHeight + logoMargin;
}

function drawTableHeader(pdf, startY, headers, columnWidths) {
  pdf.setFillColor(200, 220, 255);
  const headerHeight = 20;
  pdf.rect(20, startY, pdf.internal.pageSize.width - 40, headerHeight, 'F');
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'bold');

  headers.forEach((header, index) => {
    const textWidth = pdf.getStringUnitWidth(header) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const cellWidth = columnWidths[index];
    const xPosition = 20 + getColumnOffset(columnWidths, index) + (cellWidth - textWidth) / 2;

    pdf.text(header, xPosition, startY + headerHeight / 2 + 3); // Centered vertically and horizontally
  });

  // Add border to the header
  pdf.setDrawColor(0, 0, 0);
  pdf.rect(20, startY, pdf.internal.pageSize.width - 40, headerHeight);
}

function getColumnOffset(columnWidths, index, centered = false) {
  const totalWidth = columnWidths.slice(0, index + 1).reduce((a, b) => a + b, 0);
  return centered ? totalWidth - columnWidths[index] / 2 : totalWidth - columnWidths[index];
}

function drawDataRow(pdf, startY, rowIndex, rowData, columnWidths) {
  const rowHeight = 20;
  const yPosition = startY + (rowIndex + 1) * rowHeight;

  // Alternate row colors between black and grey
  pdf.setFillColor(rowIndex % 2 === 0 ? 0 : 128, 128, 128);
  pdf.rect(20, yPosition, pdf.internal.pageSize.width - 40, rowHeight, 'F');

  // White text for visibility on dark backgrounds
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(255, 255, 255);

  rowData.forEach((data, columnIndex) => {
    const text = String(data);
    const textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const cellWidth = columnWidths[columnIndex];
    const xPosition = 20 + getColumnOffset(columnWidths, columnIndex) + (cellWidth - textWidth) / 2;

    pdf.text(text, xPosition, yPosition + rowHeight / 2 + 3); // Centered vertically and horizontally
  });
}

function drawTableBorders(pdf, startY, rowCount, columnWidths) {
  const rowHeight = 20;

  // Draw horizontal lines
  for (let i = 0; i <= rowCount; i++) {
    const yPosition = startY + i * rowHeight;
    pdf.setDrawColor(0, 0, 0);
    pdf.line(20, yPosition, pdf.internal.pageSize.width - 20, yPosition);
  }

  // Draw vertical lines
  let xPosition = 20;
  for (let i = 0; i <= columnWidths.length; i++) {
    pdf.line(xPosition, startY, xPosition, startY + rowCount * rowHeight);
    xPosition += i < columnWidths.length ? columnWidths[i] : 0;
  }
}

function checkAndAddNewPageIfNeeded(pdf, startY, rowCount) {
  const rowHeight = 20;
  const endY = pdf.internal.pageSize.height - 20;
  const totalContentHeight = startY + (rowCount + 1) * rowHeight;

  if (totalContentHeight > endY) {
    pdf.addPage();
  }
}
















  return (
    <>
      <SideBar/>
      <div className='mt-24 flex w-full justify-end'>
         <button onClick={handleModal}   type="button" className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5   text-center mx-4 ">Add New Payment</button>
         <button onClick={()=>handlePrintAllPaidTenants(dataPayments)}  type="button" className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5   text-center mx-4 " >Print</button>
      </div>

      

  <div className='w-4/5 ms-auto me-8 mt-10 mb-6'>
   
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
                                  Update
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Delete
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                      {dataPayments?.payments?.map((payment) => (
                          <tr key={payment._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {payment._id}
                              </th>
                              <td className="px-6 py-4">
                              {payment?.appartementId?.nb}
                              </td>
                             
                              <td className="px-6 py-4">
                              {payment?.appartementId?.building}
                              </td>
                              <td className="px-6 py-4">
                              {payment?.ownerId?.name}
                              </td>
                              <td className="px-6 py-4">
                              {payment.status ? 'paid' : 'Not paid'}
                              </td>
                               
                              <td className="px-6 py-4">
                                  <button onClick={()=>handleModalEdit(payment._id)}  type="submit" className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5   text-center mx-4 ">Edit</button>
                              </td>
                              <td className="px-6 py-4">
                              <button onClick={()=>handleSubmitDelete(payment._id)}  type="submit" className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5   text-center mx-4 ">Delete</button>
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
                <form class="space-y-4" onSubmit={handleSubmit}>
                   <div>
                        <label for="building" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Building Name</label>
                        <select id="buildingId" name="buildingId" onChange={handleBuildingChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled>Choose the Building</option>
                            {dataAppartements?.appartements?.map((appartement) => (
                            <option key={appartement._id} value={appartement.building}>{appartement.building}</option>
                            ))}

                       </select> 
                   </div>
                    <div>
                        <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Appartement Number</label>
                        <select id="appartementId" name="appartementId" onChange={handleRoomNumberChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected >Choose the Room Number</option>
                            {roomData?.appartementsNumber?.map((appartement) => (
                            <option key={appartement._id} value={appartement._id}  roomNb={appartement.nb}   >{appartement.nb}</option>
                            ))}
                        </select>           
                     </div>
                   
                    <div>
                        <label for="owner" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner Name</label>
                        <select id="ownerId" name="ownerId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled>Choose the Owner</option>
                            {ownerData?.owners?.map((owner) => (
                            <option key={owner._id} value={owner._id}>{owner.name}</option>
                            ))}
                        </select>        
                     </div>
                    <div>
                        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                       <select id="status" name="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled>Status</option>
                            <option value="false" >Not Paid</option>
                            <option value="true" >Paid</option>
                       </select> 
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
                    type="submit"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
       
                </form>
            </div>
                      </div>
                    </div>
                  </div>
                </div>
             
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>













    

    <Transition.Root show={openEdit} as={Fragment}>
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
                <form class="space-y-4" onSubmit={handleSubmitEdit}>
                   
                    <div>
                        <label for="number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Appartement Number</label>
                        <input type="text" name="number" id="number" defaultValue={paymentData?.payment?.appartementId?.nb} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Number" required/>
                        <input type="hidden" name="appartementId" id="appartementId" defaultValue={paymentData?.payment?.appartementId?._id} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Number" required/>

                    </div>
                    <div>
                        <label for="building" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Building</label>
                        <input type="text" name="building" id="building" defaultValue={paymentData?.payment?.appartementId?.building} placeholder=" Building " class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                    </div>
                    <div>
                        <label for="owner" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Owner Name</label>
                        <select id="ownerId" name="ownerId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled>Choose the Owner</option>
                            {ownersData?.owners?.map((owner) => (
                            <option key={owner._id} value={owner._id}>{owner.name}</option>
                            ))}
                        </select>        
                     </div>
                    <div>
                        <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                       <select id="status" name="status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected disabled>Status</option>
                            <option value="false" >Not Paid</option>
                            <option value="true" >Paid</option>
                       </select> 
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
                    onClick={() => setOpenEdit(false)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpenEdit(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
                </form>
            </div>
                      </div>
                    </div>
                  </div>
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