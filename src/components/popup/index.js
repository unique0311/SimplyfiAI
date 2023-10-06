import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import LogoMark from '../chat/LogoMark'
import { ChatSvg, DocumentsSvg, InventorySvg, ReminderSvg } from '@/assets/images'
import { GrayButton } from '../button/CreateButton'
export default function Modal({ isOpen, closeModal, title, children, className, category, ...rest }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto w-full z-100">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full ${className ? "max-w-2xl" : "max-w-xl"} transform overflow-hidden rounded-3xs filter-bg py-4 px-5 text-left align-middle shadow-xl transition-all z-100`}>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center gap-2'>
                    <LogoMark size="small">
                      {category==="document"? <DocumentsSvg color="#141414" />:
                      category==="inventory"?<InventorySvg color="#141414" />:
                      category==="Email"?<ChatSvg color="#141414"/>:
                      <ReminderSvg color="#141414" />}
                    </LogoMark>
                    <Dialog.Title
                      as="h3"
                      className="font-inter font-semibold text-mini leading-[18px] text-white"
                    >
                      {title}
                    </Dialog.Title>
                  </div>
                  <GrayButton title="Close" onClick={closeModal} />
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}