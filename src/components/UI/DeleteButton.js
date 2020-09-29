import React from 'react'
import Swal from 'sweetalert2'
import { HiOutlineTrash } from 'react-icons/hi'

const deleteButton = ({
  text,
  alertText,
  handleDelete,
  confirmText,
  textFireDeleted,
  textFireSafe
}) => {
  return (
    <button
      onClick={e =>
        Swal.fire({
          title: 'Are you sure?',
          text: alertText,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#805ad5',
          cancelButtonColor: '#a0aec0',
          confirmButtonText: confirmText,
          reverseButtons: true
        }).then(result => {
          if (result.value) {
            e.persist()
            handleDelete(e)
            Swal.fire('Deleted!', textFireDeleted, 'success')
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', textFireSafe, 'error')
          }
        })
      }
      className="block bg-gray-500 float-right hover:bg-gray-600 text-white tracking-wide flex
          capitalize py-2 px-4 rounded focus:bg-gray-600 focus:outline-none focus:shadow-outline"
    >
      <HiOutlineTrash className="mt-1 mr-1 font-bold" />
      <span>{text}</span>
    </button>
  )
}

export default deleteButton
