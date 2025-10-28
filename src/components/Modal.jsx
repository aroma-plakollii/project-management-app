import { useImperativeHandle, useState } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({taskIndex, selectedProject, onDeleteProject, onClearTask, ref}) => {
    const dialog = useRef();
    const [modalType, setModalType] = useState('');

    useImperativeHandle(ref, () => {
        return {
            open(type){
                dialog.current.showModal();
                setModalType(type);
            },
            closeModal(){
                dialog.current.close();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className="relative z-10">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-700 opacity-75"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="bg-white opacity-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-xl">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-2xl font-semibold text-stone-600">
                                    Delete {modalType === 'project' && 'project'}{modalType === 'task' && 'task'} 
                                </h3>
                                <div className="mt-5 mb-4">
                                    <div className="text-sm text-stone-500 whitespace-pre-wrap">
                                        Are you sure you want to delete this {modalType === 'project' && 'project'}{modalType === 'task' && 'task'} ?
                                        This action cannot be undone.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form method='dialog' className="z-15 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                            type="button"
                            onClick={modalType === 'project' ? () => onDeleteProject(selectedProject) : () => onClearTask(selectedProject, taskIndex)}
                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Delete
                            </button>
                            <button
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>, document.getElementById('modal')
    )
}

export default Modal;