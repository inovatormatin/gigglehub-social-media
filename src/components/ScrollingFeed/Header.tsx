import React from 'react'
import { TailButton } from '..'
import { ArrowCounterClockwise, ArrowSquareIn } from '@phosphor-icons/react'
import logo from '../../assets/images/logo.png'
import { AppDispatch, useAppSelector } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { openPostForm } from '../../redux/AppSlice'

const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { refreshAvailable } = useAppSelector(state => state.appState)
    const handleOpenModal = () => {
        dispatch(openPostForm())
    }
    // to refresh screen
    const refresh = (): void => {
        if (typeof window !== 'undefined') {
            window.location.reload();
        }
    }
    return (
        <>
            <header className='fixed top-0 shadow p-2 mx-2 mt-2 relative bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-between'>
                {/* logo */}
                <section className='flex items-center'>
                    <img
                        className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mr-2'
                        src={logo}
                        loading='lazy'
                        alt='GiggleHub'
                    />
                    <h1 className='text-lg font-semibold'>GiggleHub</h1>
                </section>
                {refreshAvailable &&
                    <button onClick={refresh} className='absolute top-20 z-20 left-1/2 transform -translate-x-1/2 rounded-full bg-blue-800 py-2 px-4 flex items-center font-md text-white'>
                        <ArrowCounterClockwise size={24} className='mr-2' /> Refresh
                    </button>
                }
                {/* Add button */}
                <TailButton
                    label='Post'
                    icon={<ArrowSquareIn />}
                    size='xs'
                    color='blue'
                    onClick={handleOpenModal}
                />
            </header>
        </>
    )
}

export default Header